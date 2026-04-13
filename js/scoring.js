/* ============================================
   ACOMPIA — Moteur de scoring & rapport
   Basé sur la matrice du livrable 3
   ============================================ */

const RISK_LEVELS = {
  REDUIT: { label: 'Réduit', color: '#10B981', bgColor: 'rgba(16,185,129,0.08)', icon: '✓' },
  MOYEN: { label: 'Moyen', color: '#F59E0B', bgColor: 'rgba(245,158,11,0.08)', icon: '⚠' },
  ELEVE: { label: 'Élevé', color: '#EF4444', bgColor: 'rgba(239,68,68,0.08)', icon: '⚠' },
  CRITIQUE: { label: 'Critique', color: '#DC2626', bgColor: 'rgba(220,38,38,0.12)', icon: '🔴' },
  SIGNAL: { label: 'Signal', color: '#F59E0B', bgColor: 'rgba(245,158,11,0.06)', icon: '⚡' },
  NA: { label: 'Non concerné', color: '#9BA3B8', bgColor: 'rgba(155,163,184,0.06)', icon: '—' }
};

function computeScoring(answers) {
  const themes = [];

  // === BLOC 0 — Profil (calibrage, pas de verdict) ===
  let fiabilite = 'bon';
  if (['partiellement', 'nsp'].includes(answers['Q0.6'])) fiabilite = 'partielle';
  if (answers['Q0.6'] === 'non') fiabilite = 'faible';

  const previousSubjects = answers['Q0.5'] || [];

  // === BLOC 1 — Frais professionnels ===
  const fraisPro = { name: 'Frais professionnels', icon: '💰', verdicts: [], level: 'NA' };

  if (answers['Q1.1'] === 'non') {
    fraisPro.verdicts.push({ level: 'NA', text: 'Non concerné — pas de remboursement de frais professionnels.' });
  } else if (answers['Q1.1'] === 'oui') {
    // Q1.2 — IK
    if (answers['Q1.2'] === 'oui-tous') {
      fraisPro.verdicts.push({ level: 'REDUIT', text: 'Bonne pratique sur les IK. Sous réserve de cohérence trajets / activité.' });
    } else if (['certains', 'nsp'].includes(answers['Q1.2'])) {
      fraisPro.verdicts.push({ level: 'ELEVE', text: 'La fraction d\'IK non documentée présente une forte exposition à réintégration dans l\'assiette de cotisations.' });
    } else if (answers['Q1.2'] === 'non') {
      fraisPro.verdicts.push({ level: 'CRITIQUE', text: 'Absence généralisée de justificatifs IK. Forte exposition à réintégration totale.' });
    }

    // Q1.3 — Forfaits
    if (answers['Q1.3'] === 'oui') {
      fraisPro.verdicts.push({ level: 'SIGNAL', text: 'Des indemnités forfaitaires sont versées. Un versement routinier sans vérification des conditions expose à réintégration.' });
    } else if (answers['Q1.3'] === 'nsp') {
      fraisPro.verdicts.push({ level: 'MOYEN', text: 'L\'absence de visibilité sur les indemnités forfaitaires appelle une vérification.' });
    }

    // Q1.4 — Justification
    if (answers['Q1.4'] === 'oui-tous') {
      fraisPro.verdicts.push({ level: 'REDUIT', text: 'Capacité à justifier les frais identifiée.' });
    } else if (['certains', 'nsp'].includes(answers['Q1.4'])) {
      fraisPro.verdicts.push({ level: 'ELEVE', text: 'La fraction non justifiable présente un risque de réintégration.' });
    } else if (answers['Q1.4'] === 'non') {
      fraisPro.verdicts.push({ level: 'CRITIQUE', text: 'L\'impossibilité de justifier expose l\'ensemble des remboursements à réintégration.' });
    }

    // Q1.5 — DFS
    if (answers['Q1.5'] === 'oui') {
      fraisPro.verdicts.push({ level: 'SIGNAL', text: 'La DFS fait l\'objet d\'une sortie progressive. Vérifier l\'éligibilité du salarié, le taux en vigueur et les règles de cumul.' });
    } else if (answers['Q1.5'] === 'nsp') {
      fraisPro.verdicts.push({ level: 'ELEVE', text: 'La méconnaissance de la DFS est un signal de risque fort. Vérification urgente recommandée.' });
    }
  }
  fraisPro.level = getMaxLevel(fraisPro.verdicts);
  if (previousSubjects.includes('frais-pro') && fraisPro.level !== 'NA' && fraisPro.level !== 'REDUIT') {
    fraisPro.verdicts.push({ level: 'CRITIQUE', text: '⚠ Risque de réitération identifié : ce thème a déjà fait l\'objet d\'un redressement. Une majoration spécifique peut être encourue.' });
    fraisPro.level = 'CRITIQUE';
  }
  themes.push(fraisPro);

  // === BLOC 1bis — Avantages du quotidien ===
  const quotidien = { name: 'Avantages du quotidien', icon: '🍽️', verdicts: [], level: 'NA' };

  if (answers['Q1bis.1'] === 'oui') {
    if (answers['Q1bis.2'] === 'oui') quotidien.verdicts.push({ level: 'REDUIT', text: 'Conditions d\'exonération des titres-restaurant vérifiées.' });
    else if (answers['Q1bis.2'] === 'partiellement') quotidien.verdicts.push({ level: 'MOYEN', text: 'Un respect partiel des conditions expose à la réintégration de la part patronale excédentaire.' });
    else if (answers['Q1bis.2'] === 'non') quotidien.verdicts.push({ level: 'ELEVE', text: 'Le non-respect des conditions d\'exonération expose à réintégration de la contribution patronale.' });
    else if (answers['Q1bis.2'] === 'nsp') quotidien.verdicts.push({ level: 'MOYEN', text: 'Vérification recommandée sur les conditions d\'exonération des titres-restaurant.' });
  } else if (answers['Q1bis.1'] === 'nsp') {
    quotidien.verdicts.push({ level: 'MOYEN', text: 'L\'incertitude sur l\'attribution de titres-restaurant appelle une vérification.' });
  }

  if (answers['Q1bis.3'] === 'oui') quotidien.verdicts.push({ level: 'REDUIT', text: 'Prise en charge transport conforme sur la base de vos réponses.' });
  else if (answers['Q1bis.3'] === 'pas-homogene') quotidien.verdicts.push({ level: 'MOYEN', text: 'Une prise en charge non homogène peut créer des écarts de traitement et des risques de redressement.' });
  else if (answers['Q1bis.3'] === 'non') quotidien.verdicts.push({ level: 'SIGNAL', text: 'La prise en charge des abonnements de transport public est en principe obligatoire. Vérification recommandée.' });

  if (answers['Q1bis.4'] === 'oui-sans-verif') quotidien.verdicts.push({ level: 'MOYEN', text: 'L\'allocation télétravail versée sans vérification présente un risque en cas de contrôle.' });
  else if (answers['Q1bis.4'] === 'nsp') quotidien.verdicts.push({ level: 'MOYEN', text: 'Vérification recommandée sur le traitement social de l\'allocation télétravail.' });

  quotidien.level = getMaxLevel(quotidien.verdicts);
  themes.push(quotidien);

  // === BLOC 2 — Mutuelle et prévoyance ===
  const psc = { name: 'Protection sociale complémentaire', icon: '🏥', verdicts: [], level: 'NA' };

  if (['aucune', 'nsp'].includes(answers['Q2.1a'])) {
    psc.verdicts.push({ level: 'CRITIQUE', text: 'L\'absence de formalisation de la complémentaire santé expose à la perte totale du régime social de faveur.' });
  } else if (answers['Q2.1a'] === 'due') {
    if (answers['Q2.1b'] === 'oui-tous') psc.verdicts.push({ level: 'REDUIT', text: 'DUE mutuelle formalisée et preuve de remise disponible.' });
    else if (answers['Q2.1b'] === 'certains') psc.verdicts.push({ level: 'ELEVE', text: 'L\'absence de preuve de remise pour certains salariés fragilise le régime.' });
    else if (['non', 'nsp'].includes(answers['Q2.1b'])) psc.verdicts.push({ level: 'CRITIQUE', text: 'Sans preuve de remise individuelle de la DUE, le régime de faveur est exposé.' });
  }

  if (['aucune', 'nsp'].includes(answers['Q2.2a'])) {
    psc.verdicts.push({ level: 'ELEVE', text: 'L\'absence de formalisation du régime de prévoyance constitue un point de vigilance.' });
  } else if (answers['Q2.2a'] === 'due') {
    if (['non', 'nsp'].includes(answers['Q2.2b'])) psc.verdicts.push({ level: 'ELEVE', text: 'DUE prévoyance sans preuve de remise : risque de remise en cause.' });
    else if (answers['Q2.2b'] === 'certains') psc.verdicts.push({ level: 'MOYEN', text: 'Preuve de remise de la DUE prévoyance partielle.' });
  }

  if (['certains', 'non', 'nsp'].includes(answers['Q2.3'])) {
    const lvl = answers['Q2.3'] === 'certains' ? 'MOYEN' : 'ELEVE';
    psc.verdicts.push({ level: lvl, text: 'Les dispenses d\'affiliation non conformes exposent à réintégration des contributions patronales.' });
  }

  psc.level = getMaxLevel(psc.verdicts);
  if (previousSubjects.includes('psc') && psc.level !== 'NA' && psc.level !== 'REDUIT') {
    psc.verdicts.push({ level: 'CRITIQUE', text: '⚠ Risque de réitération : ce thème a déjà fait l\'objet d\'un redressement.' });
    psc.level = 'CRITIQUE';
  }
  themes.push(psc);

  // === BLOC 3 — Temps de travail et rémunérations ===
  const remun = { name: 'Rémunérations & temps de travail', icon: '⏰', verdicts: [], level: 'NA' };

  if (['regulierement', 'occasionnellement', 'nsp'].includes(answers['Q3.1'])) {
    if (['pas-toujours'].includes(answers['Q3.2'])) remun.verdicts.push({ level: 'CRITIQUE', text: 'Des heures supplémentaires non déclarées constituent un risque majeur de travail dissimulé.' });
    else if (['declarees-partiel', 'nsp'].includes(answers['Q3.2'])) remun.verdicts.push({ level: 'ELEVE', text: 'L\'absence de décompte individuel fiable des heures supplémentaires expose à un redressement.' });
  }

  if (['partiellement', 'non', 'nsp'].includes(answers['Q3.3']) && answers['Q3.3'] !== 'pas-forfait') {
    const lvl = answers['Q3.3'] === 'non' ? 'CRITIQUE' : 'ELEVE';
    remun.verdicts.push({ level: lvl, text: 'Le forfait jours sans convention individuelle, suivi et entretien annuel est irrégulier et expose à un rappel de salaire.' });
  }

  if (answers['Q3.4'] === 'oui') {
    remun.verdicts.push({ level: 'CRITIQUE', text: 'Des conditions proches du salariat pour des indépendants exposent à une requalification et un redressement massif.' });
  } else if (answers['Q3.4'] === 'nsp') {
    remun.verdicts.push({ level: 'ELEVE', text: 'L\'incertitude sur les conditions de travail des indépendants appelle une analyse approfondie.' });
  }

  if (['plupart', 'non', 'nsp'].includes(answers['Q3.5'])) {
    const lvl = answers['Q3.5'] === 'non' ? 'CRITIQUE' : 'ELEVE';
    remun.verdicts.push({ level: lvl, text: 'Des sommes versées hors bulletin de paie et DSN constituent un risque de travail dissimulé.' });
  }

  remun.level = getMaxLevel(remun.verdicts);
  if (previousSubjects.includes('hs-remun') && remun.level !== 'NA' && remun.level !== 'REDUIT') {
    remun.verdicts.push({ level: 'CRITIQUE', text: '⚠ Risque de réitération identifié sur ce thème.' });
    remun.level = 'CRITIQUE';
  }
  themes.push(remun);

  // === BLOC 4 — Réduction générale (RGDU) ===
  const rgdu = { name: 'Réduction générale (RGDU)', icon: '📊', verdicts: [], level: 'NA' };

  if (answers['Q4.1'] === 'aucun') {
    rgdu.verdicts.push({ level: 'NA', text: 'Non concerné par la réduction générale.' });
  } else {
    if (['non', 'nsp'].includes(answers['Q4.2'])) rgdu.verdicts.push({ level: 'ELEVE', text: 'L\'absence de contrôle humain du calcul RGDU expose à des erreurs non détectées par le logiciel.' });
    if (['oui-freq'].includes(answers['Q4.3'])) rgdu.verdicts.push({ level: 'ELEVE', text: 'Les situations complexes fréquentes augmentent significativement le risque d\'erreur sur la RGDU.' });
    else if (answers['Q4.3'] === 'oui-ponctuel') rgdu.verdicts.push({ level: 'MOYEN', text: 'Des situations ponctuellement complexes nécessitent une vigilance sur le calcul RGDU.' });
  }

  rgdu.level = getMaxLevel(rgdu.verdicts);
  if (previousSubjects.includes('reduction') && rgdu.level !== 'NA' && rgdu.level !== 'REDUIT') {
    rgdu.verdicts.push({ level: 'CRITIQUE', text: '⚠ Risque de réitération identifié sur la réduction générale.' });
    rgdu.level = 'CRITIQUE';
  }
  themes.push(rgdu);

  // === BLOC 5 — Avantages en nature ===
  const anv = { name: 'Avantages en nature', icon: '🚗', verdicts: [], level: 'NA' };

  if (answers['Q5.1'] === 'oui' || answers['Q5.1'] === 'nsp') {
    if (['declare-non-verifie', 'certains', 'nsp'].includes(answers['Q5.2'])) {
      anv.verdicts.push({ level: 'ELEVE', text: 'L\'évaluation des ANV véhicules n\'a pas été revérifiée depuis la réforme du 1er février 2025. Risque de sous-évaluation.' });
    } else if (answers['Q5.2'] === 'non') {
      anv.verdicts.push({ level: 'CRITIQUE', text: 'Aucun ANV véhicule déclaré alors qu\'un usage personnel existe. Risque de réintégration totale.' });
    }
  } else if (answers['Q5.1'] === 'strict-pro') {
    if (['partiellement', 'non', 'nsp'].includes(answers['Q5.1b'])) {
      anv.verdicts.push({ level: 'ELEVE', text: 'L\'impossibilité de démontrer l\'usage strictement professionnel expose à la requalification en ANV.' });
    }
  }

  if (['certains', 'non', 'nsp'].includes(answers['Q5.3']) && answers['Q5.3'] !== 'pas-outils') {
    anv.verdicts.push({ level: 'MOYEN', text: 'L\'ANV lié aux outils numériques (téléphone, PC) n\'est pas systématiquement traité en paie.' });
  }

  if (answers['Q5.4'] === 'oui-non-traites') {
    anv.verdicts.push({ level: 'CRITIQUE', text: 'Des avantages en nature non traités en paie constituent un risque de redressement majeur.' });
  } else if (answers['Q5.4'] === 'nsp') {
    anv.verdicts.push({ level: 'MOYEN', text: 'Vérification recommandée sur le traitement en paie des avantages en nature.' });
  }

  anv.level = getMaxLevel(anv.verdicts);
  if (previousSubjects.includes('anv') && anv.level !== 'NA' && anv.level !== 'REDUIT') {
    anv.verdicts.push({ level: 'CRITIQUE', text: '⚠ Risque de réitération identifié sur les avantages en nature.' });
    anv.level = 'CRITIQUE';
  }
  themes.push(anv);

  // === BLOC 6 — Ruptures ===
  const ruptures = { name: 'Ruptures du contrat de travail', icon: '📝', verdicts: [], level: 'NA' };

  if (answers['Q6.1'] === 'non') {
    ruptures.verdicts.push({ level: 'NA', text: 'Non concerné — pas d\'indemnités de rupture versées sur les 3 dernières années.' });
  } else if (answers['Q6.1'] !== 'non') {
    if (['non-revu', 'non', 'nsp'].includes(answers['Q6.2']) && answers['Q6.2'] !== 'pas-transaction') {
      ruptures.verdicts.push({ level: 'ELEVE', text: 'Le traitement social des indemnités transactionnelles n\'a pas fait l\'objet d\'une revue spécifique. Risque de redressement.' });
    }
    if (['pas-toujours', 'non', 'nsp'].includes(answers['Q6.3']) && answers['Q6.3'] !== 'pas-concerne') {
      ruptures.verdicts.push({ level: 'ELEVE', text: 'La contribution patronale de 40 % sur les ruptures conventionnelles n\'est pas systématiquement appliquée.' });
    }
    if (answers['Q6.4'] === 'oui') {
      ruptures.verdicts.push({ level: 'SIGNAL', text: 'Des indemnités dépassant 2 PASS (96 120 €) sont intégralement assujetties. Vérification du traitement recommandée.' });
    }
  }

  ruptures.level = getMaxLevel(ruptures.verdicts);
  if (previousSubjects.includes('ruptures') && ruptures.level !== 'NA' && ruptures.level !== 'REDUIT') {
    ruptures.verdicts.push({ level: 'CRITIQUE', text: '⚠ Risque de réitération identifié sur les ruptures de contrat.' });
    ruptures.level = 'CRITIQUE';
  }
  themes.push(ruptures);

  // === BLOC 7 — Versement mobilité ===
  const vm = { name: 'Versement mobilité', icon: '🚌', verdicts: [], level: 'NA' };

  if (answers['Q0.1'] === '1-10') {
    // Section masquée
  } else {
    if (answers['Q7.1'] === 'nsp') {
      vm.verdicts.push({ level: 'SIGNAL', text: 'L\'incertitude sur le versement mobilité appelle une vérification de votre assujettissement.' });
    } else if (answers['Q7.1'] === 'oui') {
      if (answers['Q7.2'] === 'taux-unique') {
        vm.verdicts.push({ level: 'ELEVE', text: 'Un taux unique appliqué sans vérification lieu par lieu expose à un redressement si vos salariés sont affectés dans des zones à taux différents.' });
      } else if (answers['Q7.2'] === 'nsp') {
        vm.verdicts.push({ level: 'MOYEN', text: 'Vérification recommandée du taux VM par lieu d\'affectation.' });
      }
      if (['ponctuellement', 'non', 'nsp'].includes(answers['Q7.3'])) {
        vm.verdicts.push({ level: 'MOYEN', text: 'Le taux VM évolue au 1er janvier et au 1er juillet. Un paramétrage non mis à jour expose à des écarts.' });
      }
    }
  }

  vm.level = getMaxLevel(vm.verdicts);
  if (previousSubjects.includes('vm') && vm.level !== 'NA' && vm.level !== 'REDUIT') {
    vm.verdicts.push({ level: 'CRITIQUE', text: '⚠ Risque de réitération identifié sur le versement mobilité.' });
    vm.level = 'CRITIQUE';
  }
  themes.push(vm);

  return { themes, fiabilite, answers };
}

