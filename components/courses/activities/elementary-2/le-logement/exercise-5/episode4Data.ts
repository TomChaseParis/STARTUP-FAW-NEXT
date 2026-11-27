
export type ListenAndPronouncePhrase = {
  id: string;
  text: string;
  pronunciationTip: string;
};

export const episode4Passage = `
Hier, les déménageurs ont remonté les meubles. Pierre a passé sa première nuit dans la chambre bleue. Dans un coin de l'appartement, il reste encore plusieurs cartons contenant des habits et des affaires à ranger.

Papa dit à Pierre :
Avant de finir les rangements, nous allons explorer le quartier et nous ferons les courses au centre commercial.

Pierre et son père découvrent le supermarché, la boulangerie, le marchand de journaux, la boucherie, la boucherie-charcuterie, une banque, une quincaillerie et un fleuriste.

Ils reviennent à la maison et traversent le jardin public. Pierre aperçoit un toboggan.

Son père lui demande :
Tu veux l'essayer ?

Pierre monte à l'échelle et glisse, glisse jusqu'au sable. En se relevant, il sourit, tout content :
Je crois que je l'aime déjà, notre nouveau quartier.
`.trim();

export const episode4Data: ListenAndPronouncePhrase[] = [
  {
    id: "phrase-1",
    text: "Les déménageurs ont remonté les meubles.",
    pronunciationTip:
      "Attention : aucune liaison entre « déménageurs » et « ont ».",
  },
  {
    id: "phrase-2",
    text: "Dans un coin de l'appartement.",
    pronunciationTip:
      "Attention : liaison entre « dans » et « un ».",
  },
  {
    id: "phrase-3",
    text: "Nous allons explorer le quartier.",
    pronunciationTip:
      "Attention : liaison entre « nous » et « allons ».",
  },
  {
    id: "phrase-4",
    text: "Pierre et son père découvrent le supermarché.",
    pronunciationTip:
      "Attention : le « ent » de « découvrent », marque du pluriel, ne se prononce pas.",
  },
  {
    id: "phrase-5",
    text: "Ils reviennent à la maison et traversent le jardin public.",
    pronunciationTip:
      "Attention : le « ent » de « reviennent » et de « traversent », marque du pluriel, ne se prononce pas.",
  },
  {
    id: "phrase-6",
    text: "Pierre monte à l'échelle.",
    pronunciationTip:
      "Attention : le « e » de « monte » est muet et ne se prononce pas.",
  },
  {
    id: "phrase-7",
    text: "En se relevant, il sourit.",
    pronunciationTip:
      "Attention : le « ant » de « en se relevant » est la marque du gérondif et se prononce.",
  },
];
