export const forbiddenWords: Record<
  string,
  string[]
> = {
  ai: ["ont", "avez", "avons", "a", "as"],

  ont: ["ai", "a", "as", "avez"],

  est: ["es", "sont", "sommes"],

  suis: ["sommes", "sont"],

  vais: ["va", "vont", "allons"],

  va: ["vais", "vont"],

  vont: ["vais", "va"],

  fais: ["fait", "font"],

  fait: ["fais", "font"],

  font: ["fais", "fait"],
};