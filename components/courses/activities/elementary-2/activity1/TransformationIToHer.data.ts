export type TransformationTextData = {
  id: string;
  title: string;
  instruction: string;
  sourceText: string;
  expectedText: string;
};

export const TransformationIToHerData: TransformationTextData = {
  id: "i-to-her-01",

  title: "Transformer 'je' en 'elle'",

  instruction:
    "Transformez le texte en remplaçant 'je' par 'elle' et en adaptant correctement les verbes et les accords.",

  sourceText: `Le matin, le réveil sonne à 8 heures et demie, mais je me lève seulement à 9 heures. À peine 5 minutes plus tard, je suis déjà dans ma salle de bain. Je me douche et je me brosse les dents. 10 minutes après, je suis dans la cuisine. Là, je bois du thé avec du miel et je mange une tartine de pain avec de la confiture, et des céréales. Après le petit déjeuner, je retourne dans ma chambre pour m’habiller et préparer mes affaires. À dix heures moins le quart, quand je quitte la maison, mon gros chat Gaston dort encore dans son panier. Quel paresseux !
Je vais au travail en métro. Je mets à peu près 25 minutes s’il n’y a pas de problème sur la ligne. Je commence à travailler à 10 heures et quart. Je suis professeur de danse orientale dans une petite école, à Paris, depuis maintenant 8 ans. J’ai une pause entre midi et 2 heures. Souvent, je déjeune avec mon collègue Jamal ou certains de mes élèves dans une petite brasserie du coin. Après, je vais parfois m’asseoir dans un parc pour lire un bon livre et m’aérer l’esprit. Ensuite, je retourne travailler. Je donne des cours jusqu’à 4 heures de l’après-midi. Je finis chaque séance par une session « méditation », parfois assez intense…
Après le travail, j’aime bien me promener un peu dans les rues et flâner devant les vitrines. Juste avant de rentrer, je m’arrête à l’épicerie ou chez Monoprix pour faire quelques courses. Une fois arrivée chez moi, je donne à manger à Gaston. C’est un vrai glouton ! Vers 19 heures, je me prépare à dîner dans la cuisine. Après le dîner, il m’arrive de sortir avec des amis. La semaine dernière, je suis allée voir un spectacle de patinage artistique avec mon cousin Zig. Avant d’aller au lit, j’appelle ma mère ou mon frère pour prendre de leurs nouvelles et bavarder un peu. Je me mets au lit vers 11 heures. Je lis une petite demi-heure et puis j’éteins la lumière.`,

  expectedText: `Le matin, le réveil sonne à 8 heures et demie, mais elle se lève seulement à 9 heures. À peine 5 minutes plus tard, elle est déjà dans sa salle de bain. Elle se douche et se brosse les dents. 10 minutes après, elle est dans la cuisine. Là, elle boit du thé avec du miel et mange une tartine de pain avec de la confiture, et des céréales. Après le petit déjeuner, elle retourne dans sa chambre pour s’habiller et préparer ses affaires. À dix heures moins le quart, quand elle quitte la maison, son gros chat Gaston dort encore dans son panier. Quel paresseux !
Elle va au travail en métro. Elle met à peu près 25 minutes s’il n’y a pas de problème sur la ligne. Elle commence à travailler à 10 heures et quart. Elle est professeur de danse orientale dans une petite école, à Paris, depuis maintenant 8 ans. Elle a une pause entre midi et 2 heures. Souvent, elle déjeune avec son collègue Jamal ou certains de ses élèves dans une petite brasserie du coin. Après, elle va parfois s’asseoir dans un parc pour lire un bon livre et s’aérer l’esprit. Ensuite, elle retourne travailler. Elle donne des cours jusqu’à 4 heures de l’après-midi. Elle finit chaque séance par une session « méditation », parfois assez intense…
Après le travail, elle aime bien se promener un peu dans les rues et flâner devant les vitrines. Juste avant de rentrer, elle s’arrête à l’épicerie ou chez Monoprix pour faire quelques courses. Une fois arrivée chez elle, elle donne à manger à Gaston. C’est un vrai glouton ! Vers 19 heures, elle se prépare à dîner dans la cuisine. Après le dîner, il lui arrive de sortir avec des amis. La semaine dernière, elle est allée voir un spectacle de patinage artistique avec son cousin Zig. Avant d’aller au lit, elle appelle sa mère ou son frère pour prendre de leurs nouvelles et bavarder un peu. Elle se met au lit vers 11 heures. Elle lit une petite demi-heure et puis elle éteint la lumière.`,
};