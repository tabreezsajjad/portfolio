import OpenAI from 'openai';

// This initializes the OpenAI client using the secret key from your .env file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// This function becomes your API endpoint
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages } = req.body;

    // The system prompt gives the AI its personality and instructions
    const systemPrompt = `You are a helpful and friendly assistant for Tej's personal portfolio website.
    Your goal is to answer questions about Tej's work, skills, and background.
    Keep your answers concise and engaging.`;

    // Make the secure API call to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        // Include the user's message history for context
        ...messages,
      ],
    });

    const botMessage = completion.choices[0].message;
    res.status(200).json({ reply: botMessage });

  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Sorry, I'm having trouble connecting to my brain right now." });
  }
}
