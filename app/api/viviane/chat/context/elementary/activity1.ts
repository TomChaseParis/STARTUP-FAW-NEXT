export const ACTIVITY_CLARA_CONTEXT = {
  activityId: "elementary_activity_1",
  level: "A2",
  title: "L’emploi du temps mouvementé de Clara",

  description: `
Activité 1 basée sur la journée de Clara.
Compréhension orale, formulation de questions, transformation JE → ELLE.
`,

  keyPoints: [
    "verbes pronominaux",
    "présent de l’indicatif",
    "expression du temps",
    "questions en français",
    "pronoms réfléchis",
  ],

  exercice1: {
    type: "question_formulation",
    instructions:
      "Formule la question correspondant à chaque réponse de Clara.",
  },

  exercice2: {
    type: "pronoun_transformation",
    instructions: "Transforme tout le texte du JE → ELLE.",
  },

  // 🔥 AJOUT OBLIGATOIRE : C’EST CE QUI CORRIGE TON ERREUR
  transcription: `
DIAPO 1 — Le matin, le réveil sonne à 8 heures et demie, mais je me lève seulement à 9 heures.
DIAPO 2 — À peine 5 minutes plus tard, je suis déjà dans ma salle de bain. Je me douche et je me brosse les dents.
DIAPO 3 — 10 minutes après, je suis dans la cuisine. Là, je bois du thé avec du miel et je mange une tartine de pain avec de la confiture, et des céréales.
DIAPO 4 — Après le petit déjeuner, je retourne dans ma chambre pour m’habiller et préparer mes affaires.
DIAPO 5 — À dix heures moins le quart, quand je quitte la maison, mon gros chat Gaston dort encore dans son panier. Quel paresseux !
DIAPO 6 — Je vais au travail en métro. Je mets à peu près 25 minutes s’il n’y a pas de problème sur la ligne.
DIAPO 7 — Je commence à travailler à 10 heures et quart.
DIAPO 8 — Je suis professeur de danse orientale dans une petite école, à Paris, depuis maintenant 8 ans.
DIAPO 9 — J’ai une pause entre midi et 2 heures. Souvent, je déjeune avec mon collègue Jamal ou certains de mes élèves.
DIAPO 10 — Après, je vais parfois m’asseoir dans un parc pour lire un bon livre et m’aérer l’esprit.
DIAPO 11 — Ensuite, je retourne travailler. Je donne des cours jusqu’à 4 heures de l’après-midi.
DIAPO 12 — Je finis chaque séance par une session « méditation », parfois assez intense.
DIAPO 13 — Après le travail, j’aime bien me promener et flâner devant les vitrines.
DIAPO 14 — Juste avant de rentrer, je m’arrête à l’épicerie ou chez Monoprix pour faire des courses.
DIAPO 15 — Une fois arrivée chez moi, je donne à manger à Gaston.
DIAPO 16 — Vers 19 heures, je me prépare à dîner : pâtes à la mozzarella.
DIAPO 17 — Après le dîner, il m’arrive de sortir avec des amis.
DIAPO 18 — La semaine dernière, je suis allée voir un spectacle de patinage artistique avec mon cousin Zig.
DIAPO 19 — Avant d’aller au lit, j’appelle ma mère ou mon frère.
DIAPO 20 — Je me mets au lit vers 11 heures, je lis un peu et j’éteins la lumière.
`,

  slidesNarration: [
    { slide: 1, narration: "Le réveil sonne à 8h30." },
    { slide: 2, narration: "Elle va dans la salle de bain." },
    { slide: 3, narration: "Elle boit du thé et mange une tartine." },
    // etc. garde tes données ici si tu en as
  ],
};
