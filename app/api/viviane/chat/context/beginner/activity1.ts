export const ACTIVITY_1_CONTEXT = {
  activityId: "beginner_activity_1",
  level: "A1", // ⭐ Niveau ajouté
  title: "Les verbes essentiels : Être, Avoir, Faire, Aller",

  description: `
Objectif : apprendre ou réviser les 4 verbes essentiels en français (être, avoir, faire, aller).
Viviane doit être extrêmement simple, lente, très encourageante.
Elle aide l’élève à comprendre la conjugaison et à former des phrases basiques.
  `.trim(),

  goals: [
    "Comprendre les verbes essentiels du français",
    "Former des phrases simples",
    "Répondre à des questions basiques",
    "Développer une première aisance orale",
  ],

  verbs: {
    être: [
      "je suis",
      "tu es",
      "il/elle est",
      "nous sommes",
      "vous êtes",
      "ils/elles sont",
    ],
    avoir: [
      "j’ai",
      "tu as",
      "il/elle a",
      "nous avons",
      "vous avez",
      "ils/elles ont",
    ],
    faire: [
      "je fais",
      "tu fais",
      "il/elle fait",
      "nous faisons",
      "vous faites",
      "ils/elles font",
    ],
    aller: [
      "je vais",
      "tu vas",
      "il/elle va",
      "nous allons",
      "vous allez",
      "ils/elles vont",
    ],
  },

  exercises: [
    { phrase: "Tu ....... quel âge ?", word: "as" },
    { phrase: "Je ne ....... pas français", word: "suis" },
    { phrase: "Nous ....... un problème", word: "avons" },
    { phrase: "Il ....... froid aujourd'hui ?", word: "fait" },
    { phrase: "Vous ....... bien ?", word: "allez" },
  ],
};
