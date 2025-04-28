import axios from "axios";

const API_URL = "https://api.openai.com/v1/chat/completions";

export async function generateIdeas(niche, apiKey, model) {
  const response = await axios.post(
    API_URL,
    {
      model: model,
      messages: [
        {
          role: "user",
          content: `Придумай 5 креативных идей постов для Instagram для бизнеса в нише "${niche}". Пиши коротко и ясно.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 400,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  const text = response.data.choices[0].message.content;
  return text.split("\n").filter((line) => line.trim() !== "");
}
