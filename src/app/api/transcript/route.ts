
import { YoutubeTranscript } from 'youtube-transcript';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url")!;
  try {
      const transcript = await YoutubeTranscript.fetchTranscript(url);
      return Response.json(transcript);
  }
  catch (error: any) {
    console.error('Error fetching transcript:', error);
    return Response.json({ error: error.message || 'Something went wrong' });
  }
}