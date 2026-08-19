// components/memory/memoryData.ts

export type MemoryCard = {
  id: string; // unique id pour la carte
  type: "word" | "image"; // carte mot ou image
  value: string; // mot en MAJUSCULES ou chemin image
  pairId: string; // identifiant du couple
};

export const memoryData: MemoryCard[] = [
  // 1 — IMMEUBLE
  { id: "building-word", type: "word", value: "IMMEUBLE", pairId: "building" },
  {
    id: "building-img",
    type: "image",
    value: "/images/courses/elementary2/activity2/building.png",
    pairId: "building",
  },

  // 2 — SALLE DE BAIN
  {
    id: "bathroom-word",
    type: "word",
    value: "SALLE DE BAIN",
    pairId: "bathroom",
  },
  {
    id: "bathroom-img",
    type: "image",
    value: "/images/courses/elementary2/activity2/bathroom.png",
    pairId: "bathroom",
  },

  // 3 — BALCON
  { id: "balcony-word", type: "word", value: "BALCON", pairId: "balcony" },
  {
    id: "balcony-img",
    type: "image",
    value: "/images/courses/elementary2/activity2/balcony.png",
    pairId: "balcony",
  },

  // 4 — PORTE
  { id: "door-word", type: "word", value: "PORTE", pairId: "door" },
  {
    id: "door-img",
    type: "image",
    value: "/images/courses/elementary2/activity2/door.png",
    pairId: "door",
  },

  // 5 — JARDIN
  { id: "garden-word", type: "word", value: "JARDIN", pairId: "garden" },
  {
    id: "garden-img",
    type: "image",
    value: "/images/courses/elementary2/activity2/garden.png",
    pairId: "garden",
  },

  // 6 — CUISINE
  { id: "kitchen-word", type: "word", value: "CUISINE", pairId: "kitchen" },
  {
    id: "kitchen-img",
    type: "image",
    value: "/images/courses/elementary2/activity2/kitchen.png",
    pairId: "kitchen",
  },

  // 7 — ASCENSEUR
  { id: "lift-word", type: "word", value: "ASCENSEUR", pairId: "lift" },
  {
    id: "lift-img",
    type: "image",
    value: "/images/courses/elementary2/activity2/lift.png",
    pairId: "lift",
  },

  // 8 — CENTRE COMMERCIAL
  { id: "mall-word", type: "word", value: "CENTRE COMMERCIAL", pairId: "mall" },
  {
    id: "mall-img",
    type: "image",
    value: "/images/courses/elementary2/activity2/mall.png",
    pairId: "mall",
  },

  // 9 — CHAMBRE
  { id: "room-word", type: "word", value: "CHAMBRE", pairId: "room" },
  {
    id: "room-img",
    type: "image",
    value: "/images/courses/elementary2/activity2/room.png",
    pairId: "room",
  },

  // 10 — FENÊTRES
  { id: "windows-word", type: "word", value: "FENÊTRES", pairId: "windows" },
  {
    id: "windows-img",
    type: "image",
    value: "/images/courses/elementary2/activity2/windows.png",
    pairId: "windows",
  },
];
