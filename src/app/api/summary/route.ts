import OpenAI from "openai";
const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY});

export async function POST(req: Request) {
    const data = await req.json();
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "Generate summary having not more than 150 words: " + data.transcript }],
            model: "gpt-3.5-turbo",
          });
          return Response.json({summary: completion.choices[0].message.content});
    }
    catch (error) {
        console.log(error);
        return Response.json({ error: 'Something went wrong' });
    }
}