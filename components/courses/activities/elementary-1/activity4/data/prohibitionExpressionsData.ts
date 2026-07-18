"use client";

type Item = {
  id: number;
  image: string;
  before: string;
  after: string;
  answer: string;
};

type ImageFillGapsData = {
  title: string;
  instruction: string;
  activityType: "type";
  items: Item[];
};

export const prohibitionExpressionsData: ImageFillGapsData = {
  title: "🏊 Règlement de la piscine",

  instruction:
    "Observe chaque image et complète la phrase avec le bon mot.\n\nMots à utiliser : admis, défense, obligatoire, interdiction, interdit, interdite, interdits, interdites.",

  activityType: "type",

  items: [
    {
      id: 1,
      image: "/images/courses/elementary/activities/activity4/run.png",
      before: "Il est ",
      after: " de courir autour des bassins.",
      answer: "interdit",
    },
    {
      id: 2,
      image: "/images/courses/elementary/activities/activity4/food.png",
      before: "Il est ",
      after: " de manger dans la piscine.",
      answer: "interdit",
    },
    {
      id: 3,
      image: "/images/courses/elementary/activities/activity4/swimsuit.png",
      before: "Les caleçons de bain sont ",
      after: ", seuls les maillots sont autorisés.",
      answer: "interdits",
    },
    {
      id: 4,
      image: "/images/courses/elementary/activities/activity4/animals.png",
      before: "Les animaux ne sont pas ",
      after: ".",
      answer: "admis",
    },
    {
      id: 5,
      image:
        "/images/courses/elementary/activities/activity4/childlessseven.png",
      before: "",
      after: " aux enfants de plus de sept ans.",
      answer: "interdiction",
    },
    {
      id: 6,
      image: "/images/courses/elementary/activities/activity4/shoes.png",
      before: "",
      after: " de marcher avec des chaussures.",
      answer: "interdiction",
    },
    {
      id: 7,
      image:
        "/images/courses/elementary/activities/activity4/accompanied.png",
      before: "Les enfants sont ",
      after: " avec un adulte.",
      answer: "admis",
    },
    {
      id: 8,
      image:
        "/images/courses/elementary/activities/activity4/bathingcap.png",
      before: "Il est ",
      after: " de porter un bonnet.",
      answer: "obligatoire",
    },
    {
      id: 9,
      image:
        "/images/courses/elementary/activities/activity4/childmorefour.png",
      before: "Les toboggans sont ",
      after: " aux enfants de moins de quatre ans.",
      answer: "interdits",
    },
  ],
};