
export type Speaker = "Alice" | "Martin";

export type FillGapItem = {
  id: string;
  speaker: Speaker;
  before: string;
  after: string;
  answer: string;
  infinitive: string;
};

export type DialogueLine = {
  speaker: Speaker;
  text: string;
};

export const dialogueIntroduction =
  "Alice et Martin se disputent une nouvelle fois à cause des enfants.";

export const dialogueInstruction =
  "Écoute et complète le dialogue avec les verbes au subjonctif que tu entends.";

export const accentList = "é / è / ê / à / ô / ù / û / ï";

export const dialogueLines: DialogueLine[] = [
  {
    speaker: "Alice",
    text: "Maintenant, j’en ai ras-le-bol. Il faut que tu fasses quelque chose, Martin.",
  },
  {
    speaker: "Martin",
    text: "Qu’est-ce qui se passe, encore ?",
  },
  {
    speaker: "Alice",
    text: "Ce qui se passe, c’est qu’il faut que tu m’aides un peu plus avec les mômes. C’est moi qui fais tout dans cette maison. Ce n’est pas normal. Il faut qu’ils aient deux parents.",
  },
  {
    speaker: "Martin",
    text: "Comme si je ne t’aidais jamais... Je joue avec eux tous les jours, je les emmène au parc, je nettoie la cage du lapin. Qu’est-ce qu’il faudrait que je fasse de plus ?",
  },
  {
    speaker: "Alice",
    text: "Que tu sois un peu moins leur copain et un peu plus leur père. Que tu les grondes quand ils font des bêtises, que tu saches leur dire non quand ils exagèrent...",
  },
  {
    speaker: "Martin",
    text: "C’est toi qui exagères. Il faut que je te rappelle combien de fois par jour je demande à Rémy de ranger sa chambre ?",
  },
  {
    speaker: "Alice",
    text: "Il faut croire qu’il ne t’écoute pas. Sa chambre est toujours en bordel. Il faut vraiment que tu sois aveugle pour ne pas t’en rendre compte.",
  },
  {
    speaker: "Martin",
    text: "Me rendre compte de quoi ?",
  },
  {
    speaker: "Alice",
    text: "Que tu n’as aucune autorité sur eux. Et puis cet abruti de lapin, il faut vraiment qu’on s’en débarrasse. Je n’en peux plus de ramasser ses crottes. Il faut que tu comprennes, Martin. Je n’en peux vraiment plus.",
  },
  {
    speaker: "Martin",
    text: "Il faut qu’on prenne des vacances, tous les cinq. Je crois qu’on est fatigués, c’est tout.",
  },
  {
    speaker: "Alice",
    text: "Comment ça, tous les cinq ?",
  },
  {
    speaker: "Martin",
    text: "Eh bien oui. Toi, moi, Rémy, Sandra et Pompon.",
  },
  {
    speaker: "Alice",
    text: "Le lapin ? En vacances ? Et puis quoi encore ?",
  },
  {
    speaker: "Martin",
    text: "On ne va quand même pas l’abandonner. Il faut qu’on le prenne avec nous ou qu’on trouve une autre solution.",
  },
  {
    speaker: "Alice",
    text: "Elle est simple, la solution. On l’emmène au zoo et on le lâche dans l’enclos des tigres.",
  },
  {
    speaker: "Martin",
    text: "Tu es sans cœur. Bon, au fait, il est 16 heures...",
  },
  {
    speaker: "Alice",
    text: "Oui, et alors ?",
  },
  {
    speaker: "Martin",
    text: "C’est l’heure que Sandra aille à son rendez-vous de dentiste. C’est toi qui l’accompagnes, non ?",
  },
];

export const subjunctiveFillGapsData: FillGapItem[] = [
  {
    id: "gap-1",
    speaker: "Alice",
    before: "Maintenant, j’en ai ras-le-bol. Il faut que tu ",
    after: " quelque chose, Martin.",
    answer: "fasses",
    infinitive: "faire",
  },
  {
    id: "gap-2",
    speaker: "Alice",
    before:
      "Ce qui se passe, c’est qu’il faut que tu m’",
    after:
      " un peu plus avec les mômes. C’est moi qui fais tout dans cette maison. Ce n’est pas normal. Il faut qu’ils aient deux parents.",
    answer: "aides",
    infinitive: "aider",
  },
  {
    id: "gap-3",
    speaker: "Martin",
    before:
      "Comme si je ne t’aidais jamais... Je joue avec eux tous les jours, je les emmène au parc, je nettoie la cage du lapin. Qu’est-ce qu’il faudrait que je ",
    after: " de plus ?",
    answer: "fasse",
    infinitive: "faire",
  },
  {
    id: "gap-4",
    speaker: "Alice",
    before: "Que tu ",
    after:
      " un peu moins leur copain et un peu plus leur père. Que tu les grondes quand ils font des bêtises, que tu saches leur dire non quand ils exagèrent...",
    answer: "sois",
    infinitive: "être",
  },
  {
    id: "gap-5",
    speaker: "Martin",
    before:
      "C’est toi qui exagères. Il faut que je te ",
    after:
      " combien de fois par jour je demande à Rémy de ranger sa chambre ?",
    answer: "rappelle",
    infinitive: "rappeler",
  },
  {
    id: "gap-6",
    speaker: "Alice",
    before:
      "Il faut croire qu’il ne t’écoute pas. Sa chambre est toujours en bordel. Il faut vraiment que tu ",
    after: " aveugle pour ne pas t’en rendre compte.",
    answer: "sois",
    infinitive: "être",
  },
  {
    id: "gap-7",
    speaker: "Martin",
    before: "Me rendre compte de quoi ?",
    after: "",
    answer: "",
    infinitive: "",
  },
  {
    id: "gap-8",
    speaker: "Alice",
    before:
      "Que tu n’as aucune autorité sur eux. Et puis cet abruti de lapin, il faut vraiment qu’on s’en ",
    after:
      ". Je n’en peux plus de ramasser ses crottes. Il faut que tu comprennes, Martin. Je n’en peux vraiment plus.",
    answer: "débarrasse",
    infinitive: "débarrasser",
  },
  {
    id: "gap-9",
    speaker: "Martin",
    before: "Il faut qu’on ",
    after:
      " des vacances, tous les cinq. Je crois qu’on est fatigués, c’est tout.",
    answer: "prenne",
    infinitive: "prendre",
  },
  {
    id: "gap-10",
    speaker: "Alice",
    before: "Comment ça, tous les cinq ?",
    after: "",
    answer: "",
    infinitive: "",
  },
  {
    id: "gap-11",
    speaker: "Martin",
    before: "Eh bien oui. Toi, moi, Rémy, Sandra et Pompon.",
    after: "",
    answer: "",
    infinitive: "",
  },
  {
    id: "gap-12",
    speaker: "Alice",
    before: "Le lapin ? En vacances ? Et puis quoi encore ?",
    after: "",
    answer: "",
    infinitive: "",
  },
  {
    id: "gap-13",
    speaker: "Martin",
    before:
      "On ne va quand même pas l’abandonner. Il faut qu’on le ",
    after: " avec nous ou qu’on trouve une autre solution.",
    answer: "prenne",
    infinitive: "prendre",
  },
  {
    id: "gap-14",
    speaker: "Martin",
    before: "C’est l’heure que Sandra ",
    after:
      " à son rendez-vous de dentiste. C’est toi qui l’accompagnes, non ?",
    answer: "aille",
    infinitive: "aller",
  },
];
