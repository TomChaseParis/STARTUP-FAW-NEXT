import { TableCompletionActivity } from "@/components/activity/table-completion/types";

export const activity2Data: TableCompletionActivity = {
  instruction:"",
  title: "Complète les informations",

  questions: [
    {
      id: "1",
      before: "Xavier est",
      after: ".",
      answer: "son prénom",
      options: [
        "son nom de famille",
        "son prénom",
        "le nom de son chien",
      ],
    },
    {
      id: "2",
      before: "Plantu est",
      after: ".",
      answer: "son nom de famille",
      options: [
        "son nom de famille",
        "son prénom",
        "le nom de sa tortue",
      ],
    },
    {
      id: "3",
      before: "Sa nationalité est",
      after: ".",
      answer: "canadienne",
      options: [
        "belge",
        "française",
        "canadienne",
      ],
    },
    {
      id: "4",
      before: "Il parle français",
      after: ".",
      answer: "très bien",
      options: [
        "pas du tout",
        "un peu",
        "très bien",
      ],
    },
    {
      id: "5",
      before: "Il a",
      after: ".",
      answer: "46 ans",
      options: [
        "45 ans",
        "46 ans",
        "47 ans",
      ],
    },
    {
      id: "6",
      before: "Il est",
      after: ".",
      answer: "divorcé",
      options: [
        "divorcé",
        "marié",
        "veuf",
      ],
    },
    {
      id: "7",
      before: "Il a",
      after: ".",
      answer: "un garçon et une fille",
      options: [
        "aucun enfant",
        "un garçon et une fille",
        "deux garçons",
      ],
    },
    {
      id: "8",
      before: "Son métier est",
      after: ".",
      answer: "ingénieur",
      options: [
        "artiste",
        "ingénieur",
        "sans emploi",
      ],
    },
    {
      id: "9",
      before: "Il habite à",
      after: ".",
      answer: "Paris",
      options: [
        "Vancouver",
        "Bruxelles",
        "Paris",
      ],
    },
    {
      id: "10",
      before: "Il habite dans",
      after: ".",
      answer: "le quinzième arrondissement",
      options: [
        "le sixième arrondissement",
        "le seizième arrondissement",
        "le quinzième arrondissement",
      ],
    },
    {
      id: "11",
      before: "Son numéro de téléphone est",
      after: ".",
      answer: "06 32 12 45 30",
      options: [
        "01 20 00 76 88",
        "06 32 12 45 30",
        "06 33 82 72 24",
      ],
    },
    {
      id: "12",
      before: "Son adresse e-mail est",
      after: ".",
      answer: "plantu.xavier@gmail.com",
      options: [
        "plantu_xavier@gmail.com",
        "plantuxavier@gmail.com",
        "plantu.xavier@gmail.com",
      ],
    },
    {
      id: "13",
      before: "Ses hobbies sont",
      after: ".",
      answer: "la musique et le sport",
      options: [
        "les tortues et le bowling",
        "la musique et le sport",
        "les jeux vidéo",
      ],
    },
    {
      id: "14",
      before: "Il recherche",
      after: ".",
      answer: "une femme de 30 ans, sympathique et sportive",
      options: [
        "une femme de 30 ans, sympathique et sportive",
        "une femme de 85 ans, vieille et édentée",
        "une femme de son âge, plutôt intellectuelle",
      ],
    },
  ],
};