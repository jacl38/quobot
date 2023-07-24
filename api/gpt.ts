import "dotenv/config";
import fetch from "node-fetch";

const { OPENAI_API_KEY } = process.env;

const perDay = 2000;
let usedToday = 0;

export default async function getAlternateQuote(quote: string): Promise<string> {
  if(usedToday >= perDay) throw new Error("OpenAI API limit reached for today");

  if(!OPENAI_API_KEY) throw new Error("No OpenAI API key found in .env file");
  const prompt = [
    "Here is a famous quote.",
    "Rewrite this quote in an alternate way.",
    "Do not make the quote simpler or more complex, and do not paraphrase.",
    "Keep the meaning and the tone of the quote the same.",
    "ONLY output the new quote, nothing else.",
    `"${quote}"`
  ].join("\n");

  // make post request

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: [
      ["Content-Type", "application/json"],
      ["Authorization", `Bearer ${OPENAI_API_KEY}`]
    ],
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ]
    })
  });

  if(response.status !== 200) {
    const body = await response.json();
    throw new Error(body.error.message);
  }

  usedToday++;

  const body = await response.json();
  const newQuote = body.choices[0].message.content;

  const match = newQuote.match(/"(.*)"/);
  return match ? match[1] : newQuote;
}
