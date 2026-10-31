export type SemanticCategoryId =
  | "parents"
  | "professor"
  | "girlfriend"
  | "internship-supervisor";

export type SemanticCategory = {
  id: SemanticCategoryId;
  label: string;
  image: string;
  imageAlt: string;
};

export type SemanticPhrase = {
  id: string;
  text: string;
  categoryId: SemanticCategoryId;
};

export const semanticCategories: SemanticCategory[] = [
  {
    id: "parents",
    label: "Photo 1",
    image:
      "/images/courses/intermediate-2/activities/activity2/exercise-1/parents.png",
    imageAlt: "Les parents de Félix lui font des reproches.",
  },
  {
    id: "professor",
    label: "Photo 2",
    image:
      "/images/courses/intermediate-2/activities/activity2/exercise-1/prof.png",
    imageAlt: "Le professeur de Félix lui adresse des remarques.",
  },
  {
    id: "girlfriend",
    label: "Photo 3",
    image:
      "/images/courses/intermediate-2/activities/activity2/exercise-1/petite-amie.png",
    imageAlt: "La petite amie de Félix lui pose des questions.",
  },
  {
    id: "internship-supervisor",
    label: "Photo 4",
    image:
      "/images/courses/intermediate-2/activities/activity2/exercise-1/responsable.png",
    imageAlt: "Le responsable de stage de Félix lui fait des demandes.",
  },
];

export const semanticPhrases: SemanticPhrase[] = [
  // PARENTS — VERT
  {
    id: "phrase-01",
    text: "...de rester dans ma chambre quand il y a des invités.",
    categoryId: "parents",
  },
  {
    id: "phrase-02",
    text: "...à quel moment je déciderai de partir enfin de chez eux.",
    categoryId: "parents",
  },
  {
    id: "phrase-03",
    text: "...d’arrêter de me comporter en adolescent attardé.",
    categoryId: "parents",
  },
  {
    id: "phrase-04",
    text: "...si je peux lâcher l’écran de mon ordinateur cinq minutes par jour.",
    categoryId: "parents",
  },
  {
    id: "phrase-05",
    text: "...d’arrêter d’utiliser leur carte de crédit pour m’acheter des trucs sur Internet.",
    categoryId: "parents",
  },

  // PROFESSEUR — GRIS
  {
    id: "phrase-06",
    text: "...d’arriver à l’heure à ses cours horribles.",
    categoryId: "professor",
  },
  {
    id: "phrase-07",
    text: "...d’arrêter de dormir pendant sa classe.",
    categoryId: "professor",
  },
  {
    id: "phrase-08",
    text: "...ce que ça me fait d’être le pire élève qu’il ait jamais rencontré.",
    categoryId: "professor",
  },
  {
    id: "phrase-09",
    text: "...si j’ai compris sa dernière leçon sur la mécanique des fluides.",
    categoryId: "professor",
  },
  {
    id: "phrase-10",
    text: "...si j’ai le moindre intérêt pour mon parcours universitaire.",
    categoryId: "professor",
  },

  // PETITE AMIE — JAUNE
  {
    id: "phrase-11",
    text: "...si je la trompe avec quelqu’un d’autre.",
    categoryId: "girlfriend",
  },
  {
    id: "phrase-12",
    text: "...ce qui est le plus important pour moi : elle ou ma PlayStation 5 ?",
    categoryId: "girlfriend",
  },
  {
    id: "phrase-13",
    text: "...avec qui je sors le samedi soir.",
    categoryId: "girlfriend",
  },
  {
    id: "phrase-14",
    text: "...si je suis vraiment heureux avec elle.",
    categoryId: "girlfriend",
  },

  // RESPONSABLE DE STAGE — ROSE
  {
    id: "phrase-15",
    text: "...de l’accompagner à toutes ses réunions.",
    categoryId: "internship-supervisor",
  },
  {
    id: "phrase-16",
    text: "...de ne pas squatter la machine à café pendant des heures.",
    categoryId: "internship-supervisor",
  },
  {
    id: "phrase-17",
    text: "...si j’ai utilisé ChatGPT pour taper mon rapport de stage.",
    categoryId: "internship-supervisor",
  },
  {
    id: "phrase-18",
    text: "...ce que j’ai l’intention de faire quand j’aurai fini mon stage.",
    categoryId: "internship-supervisor",
  },
  {
    id: "phrase-19",
    text: "...de ne pas surfer sur Internet pendant ma pause déjeuner.",
    categoryId: "internship-supervisor",
  },
];