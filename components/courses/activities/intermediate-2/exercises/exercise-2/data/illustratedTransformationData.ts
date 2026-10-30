
export type IllustratedTransformationQuestion = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  originalText: string;
  before: string;
  expectedAnswer: string;
  after: string;
  explanation: string;
};

export const illustratedTransformationData: IllustratedTransformationQuestion[] = [
  {
    id: "transformation-1",
    imageSrc:
      "/images/courses/intermediate-2/activities/activity1/img1.jpg",
    imageAlt: "Une femme s'apprête à quitter un café où elle retrouve ses amis.",
    originalText: "Désolée, les gars, je dois partir...",
    before: "Désolée, les gars, il faut que je ",
    expectedAnswer: "parte",
    after: "...",
    explanation:
      "Le verbe « partir » se conjugue « que je parte » au subjonctif présent.",
  },
  {
    id: "transformation-2",
    imageSrc:
    "/images/courses/intermediate-2/activities/activity1/img2.jpg",
    imageAlt: "Un professeur présente un livre à ses élèves.",
    originalText: "Vous devez absolument lire ce livre.",
    before: "Il faut absolument que ",
    expectedAnswer: "vous lisiez",
    after: " ce livre.",
    explanation:
      "Le verbe « lire » se conjugue « que vous lisiez » au subjonctif présent.",
  },
  {
    id: "transformation-3",
    imageSrc:
    "/images/courses/intermediate-2/activities/activity1/img3.jpg",
    imageAlt: "Des étudiants passent un examen dans une salle de classe.",
    originalText:
      "S’ils veulent pouvoir entrer en Master 2, ils doivent réussir leur examen.",
    before:
      "S’ils veulent pouvoir entrer en Master 2, il faut qu’",
    expectedAnswer: "ils réussissent",
    after: " leur examen.",
    explanation:
      "Le verbe « réussir » se conjugue « qu'ils réussissent » au subjonctif présent.",
  },
  {
    id: "transformation-4",
    imageSrc:
    "/images/courses/intermediate-2/activities/activity1/img4.jpg",
    imageAlt: "Un homme est assis dans un bar.",
    originalText: "Il doit boire moins d’alcool.",
    before: "Il faut qu’",
    expectedAnswer: "il boive",
    after: " moins d’alcool.",
    explanation:
      "Le verbe « boire » se conjugue « qu'il boive » au subjonctif présent.",
  },
  {
    id: "transformation-5",
    imageSrc:
    "/images/courses/intermediate-2/activities/activity1/img5.jpg",
    imageAlt: "Une conductrice roule dans une circulation dense.",
    originalText:
      "Elle doit conduire plus lentement. Sinon, elle finira par causer un accident.",
    before: "Il faut qu’",
    expectedAnswer: "elle conduise",
    after:
      " plus lentement. Sinon, elle finira par causer un accident.",
    explanation:
      "Le verbe « conduire » se conjugue « qu'elle conduise » au subjonctif présent.",
  },
  {
    id: "transformation-6",
    imageSrc:
    "/images/courses/intermediate-2/activities/activity1/img6.jpg",
    imageAlt: "Une femme regarde un réfrigérateur presque vide.",
    originalText:
      "Je dois vraiment aller faire les courses. On n’a plus rien dans le frigo.",
    before: "Il faut vraiment que ",
    expectedAnswer: "j’aille",
    after:
      " faire les courses. On n’a plus rien dans le frigo.",
    explanation:
      "Le verbe « aller » se conjugue « que j'aille » au subjonctif présent.",
  },
  {
    id: "transformation-7",
    imageSrc:
    "/images/courses/intermediate-2/activities/activity1/img7.jpg",
    imageAlt: "Deux personnes courent pour arriver à l'heure.",
    originalText:
      "On doit être à l’heure, sinon ils vont partir sans nous.",
    before: "Il faut qu’",
    expectedAnswer: "on soit",
    after: " à l’heure, sinon ils vont partir sans nous.",
    explanation:
      "Le verbe « être » se conjugue « qu'on soit » au subjonctif présent.",
  },
  {
    id: "transformation-8",
    imageSrc:
    "/images/courses/intermediate-2/activities/activity1/img8.jpg",
    imageAlt:
      "Deux femmes discutent dans une salle d'attente, avec un petit hamster à proximité.",
    originalText:
      "Tu ne dois pas t’inquiéter. Je suis sûre que tu le retrouveras, ton hamster.",
    before: "Il ne faut pas que ",
    expectedAnswer: "tu t’inquiètes",
    after:
      ". Je suis sûre que tu le retrouveras, ton hamster.",
    explanation:
      "Le verbe pronominal « s'inquiéter » se conjugue « que tu t'inquiètes » au subjonctif présent.",
  },
];
