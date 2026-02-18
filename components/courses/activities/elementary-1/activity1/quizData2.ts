"use client"

/* ========= Types ========= */
type Choice = {
  id: string;
  label: string;
  isCorrect: boolean;
  explanationCorrect: string;
  explanationWrong: string;
};

type Question = {
  id: number;
  question: string;
  choices: Choice[];
  image: string;
  correctAudio: string;
  wrongAudio: string;
  wrongAudio2: string;
};

/* ========= Questions ========= */
export const quizData2: Question[] = [
  {
    id: 1,
    question: "",
    image: "/images/courses/elementary/questions-reponses/adrien.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/adrien_correct_1.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/adrien_wrong_1.mp3",
    wrongAudio2:
      "/audios/courses/elementary/questions-reponses/adrien_wrong_1.2.mp3",
    choices: [
      { 
        id: "A", 
        label: "Ça fait longtemps que tu habites à Paris ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : Adrien parle de hockey, pas d’habiter à Paris.",
        explanationWrong: "Non, Adrien ne parle pas de son lieu d’habitation."
      },
      { 
        id: "B", 
        label: "Ça fait longtemps que tu joues au hockey ?", 
        isCorrect: true,
        explanationCorrect: "Exact ! Adrien parle justement du hockey sur glace.",
        explanationWrong: "Ce choix était correct : Adrien parle bien du hockey."
      },
      { 
        id: "C", 
        label: "Ça fait longtemps que tu chantes ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : il ne parle absolument pas de chant.",
        explanationWrong: "Non, Adrien ne parle pas de chant."
      },
    ],
  },

  {
    id: 2,
    question: "",
    image: "/images/courses/elementary/questions-reponses/mariama.jpg",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/mariama_correct_1.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/mariama_wrong_1.mp3",
    wrongAudio2:
      "/audios/courses/elementary/questions-reponses/mariama_wrong_1.2.mp3",
    choices: [
      { 
        id: "A", 
        label: "Est-ce que tu fais seulement des tresses africaines ?", 
        isCorrect: true,
        explanationCorrect: "Exact ! Mariama est spécialisée dans les tresses africaines.",
        explanationWrong: "Ce choix était correct : Mariama parle bien de tresses."
      },
      { 
        id: "B", 
        label: "Est-ce ce que tu chantes seulement des chansons d’Elvis ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : elle ne parle jamais de chant.",
        explanationWrong: "Non, Mariama n’est pas chanteuse."
      },
      { 
        id: "C", 
        label: "Est-ce que tu fais seulement du hockey sur glace?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : aucun rapport avec son métier.",
        explanationWrong: "Non, elle ne joue pas au hockey."
      },
    ],
  },

  {
    id: 3,
    question: "",
    image: "/images/courses/elementary/questions-reponses/norbert.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/norbert_correct_1.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/norbert_wrong_1.mp3",
    wrongAudio2:
      "/audios/courses/elementary/questions-reponses/norbert_wrong_1.2.mp3",
    choices: [
      { 
        id: "A", 
        label: "C’est où, ton quartier favori à Paris ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : Norbert parle musique, pas géographie.",
        explanationWrong: "Non, Norbert ne parle pas de Paris."
      },
      { 
        id: "B", 
        label: "C’est quoi, ta guitare ?", 
        isCorrect: true,
        explanationCorrect: "Exact ! Norbert parle précisément de sa guitare.",
        explanationWrong: "Ce choix était correct : Norbert parle bien de sa guitare."
      },
      { 
        id: "C", 
        label: "C’est qui, ton joueur de hockey sur glace préféré ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : Norbert ne parle pas de hockey.",
        explanationWrong: "Non, il ne parle pas du tout de hockey."
      },
    ],
  },

  {
    id: 4,
    question: "",
    image: "/images/courses/elementary/questions-reponses/mariama.jpg",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/mariama_correct_2.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/mariama_wrong_2.mp3",
    wrongAudio2: "/audios/courses/elementary/questions-reponses/mariama_wrong_2.2.mp3",
    choices: [
      { 
        id: "A", 
        label: "Combien il coûte, ton déguisement d’eskimo ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ça n’a aucun rapport avec la coiffure.",
        explanationWrong: "Non, elle ne parle pas de déguisement."
      },
      { 
        id: "B", 
        label: "Combien elle coûte, ta guitare ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : Mariama ne joue pas de guitare.",
        explanationWrong: "Non, elle ne parle pas de guitare."
      },
      { 
        id: "C", 
        label: "Combien ça coûte, une coupe afro dans ton salon ?", 
        isCorrect: true,
        explanationCorrect: "Exact ! C’est la seule question en lien avec son salon.",
        explanationWrong: "Ce choix était correct : Mariama parle bien de coiffure."
      },
    ],
  },

  {
    id: 5,
    question: "",
    image: "/images/courses/elementary/questions-reponses/norbert.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/norbert_correct_2.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/norbert_wrong_2.mp3",
    wrongAudio2:
      "/audios/courses/elementary/questions-reponses/norbert_wrong_2.2.mp3",
    choices: [
      { 
        id: "A", 
        label: "Où est-ce que tu as trouvé ton blouson en cuir ?", 
        isCorrect: true,
        explanationCorrect: "Exact ! Norbert parle de son style et de ses vêtements.",
        explanationWrong: "Ce choix était correct : il parle bien de son blouson."
      },
      { 
        id: "B", 
        label: ": Où est-ce tu que as acheté ton bonnet ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : Norbert ne mentionne aucun bonnet.",
        explanationWrong: "Non, il ne parle pas de bonnet."
      },
      { 
        id: "C", 
        label: "Où est-ce que tu as trouvé tes boucles d’oreille ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : il ne porte pas de boucles d’oreille.",
        explanationWrong: "Non, il ne parle pas de boucles d’oreille."
      },
    ],
  },

  {
    id: 6,
    question: "",
    image: "/images/courses/elementary/questions-reponses/adrien.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/adrien_correct_2.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/adrien_wrong_2.mp3",
    wrongAudio2:
      "/audios/courses/elementary/questions-reponses/adrien_wrong_2.2.mp3",
    choices: [
      { 
        id: "A", 
        label: "Il y a beaucoup de gens qui viennent à tes concerts ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : Adrien ne fait pas de concerts.",
        explanationWrong: "Non, Adrien ne fait pas de concerts."
      },
      { 
        id: "B", 
        label: "Il y a beaucoup de gens qui viennent voir tes matchs ?", 
        isCorrect: true,
        explanationCorrect: "Exact ! Adrien joue au hockey, donc aux matchs.",
        explanationWrong: "Ce choix était correct : Adrien parle bien de ses matchs."
      },
      { 
        id: "C", 
        label: "Il y a beaucoup de gens qui viennent dans ton salon de coiffure ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : Adrien n’est pas coiffeur.",
        explanationWrong: "Non, Adrien n’a pas de salon de coiffure."
      },
    ],
  },

  {
    id: 7,
    question: "",
    image: "/images/courses/elementary/questions-reponses/mariama.jpg",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/mariama_correct_3.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/mariama_wrong_3.mp3",
    wrongAudio2:
      "/audios/courses/elementary/questions-reponses/mariama_wrong_3.2.mp3",
    choices: [
      { 
        id: "A", 
        label: "C’est quoi, les couleurs de ton équipe ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : Mariama ne parle pas de sport.",
        explanationWrong: "Non, elle ne parle pas d’équipe sportive."
      },
      { 
        id: "B", 
        label: "Et toi, qui t’a fait tes tresses ?", 
        isCorrect:true,
        explanationCorrect: "Exact ! Cela concerne son métier de coiffeuse.",
        explanationWrong: "Ce choix était correct : elle parle bien de tresses."
      },
      { 
        id: "C", 
        label: "Qui t’a appris à jouer de la guitare ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : elle ne parle jamais de guitare.",
        explanationWrong: "Non, Mariama ne parle pas de musique."
      },
    ],
  },

  {
    id: 8,
    question: "",
    image: "/images/courses/elementary/questions-reponses/adrien.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/adrien_correct_3.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/adrien_wrong_3.2.mp3",
    wrongAudio2:
      "/audios/courses/elementary/questions-reponses/adrien_wrong_3.mp3",
    choices: [
      { 
        id: "A", 
        label: "C’est comment, la vie à Paris ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : Adrien ne vit pas à Paris.",
        explanationWrong: "Non, Adrien ne parle pas de Paris."
      },
      { 
        id: "B", 
        label: "C’est comment, la vie à Bruxelles ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : il ne vit pas à Bruxelles.",
        explanationWrong: "Non, il ne parle pas de Bruxelles."
      },
      { 
        id: "C", 
        label: "C’est comment, la vie à Montréal ?", 
        isCorrect: true,
        explanationCorrect: "Exact ! Adrien vit à Montréal.",
        explanationWrong: "Ce choix était correct : Adrien parle de Montréal."
      },
    ],
  },

  {
    id: 9,
    question: "",
    image: "/images/courses/elementary/questions-reponses/norbert.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/norbert_correct_3.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/norbert_wrong_4.mp3",
    wrongAudio2:
      "/audios/courses/elementary/questions-reponses/norbert_wrong_3.2mp3",
    choices: [
      { 
        id: "A", 
        label: "Et tu gagnes beaucoup d’argent, avec tes ciseaux et ton peigne ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : Norbert n’est pas coiffeur.",
        explanationWrong: "Non, Norbert ne fait pas de coiffure."
      },
      { 
        id: "B", 
        label: "Et tu es populaire auprès des filles, avec ta crosse et tes patins à glace ?", 
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ici il ne parle pas de hockey.",
        explanationWrong: "Non, la question est hors sujet."
      },
      { 
        id: "C", 
        label: ": Et tu gagnes beaucoup d’argent avec les reprises d’Elvis ?", 
        isCorrect: true,
        explanationCorrect: "Exact ! Norbert parle de musique et d’Elvis.",
        explanationWrong: "Ce choix était correct : Norbert parle bien de ses reprises."
      },
    ],
  },
];
