
import type { MemoryPair } from "./MemoryExercise";

/**
 * FAW — Exercice 3 : Le Memory d'Annie
 *
 * Chaque paire contient :
 * - une illustration ;
 * - la phrase qui lui correspond ;
 * - le fichier audio associé à la phrase.
 */

const AUDIO_BASE =
  "/audios/courses/elementary/activities/activity2/memory";

export const memoryPairs: MemoryPair[] = [
  {
    id: "fromage",
    imageSrc:
      "/images/courses/elementary/activities/activity2/memory/C1.jpg",
    imageAlt: "Des personnes mangent du fromage",
    text: "ILS MANGENT DU FROMAGE QUI SENT MAUVAIS...",
    audioSrc: `${AUDIO_BASE}/fromage.mp3`,
  },
  {
    id: "bagarre",
    imageSrc:
      "/images/courses/elementary/activities/activity2/memory/C2.jpg",
    imageAlt: "Des personnes qui se battent",
    text: "ILS SE BATTENT TOUS LES SAMEDIS SOIRS...",
    audioSrc: `${AUDIO_BASE}/battent.mp3`,
  },
  {
    id: "moutons",
    imageSrc:
      "/images/courses/elementary/activities/activity2/memory/C3.jpg",
    imageAlt: "Des moutons dans un village",
    text: "LEURS MOUTONS CROTTENT PARTOUT...",
    audioSrc: `${AUDIO_BASE}/crottent.mp3`,
  },
  {
    id: "voiture",
    imageSrc:
      "/images/courses/elementary/activities/activity2/memory/C4.jpg",
    imageAlt: "Des gens conduisent dangereusement",
    text: "LES GENS CONDUISENT COMME DES FOUS...",
    audioSrc: `${AUDIO_BASE}/conduisent.mp3`,
  },
  {
    id: "chasseurs",
    imageSrc:
      "/images/courses/elementary/activities/activity2/memory/C5.jpg",
    imageAlt: "Des chasseurs à la campagne",
    text: "LES CHASSEURS TIRENT SUR TOUT CE QUI BOUGE...",
    audioSrc: `${AUDIO_BASE}/tirent.mp3`,
  },
  {
    id: "babyfoot",
    imageSrc:
      "/images/courses/elementary/activities/activity2/memory/C6.png",
    imageAlt: "Des jeunes jouent au babyfoot",
    text: "LES JEUNES JOUENT ENCORE AU BABYFOOT...",
    audioSrc: `${AUDIO_BASE}/babyfoot.mp3`,
  },
  {
    id: "accent",
    imageSrc:
      "/images/courses/elementary/activities/activity2/memory/C7.jpg",
    imageAlt: "Des habitants discutent dans un village",
    text: "ILS PARLENT AVEC UN ACCENT BIZARRE...",
    audioSrc: `${AUDIO_BASE}/accent.mp3`,
  },
  {
    id: "filles",
    imageSrc:
      "/images/courses/elementary/activities/activity2/memory/C8.jpg",
    imageAlt: "Des jeunes femmes maquillées et habillées",
    text: "LES FILLES SE MAQUILLENT ET S’HABILLENT ATROCEMENT",
    audioSrc: `${AUDIO_BASE}/se maquillent.mp3`,
  },
];
