/* ============================================
   ACOMPIA — Questionnaire Prédiagnostic URSSAF
   42 questions avec logique conditionnelle
   ============================================ */

const QUESTIONS = [
  // ====== SECTION 0 — Profil entreprise ======
  {
    id: 'Q0.1', section: 'Votre profil entreprise', sectionIcon: '🏢',
    text: 'Combien de salariés compte votre entreprise ?',
    type: 'single',
    options: [
      { value: '1-10', label: '1 à 10' },
      { value: '11-49', label: '11 à 49' },
      { value: '50-249', label: '50 à 249' },
      { value: '250+', label: '250 et plus' }
    ]
  },
  {
    id: 'Q0.2', section: 'Votre profil entreprise', sectionIcon: '🏢',
    text: 'Quelle est votre masse salariale annuelle brute approximative ?',
    type: 'single',
    options: [
      { value: '<500k', label: 'Moins de 500 000 €' },
      { value: '500k-2M', label: '500 000 € à 2 M€' },
      { value: '2M-10M', label: '2 M€ à 10 M€' },
      { value: '10M-50M', label: '10 M€ à 50 M€' },
      { value: '50M+', label: 'Plus de 50 M€' },
      { value: 'nc', label: 'Je préfère ne pas répondre' }
    ]
  },
  {
    id: 'Q0.3', section: 'Votre profil entreprise', sectionIcon: '🏢',
    text: 'Quel est votre secteur d\'activité principal ?',
    type: 'single',
    options: [
      { value: 'btp', label: 'BTP' },
      { value: 'transport', label: 'Transport / logistique' },
      { value: 'hcr', label: 'Hôtellerie / restauration' },
      { value: 'commerce', label: 'Commerce / distribution' },
      { value: 'services', label: 'Services / conseil' },
      { value: 'industrie', label: 'Industrie' },
      { value: 'sante', label: 'Santé / médico-social' },
      { value: 'tech', label: 'Tech / numérique' },
      { value: 'autre', label: 'Autre' }
    ]
  },
  {
    id: 'Q0.4', section: 'Votre profil entreprise', sectionIcon: '🏢',
    text: 'Avez-vous déjà fait l\'objet d\'un contrôle URSSAF ?',
    type: 'single',
    options: [
      { value: 'oui-ok', label: 'Oui, sans redressement ni observation' },
      { value: 'oui-redress', label: 'Oui, avec redressement et/ou observations' },
      { value: 'non', label: 'Non, jamais' },
      { value: 'nsp', label: 'Je ne sais pas' }
    ]
  },
  {
    id: 'Q0.5', section: 'Votre profil entreprise', sectionIcon: '🏢',
    text: 'Sur quel(s) sujet(s) portaient le redressement et/ou les observations ?',
    type: 'multi',
    condition: (answers) => answers['Q0.4'] === 'oui-redress',
    options: [
      { value: 'frais-pro', label: 'Frais professionnels' },
      { value: 'anv', label: 'Avantages en nature' },
      { value: 'psc', label: 'Contrats collectifs (mutuelle / prévoyance)' },
      { value: 'reduction', label: 'Réduction générale de cotisations' },
      { value: 'ruptures', label: 'Ruptures du contrat de travail' },
      { value: 'vm', label: 'Versement mobilité' },
      { value: 'hs-remun', label: 'Heures supplémentaires / rémunérations' },
      { value: 'autres', label: 'Autres' }
    ]
  },
  {
    id: 'Q0.6', section: 'Votre profil entreprise', sectionIcon: '🏢',
    text: 'Êtes-vous en mesure de retrouver facilement vos principaux justificatifs sociaux et de paie ?',
    type: 'single',
    options: [
      { value: 'oui', label: 'Oui, facilement' },
      { value: 'partiellement', label: 'Partiellement' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne sais pas' }
    ]
  },

  // ====== SECTION 1 — Frais professionnels ======
  {
    id: 'Q1.1', section: 'Frais professionnels', sectionIcon: '💰',
    text: 'Votre entreprise rembourse-t-elle des frais professionnels à ses salariés ?',
    type: 'single',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' }
    ]
  },
  {
    id: 'Q1.2', section: 'Frais professionnels', sectionIcon: '💰',
    text: 'Si un contrôleur URSSAF vous demandait de produire, pour chaque salarié remboursé en indemnités kilométriques (IK), la carte grise ET le relevé détaillé des trajets, pourriez-vous le faire ?',
    type: 'single',
    condition: (answers) => answers['Q1.1'] === 'oui',
    options: [
      { value: 'oui-tous', label: 'Oui, pour tous' },
      { value: 'certains', label: 'Pour certains seulement' },
      { value: 'non', label: 'Non' },
      { value: 'pas-ik', label: 'Pas d\'IK dans l\'entreprise' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q1.3', section: 'Frais professionnels', sectionIcon: '💰',
    text: 'Versez-vous des indemnités forfaitaires (repas, panier, découcher, déplacement) ?',
    type: 'single',
    condition: (answers) => answers['Q1.1'] === 'oui',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q1.4', section: 'Frais professionnels', sectionIcon: '💰',
    text: 'Pourriez-vous justifier, pour chaque frais remboursé ou indemnisé, la dépense engagée ou la situation ouvrant droit ?',
    type: 'single',
    condition: (answers) => answers['Q1.1'] === 'oui',
    options: [
      { value: 'oui-tous', label: 'Oui, pour tous les cas' },
      { value: 'certains', label: 'Pour certains seulement' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q1.5', section: 'Frais professionnels', sectionIcon: '💰',
    text: 'Appliquez-vous la déduction forfaitaire spécifique (DFS) pour certaines catégories de salariés ?',
    type: 'single',
    condition: (answers) => ['btp', 'transport', 'hcr'].includes(answers['Q0.3']),
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne sais pas ce que c\'est' }
    ]
  },

  // ====== SECTION 1bis — Avantages et remboursements du quotidien ======
  {
    id: 'Q1bis.1', section: 'Avantages du quotidien', sectionIcon: '🍽️',
    text: 'Accordez-vous des titres-restaurant à tout ou partie de vos salariés ?',
    type: 'single',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q1bis.2', section: 'Avantages du quotidien', sectionIcon: '🍽️',
    text: 'La contribution patronale respecte-t-elle les conditions d\'exonération applicables, et les titres sont-ils attribués uniquement pour les jours effectivement travaillés comprenant une pause repas ?',
    type: 'single',
    condition: (answers) => answers['Q1bis.1'] === 'oui',
    hint: 'Par "de manière sécurisée", on entend : règles respectées, justificatifs disponibles, et traitement paie conforme en cas de contrôle URSSAF.',
    options: [
      { value: 'oui', label: 'Oui, de manière sécurisée' },
      { value: 'partiellement', label: 'Partiellement' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q1bis.3', section: 'Avantages du quotidien', sectionIcon: '🍽️',
    text: 'Prenez-vous en charge les abonnements de transport public ou de location de vélos de vos salariés, sur justificatifs, selon les règles applicables ?',
    type: 'single',
    options: [
      { value: 'oui', label: 'Oui, de manière sécurisée' },
      { value: 'pas-homogene', label: 'Oui, mais pas de manière homogène' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q1bis.4', section: 'Avantages du quotidien', sectionIcon: '🍽️',
    text: 'Versez-vous une indemnité ou allocation liée au télétravail, et son traitement social est-il sécurisé (forfait admis ou justificatifs) ?',
    type: 'single',
    options: [
      { value: 'oui', label: 'Oui, traitement sécurisé' },
      { value: 'oui-sans-verif', label: 'Oui, mais sans vraie vérification' },
      { value: 'non', label: 'Non, aucune allocation télétravail' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },

  // ====== SECTION 2 — Mutuelle et prévoyance ======
  {
    id: 'Q2.1a', section: 'Mutuelle et prévoyance', sectionIcon: '🏥',
    text: 'Comment votre complémentaire santé (mutuelle) a-t-elle été formalisée ?',
    type: 'single',
    options: [
      { value: 'accord', label: 'Par un accord collectif (d\'entreprise ou de branche)' },
      { value: 'due', label: 'Par une décision unilatérale de l\'employeur (DUE)' },
      { value: 'referendum', label: 'Par un référendum' },
      { value: 'aucune', label: 'Aucune formalisation à ma connaissance' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q2.1b', section: 'Mutuelle et prévoyance', sectionIcon: '🏥',
    text: 'Pouvez-vous produire la preuve de remise individuelle de cette DUE à chaque salarié (émargement, accusé de réception) ?',
    type: 'single',
    condition: (answers) => answers['Q2.1a'] === 'due',
    options: [
      { value: 'oui-tous', label: 'Oui, pour tous les salariés' },
      { value: 'certains', label: 'Pour certains seulement' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q2.2a', section: 'Mutuelle et prévoyance', sectionIcon: '🏥',
    text: 'Comment votre régime de prévoyance complémentaire (incapacité, invalidité, décès) a-t-il été formalisé, notamment pour vos cadres ?',
    type: 'single',
    options: [
      { value: 'accord', label: 'Par un accord collectif (d\'entreprise ou de branche)' },
      { value: 'due', label: 'Par une décision unilatérale de l\'employeur (DUE)' },
      { value: 'referendum', label: 'Par un référendum' },
      { value: 'pas-regime', label: 'Pas de régime de prévoyance' },
      { value: 'aucune', label: 'Aucune formalisation à ma connaissance' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q2.2b', section: 'Mutuelle et prévoyance', sectionIcon: '🏥',
    text: 'Pouvez-vous produire la preuve de remise individuelle de cette DUE prévoyance à chaque salarié ?',
    type: 'single',
    condition: (answers) => answers['Q2.2a'] === 'due',
    options: [
      { value: 'oui-tous', label: 'Oui, pour tous les salariés' },
      { value: 'certains', label: 'Pour certains seulement' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q2.3', section: 'Mutuelle et prévoyance', sectionIcon: '🏥',
    text: 'Pour chaque salarié dispensé d\'affiliation, la dispense est-elle prévue dans l\'acte juridique, le salarié remplit-il les conditions requises, et disposez-vous d\'une demande de dispense écrite, signée ?',
    type: 'single',
    options: [
      { value: 'oui-tous', label: 'Oui, pour tous les dispensés' },
      { value: 'certains', label: 'Pour certains seulement' },
      { value: 'non', label: 'Non' },
      { value: 'pas-dispense', label: 'Pas de salariés dispensés' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },

  // ====== SECTION 3 — Temps de travail et rémunérations ======
  {
    id: 'Q3.1', section: 'Temps de travail et rémunérations', sectionIcon: '⏰',
    text: 'Des salariés effectuent-ils, même occasionnellement, des heures au-delà de leur durée habituelle ?',
    type: 'single',
    options: [
      { value: 'regulierement', label: 'Oui, régulièrement' },
      { value: 'occasionnellement', label: 'Oui, occasionnellement' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q3.2', section: 'Temps de travail et rémunérations', sectionIcon: '⏰',
    text: 'Ces heures sont-elles systématiquement déclarées sur les bulletins de paie, et pourriez-vous produire un décompte individuel fiable pour chaque salarié concerné ?',
    type: 'single',
    condition: (answers) => answers['Q3.1'] !== 'non',
    options: [
      { value: 'oui-tous', label: 'Oui, déclarées et décompte disponible pour tous' },
      { value: 'declarees-partiel', label: 'Déclarées mais décompte partiel ou absent' },
      { value: 'pas-toujours', label: 'Pas toujours déclarées' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q3.3', section: 'Temps de travail et rémunérations', sectionIcon: '⏰',
    text: 'Chaque salarié en forfait jours dispose-t-il d\'une convention individuelle écrite, d\'un suivi des jours travaillés et d\'un entretien annuel sur sa charge de travail ?',
    type: 'single',
    options: [
      { value: 'oui-trois', label: 'Oui, les trois pour tous' },
      { value: 'partiellement', label: 'Partiellement' },
      { value: 'non', label: 'Non' },
      { value: 'pas-forfait', label: 'Pas de salariés en forfait jours' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q3.4', section: 'Temps de travail et rémunérations', sectionIcon: '⏰',
    text: 'Parmi vos travailleurs indépendants réguliers, certains travaillent-ils dans des conditions proches d\'un salarié : horaires imposés, directives précises, intégration dans vos équipes ?',
    type: 'single',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
      { value: 'pas-independants', label: 'Pas d\'indépendants réguliers' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q3.5', section: 'Temps de travail et rémunérations', sectionIcon: '⏰',
    text: 'Toutes les sommes versées aux salariés (primes, gratifications, avantages) passent-elles systématiquement par le bulletin de paie et la DSN ?',
    type: 'single',
    options: [
      { value: 'oui-toutes', label: 'Oui, toutes' },
      { value: 'plupart', label: 'Pour la plupart' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },

  // ====== SECTION 4 — Réduction générale / RGDU ======
  {
    id: 'Q4.1', section: 'Réduction générale (RGDU)', sectionIcon: '📊',
    text: 'Quelle part de vos salariés perçoit une rémunération brute inférieure à 3 SMIC ?',
    type: 'single',
    hint: 'Repère : pour un temps plein présent toute l\'année, 3 SMIC ≈ 5 469 € brut/mois en 2026.',
    options: [
      { value: 'majorite', label: 'La majorité (> 50 %)' },
      { value: 'significative', label: 'Une part significative (20-50 %)' },
      { value: 'faible', label: 'Une faible part (< 20 %)' },
      { value: 'aucun', label: 'Aucun' },
      { value: 'nsp', label: 'Je ne sais pas' }
    ]
  },
  {
    id: 'Q4.2', section: 'Réduction générale (RGDU)', sectionIcon: '📊',
    text: 'Le calcul de la RGDU fait-il l\'objet d\'un contrôle humain au-delà du logiciel de paie ?',
    type: 'single',
    condition: (answers) => answers['Q4.1'] !== 'aucun',
    options: [
      { value: 'oui-sys', label: 'Oui, systématiquement' },
      { value: 'oui-ponctuel', label: 'Oui, ponctuellement' },
      { value: 'non', label: 'Non, essentiellement le logiciel' },
      { value: 'nsp', label: 'Je ne sais pas' }
    ]
  },
  {
    id: 'Q4.3', section: 'Réduction générale (RGDU)', sectionIcon: '📊',
    text: 'Rencontrez-vous fréquemment des situations complexifiant le calcul : primes variables, temps partiel, entrées/sorties, heures sup, forfaits jours ?',
    type: 'single',
    condition: (answers) => answers['Q4.1'] !== 'aucun',
    options: [
      { value: 'oui-freq', label: 'Oui, fréquemment' },
      { value: 'oui-ponctuel', label: 'Oui, ponctuellement' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne sais pas' }
    ]
  },

  // ====== SECTION 5 — Avantages en nature ======
  {
    id: 'Q5.1', section: 'Avantages en nature', sectionIcon: '🚗',
    text: 'Pour les véhicules mis à disposition par l\'entreprise, un usage personnel est-il autorisé ou toléré ?',
    type: 'single',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'strict-pro', label: 'Non, usage strictement professionnel' },
      { value: 'pas-vehicule', label: 'Pas de véhicule mis à disposition' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q5.1b', section: 'Avantages en nature', sectionIcon: '🚗',
    text: 'Pourriez-vous démontrer cet usage strictement professionnel en contrôle (interdiction écrite, restitution hors temps de travail, carnet de bord) ?',
    type: 'single',
    condition: (answers) => answers['Q5.1'] === 'strict-pro',
    options: [
      { value: 'oui', label: 'Oui, éléments en place' },
      { value: 'partiellement', label: 'Partiellement' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q5.2', section: 'Avantages en nature', sectionIcon: '🚗',
    text: 'L\'avantage en nature véhicule figure-t-il sur les bulletins de paie, et sa méthode d\'évaluation a-t-elle été vérifiée depuis la réforme du 1er février 2025 ?',
    type: 'single',
    condition: (answers) => ['oui', 'nsp'].includes(answers['Q5.1']),
    options: [
      { value: 'oui-verifie', label: 'Oui, déclaré et évaluation vérifiée post-2025' },
      { value: 'declare-non-verifie', label: 'Déclaré mais évaluation non revérifiée' },
      { value: 'certains', label: 'Pour certains véhicules seulement' },
      { value: 'non', label: 'Non, pas d\'ANV déclaré' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q5.3', section: 'Avantages en nature', sectionIcon: '🚗',
    text: 'L\'avantage en nature correspondant à l\'usage personnel d\'outils numériques (téléphone, PC, tablette) est-il identifié et valorisé en paie ?',
    type: 'single',
    options: [
      { value: 'oui-tous', label: 'Oui, pour tous' },
      { value: 'certains', label: 'Pour certains seulement' },
      { value: 'non', label: 'Non' },
      { value: 'pas-outils', label: 'Pas d\'outils à usage personnel' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q5.4', section: 'Avantages en nature', sectionIcon: '🚗',
    text: 'Accordez-vous d\'autres avantages en nature significatifs (logement, nourriture, autre) et sont-ils traités en paie ?',
    type: 'single',
    options: [
      { value: 'oui-traites', label: 'Oui, traités en paie' },
      { value: 'oui-non-traites', label: 'Oui, mais non traités en paie' },
      { value: 'non', label: 'Non, pas d\'autre ANV' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },

  // ====== SECTION 6 — Ruptures du contrat de travail ======
  {
    id: 'Q6.1', section: 'Ruptures du contrat de travail', sectionIcon: '📝',
    text: 'Au cours des 3 dernières années, avez-vous versé des indemnités à l\'occasion de départs de salariés ?',
    type: 'single',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q6.2', section: 'Ruptures du contrat de travail', sectionIcon: '📝',
    text: 'Pour les transactions conclues, le traitement social de l\'indemnité a-t-il fait l\'objet d\'une revue spécifique distincte de la rédaction du protocole ?',
    type: 'single',
    condition: (answers) => answers['Q6.1'] !== 'non',
    options: [
      { value: 'oui', label: 'Oui, revue spécifique' },
      { value: 'non-revu', label: 'Protocole rédigé mais traitement social non revu' },
      { value: 'non', label: 'Non' },
      { value: 'pas-transaction', label: 'Pas de transaction' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q6.3', section: 'Ruptures du contrat de travail', sectionIcon: '📝',
    text: 'Pour les ruptures conventionnelles ou mises à la retraite, la contribution patronale de 40 % sur la part exonérée a-t-elle été appliquée ?',
    type: 'single',
    condition: (answers) => answers['Q6.1'] !== 'non',
    options: [
      { value: 'oui-sys', label: 'Oui, systématiquement' },
      { value: 'pas-toujours', label: 'Pas toujours' },
      { value: 'non', label: 'Non' },
      { value: 'pas-concerne', label: 'Pas concerné' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q6.4', section: 'Ruptures du contrat de travail', sectionIcon: '📝',
    text: 'Certaines indemnités de rupture versées à un même salarié ont-elles atteint ou dépassé 96 120 € (2 PASS en 2026) ?',
    type: 'single',
    condition: (answers) => answers['Q6.1'] !== 'non',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },

  // ====== SECTION 7 — Versement mobilité ======
  {
    id: 'Q7.1', section: 'Versement mobilité', sectionIcon: '🚌',
    text: 'Votre entreprise verse-t-elle une cotisation au titre du versement mobilité (VM) ?',
    type: 'single',
    condition: (answers) => answers['Q0.1'] !== '1-10',
    hint: 'Depuis 2026, un VMRR peut s\'ajouter au VM dans certaines régions.',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
      { value: 'nsp', label: 'Je ne sais pas' }
    ]
  },
  {
    id: 'Q7.2', section: 'Versement mobilité', sectionIcon: '🚌',
    text: 'Le VM est-il calculé en tenant compte du lieu d\'affectation de chaque salarié, ou un taux unique est-il appliqué ?',
    type: 'single',
    condition: (answers) => answers['Q7.1'] === 'oui',
    options: [
      { value: 'lieu-par-lieu', label: 'Taux vérifié lieu par lieu' },
      { value: 'taux-unique', label: 'Taux unique appliqué' },
      { value: 'un-seul-lieu', label: 'Un seul lieu d\'affectation' },
      { value: 'nsp', label: 'Je ne suis pas sûr(e)' }
    ]
  },
  {
    id: 'Q7.3', section: 'Versement mobilité', sectionIcon: '🚌',
    text: 'Le taux est-il revérifié lors des évolutions au 1er janvier ou au 1er juillet ?',
    type: 'single',
    condition: (answers) => answers['Q7.1'] === 'oui',
    options: [
      { value: 'oui-sys', label: 'Oui, systématiquement' },
      { value: 'ponctuellement', label: 'Ponctuellement seulement' },
      { value: 'non', label: 'Non, paramétrage existant' },
      { value: 'nsp', label: 'Je ne sais pas' }
    ]
  }
];

/* ============================================
   QUESTIONNAIRE ENGINE
   ============================================ */

class Questionnaire {
  constructor(containerId, progressBarId, progressTextId) {
    this.container = document.getElementById(containerId);
    this.progressBar = document.getElementById(progressBarId);
    this.progressText = document.getElementById(progressTextId);
    this.answers = {};
    this.currentIndex = 0;
    this.activeQuestions = [];
    this.started = false;
    this.computeActiveQuestions();
  }

  computeActiveQuestions() {
    this.activeQuestions = QUESTIONS.filter(q => {
      if (!q.condition) return true;
      return q.condition(this.answers);
    });
  }

  getTotalActive() {
    return this.activeQuestions.length;
  }

  getCurrentQuestion() {
    return this.activeQuestions[this.currentIndex];
  }

  updateProgress() {
    const total = this.getTotalActive();
    const answered = Object.keys(this.answers).length;
    const pct = Math.round((answered / total) * 100);
    if (this.progressBar) {
      this.progressBar.style.setProperty('--progress', pct + '%');
    }
    if (this.progressText) {
      this.progressText.textContent = `${answered} / ${total}`;
    }
  }

  start() {
    this.started = true;
    this.currentIndex = 0;
    this.answers = {};
    this.computeActiveQuestions();
    this.render();
  }

  render() {
    const q = this.getCurrentQuestion();
    if (!q) {
      this.renderContactForm();
      return;
    }

    const prevSection = this.currentIndex > 0 ? this.activeQuestions[this.currentIndex - 1].section : null;
    const showSectionHeader = q.section !== prevSection;

    let html = '';

    if (showSectionHeader) {
      html += `<div class="q-section-header">
        <span class="q-section-icon">${q.sectionIcon}</span>
        <span class="q-section-name">${q.section}</span>
      </div>`;
    }

    html += `<div class="q-card">
      <div class="q-number">Question ${this.currentIndex + 1} / ${this.getTotalActive()}</div>
      <h3 class="q-text">${q.text}</h3>`;

    if (q.hint) {
      html += `<p class="q-hint">${q.hint}</p>`;
    }

    html += `<div class="q-options">`;

    q.options.forEach((opt, i) => {
      const selected = q.type === 'multi'
        ? (this.answers[q.id] || []).includes(opt.value)
        : this.answers[q.id] === opt.value;

      html += `<button class="q-option ${selected ? 'q-option-selected' : ''}"
        data-value="${opt.value}" data-index="${i}">
        <span class="q-option-check">${selected ? '✓' : ''}</span>
        <span class="q-option-label">${opt.label}</span>
      </button>`;
    });

    html += `</div>`;

    // Navigation
    html += `<div class="q-nav">`;
    if (this.currentIndex > 0) {
      html += `<button class="q-nav-back" id="q-back">← Précédent</button>`;
    } else {
      html += `<div></div>`;
    }
    if (q.type === 'multi') {
      html += `<button class="q-nav-next btn-primary" id="q-next" ${!(this.answers[q.id] || []).length ? 'disabled' : ''}>Suivant →</button>`;
    }
    html += `</div>`;

    html += `</div>`;

    this.container.innerHTML = html;
    this.updateProgress();
    this.bindEvents(q);
  }

  bindEvents(q) {
    // Option clicks
    this.container.querySelectorAll('.q-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value;

        if (q.type === 'multi') {
          if (!this.answers[q.id]) this.answers[q.id] = [];
          const idx = this.answers[q.id].indexOf(value);
          if (idx >= 0) {
            this.answers[q.id].splice(idx, 1);
          } else {
            this.answers[q.id].push(value);
          }
          this.render();
        } else {
          this.answers[q.id] = value;
          this.computeActiveQuestions();
          // Find new index after recompute
          const newActiveIds = this.activeQuestions.map(aq => aq.id);
          const currentQIdx = newActiveIds.indexOf(q.id);
          this.currentIndex = currentQIdx + 1;
          this.render();
        }
      });
    });

    // Back button
    const backBtn = document.getElementById('q-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        this.render();
      });
    }

    // Next button (multi only)
    const nextBtn = document.getElementById('q-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.computeActiveQuestions();
        const newActiveIds = this.activeQuestions.map(aq => aq.id);
        const currentQIdx = newActiveIds.indexOf(q.id);
        this.currentIndex = currentQIdx + 1;
        this.render();
      });
    }
  }

  renderContactForm() {
    let html = `
      <div class="q-card q-card-final">
        <div class="q-section-header">
          <span class="q-section-icon">📧</span>
          <span class="q-section-name">Votre rapport de prédiagnostic</span>
        </div>
        <h3 class="q-text">Bravo ! Vous avez terminé le prédiagnostic.</h3>
        <p class="q-hint">Renseignez vos coordonnées pour recevoir votre rapport personnalisé. Notre équipe l'analysera avant de vous l'envoyer.</p>

        <form class="q-contact-form" id="q-contact-form">
          <div class="q-form-group">
            <label>Adresse email professionnelle *</label>
            <input type="email" name="email" required placeholder="votre@entreprise.com">
          </div>
          <div class="q-form-group">
            <label>Nom et prénom *</label>
            <input type="text" name="name" required placeholder="Jean Dupont">
          </div>
          <div class="q-form-group">
            <label>Votre fonction</label>
            <select name="function">
              <option value="">Sélectionnez...</option>
              <option value="dirigeant">Dirigeant(e)</option>
              <option value="drh">DRH / RRH</option>
              <option value="daf">DAF / RAF</option>
              <option value="ec">Expert-comptable</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <div class="q-form-group q-form-checkbox">
            <label>
              <input type="checkbox" name="optin">
              <span>Je souhaite être informé(e) de l'actualité ACOMPIA et de ses offres.</span>
            </label>
          </div>

          <button type="submit" class="btn-primary q-submit">Recevoir mon rapport →</button>
        </form>

        <div class="q-nav">
          <button class="q-nav-back" id="q-back-final">← Revenir aux questions</button>
          <div></div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.updateProgress();

    // Back
    document.getElementById('q-back-final').addEventListener('click', () => {
      this.currentIndex = this.activeQuestions.length - 1;
      this.render();
    });

    // Submit
    document.getElementById('q-contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const contact = {
        email: formData.get('email'),
        name: formData.get('name'),
        function: formData.get('function'),
        optin: formData.get('optin') === 'on',
        answers: this.answers
      };

      // Generate scoring & report
      const scoring = computeScoring(this.answers);
      const reportHTML = generateReportHTML(scoring);

      // Build scoring summary for Notion
      const reportSummary = scoring.themes
        .filter(t => t.level !== 'NA')
        .map(t => `${t.icon} ${t.name}: ${t.level}`)
        .join(' | ');

      // Send to Notion via Cloudflare Worker
      const WORKER_URL = 'https://acompia-worker.she-aa1.workers.dev';
      fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'prediag',
          data: {
            name: contact.name,
            email: contact.email,
            function: contact.function || '',
            optin: contact.optin,
            scoring: `Fiabilité: ${scoring.fiabilite} | ${reportSummary}`
          }
        })
      })
      .then(r => r.json())
      .then(res => console.log('Notion sync:', res.success ? '✓' : 'erreur', res))
      .catch(err => console.warn('Notion sync échoué (worker non déployé?):', err.message));

      // Store data in localStorage as backup
      const allPrediags = JSON.parse(localStorage.getItem('acompia_prediags') || '[]');
      allPrediags.push({
        date: new Date().toISOString(),
        contact,
        answers: this.answers,
        scoring: {
          fiabilite: scoring.fiabilite,
          themes: scoring.themes.map(t => ({ name: t.name, level: t.level }))
        }
      });
      localStorage.setItem('acompia_prediags', JSON.stringify(allPrediags));
      console.log('Prédiag sauvegardé dans localStorage. Total:', allPrediags.length);

      this.container.innerHTML = `
        <div class="q-card q-card-success">
          <div class="q-success-icon">✓</div>
          <h3>Merci ${contact.name.split(' ')[0]} !</h3>
          <p>Voici votre prédiagnostic. Pour un rapport complet avec chiffrage détaillé et plan d'action, notre équipe vous contactera à <strong>${contact.email}</strong>.</p>
        </div>
        ${reportHTML}
      `;
    });
  }
}

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('prediag-form');
  if (form) {
    const q = new Questionnaire('prediag-form', 'progress-bar', 'progress-text');

    // Replace placeholder with start button
    form.innerHTML = `
      <div class="prediag-placeholder">
        <div class="prediag-intro">
          <h3>Prédiagnostic URSSAF — cadre et portée</h3>
          <p>Ce questionnaire permet d'obtenir un prédiagnostic automatisé de votre exposition à certains risques URSSAF fréquemment rencontrés en entreprise.</p>
          <p>Il repose exclusivement sur vos réponses déclaratives. Il ne constitue ni un audit de conformité, ni une validation de vos pratiques, ni un avis juridique individualisé. Il a pour seul objet de faire ressortir des zones d'attention, des facteurs de risque probables et des points à vérifier en priorité.</p>
          <p>Les résultats doivent donc être lus sous réserve des pièces, du paramétrage de paie, des DSN, des accords applicables et des pratiques effectives. Seule une revue approfondie permet de confirmer ou d'écarter un risque et, le cas échéant, d'en chiffrer précisément l'exposition.</p>
          <p class="q-hint">Durée estimée : 5 à 8 minutes.</p>

          <details class="rgpd-toggle">
            <summary>🔒 Protection des données personnelles</summary>
            <div class="rgpd-content">
              <p>Le responsable de traitement est ComplyDB SAS, éditrice d'ACOMPIA. Les données renseignées dans ce questionnaire (identité, coordonnées professionnelles, fonction, réponses au questionnaire) sont traitées afin de générer votre rapport de prédiagnostic et, le cas échéant, d'échanger avec vous sur vos besoins en matière d'audit ou de conformité. La base légale de ce traitement est l'exécution de mesures précontractuelles demandées par la personne concernée. L'envoi d'informations commerciales ou d'actualité ACOMPIA repose, lui, sur votre choix distinct en fin de questionnaire.</p>
              <p>Les champs signalés comme obligatoires sont nécessaires à la génération du rapport. À défaut, celui-ci pourra être partiel ou ne pas pouvoir être délivré. Les données sont accessibles aux équipes habilitées de ComplyDB SAS et à ses sous-traitants techniques intervenant pour l'hébergement, le formulaire et l'envoi du rapport. Elles sont conservées pendant une durée proportionnée à la finalité du prédiagnostic, puis archivées ou supprimées selon la politique applicable.</p>
              <p>Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et, lorsque les conditions sont réunies, de portabilité. Vous pouvez également introduire une réclamation auprès de la CNIL. Contact : <a href="mailto:contact@acompia.com" style="color:#4338CA">contact@acompia.com</a>.</p>
            </div>
          </details>
        </div>
        <button class="btn-primary" id="start-prediag">Commencer le prédiagnostic →</button>
      </div>
    `;

    document.getElementById('start-prediag').addEventListener('click', () => {
      q.start();
    });
  }
});
