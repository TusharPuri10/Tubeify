import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });

export async function POST(req: Request) {
    const data = await req.json();
    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: "system", content: "Generate summary having not more than 150 words: " + data.transcript }],
            model: "llama3-8b-8192",
          });
          return Response.json({summary: completion.choices[0].message.content});
    }
    catch (error) {
        console.log(error);
        return Response.json({ error: 'Something went wrong' });
    }
}