function getMaxLevel(verdicts) {
  const priority = ['CRITIQUE', 'ELEVE', 'MOYEN', 'SIGNAL', 'REDUIT', 'NA'];
  let max = 'NA';
  for (const v of verdicts) {
    if (priority.indexOf(v.level) < priority.indexOf(max)) {
      max = v.level;
    }
  }
  return max;
}

/* ============================================
   RAPPORT VISUEL
   ============================================ */

function generateReportHTML(scoring) {
  const { themes, fiabilite } = scoring;

  // Compute global risk
  const allLevels = themes.map(t => t.level).filter(l => l !== 'NA');
  const globalLevel = allLevels.length ? getMaxLevel(themes.map(t => ({ level: t.level }))) : 'REDUIT';
  const globalRisk = RISK_LEVELS[globalLevel] || RISK_LEVELS.MOYEN;

  // Fiabilité label
  const fiabLabels = {
    bon: 'Résultats à bon niveau de confiance.',
    partielle: 'Résultats à fiabilité partielle — la difficulté à produire certains justificatifs aggrave votre exposition.',
    faible: 'Résultats sous réserve documentaire — l\'incapacité à produire vos justificatifs constitue un facteur de risque majeur.'
  };

  let html = `
    <div class="report">
      <div class="report-header">
        <h3>Votre prédiagnostic URSSAF</h3>
        <p class="report-fiabilite" style="color:${fiabilite === 'bon' ? '#10B981' : fiabilite === 'partielle' ? '#F59E0B' : '#EF4444'}">
          ${fiabLabels[fiabilite]}
        </p>
      </div>

      <div class="report-global">
        <div class="report-global-level" style="background:${globalRisk.bgColor};border-color:${globalRisk.color}">
          <span class="report-global-icon">${globalRisk.icon}</span>
          <div>
            <div class="report-global-label">Niveau d'exposition global</div>
            <div class="report-global-value" style="color:${globalRisk.color}">${globalRisk.label}</div>
          </div>
        </div>
      </div>

      <div class="report-themes">
  `;

  themes.forEach(theme => {
    const risk = RISK_LEVELS[theme.level] || RISK_LEVELS.NA;
    html += `
      <div class="report-theme">
        <div class="report-theme-header">
          <span class="report-theme-icon">${theme.icon}</span>
          <h4>${theme.name}</h4>
          <span class="report-theme-badge" style="background:${risk.bgColor};color:${risk.color};border:1px solid ${risk.color}20">
            ${risk.icon} ${risk.label}
          </span>
        </div>
    `;

    if (theme.verdicts.length === 0) {
      html += `<p class="report-verdict report-verdict-na">Aucun risque identifié sur la base de vos réponses.</p>`;
    } else {
      theme.verdicts.forEach(v => {
        const vRisk = RISK_LEVELS[v.level] || RISK_LEVELS.NA;
        html += `<p class="report-verdict" style="border-left-color:${vRisk.color}">${v.text}</p>`;
      });
    }

    html += `</div>`;
  });

  html += `
      </div>

      <div class="report-disclaimer">
        <p><strong>Avertissement :</strong> Ce prédiagnostic repose intégralement sur vos réponses déclaratives.
        Il ne constitue ni un audit, ni une validation de conformité. Les résultats sont indicatifs et ne valent
        pas conclusions juridiques définitives. Seul un audit approfondi permet de confirmer ou d'infirmer
        les risques identifiés.</p>
      </div>

      <div class="report-cta">
        <p>Pour un rapport complet avec chiffrage de votre exposition et plan d'action détaillé :</p>
        <a href="#contact" class="btn-primary">Prendre rendez-vous avec notre équipe →</a>
      </div>
    </div>
  `;

  return html;
}
