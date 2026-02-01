import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function test() {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await client.chat.completions.create({
      model: "gpt-5.1-mini",
      messages: [
        { role: "user", content: "Say hello" }
      ],
    });

    console.log("Réponse OpenAI :", response.choices[0].message?.content);
  } catch (error: any) {
    console.error("Erreur OpenAI :", error);
  }
}

test();
