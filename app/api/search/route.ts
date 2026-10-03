import { searchPortfolio } from '@/lib/portfolio-search';
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q') || '';
  if (query.length > 100) return Response.json({ error: 'Use 100 characters or fewer.' }, { status: 400 });
  return Response.json({ results: searchPortfolio(query) }, { headers: { 'Cache-Control': 'public, max-age=60' } });
}
