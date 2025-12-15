export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `Summarize the following text into clear bullet points:\n\n${text}` }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const summary =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    return res.status(200).json({ summary });
  } catch (error) {
    return res.status(500).json({ error: "Gemini API error" });
  }
}
