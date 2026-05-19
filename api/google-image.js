export default async function handler(request, response) {
  const query = request.query?.q;
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  if (!query || !apiKey || !searchEngineId) {
    response.status(200).json({ imageUrl: null });
    return;
  }

  const params = new URLSearchParams({
    key: apiKey,
    cx: searchEngineId,
    searchType: "image",
    safe: "active",
    num: "1",
    q: `${query} exercise technique`
  });

  try {
    const googleResponse = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`);

    if (!googleResponse.ok) {
      response.status(200).json({ imageUrl: null });
      return;
    }

    const data = await googleResponse.json();
    const firstImage = data.items?.[0];

    response.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
    response.status(200).json({
      imageUrl: firstImage?.link ?? null,
      sourceUrl: firstImage?.image?.contextLink ?? null,
      title: firstImage?.title ?? null
    });
  } catch {
    response.status(200).json({ imageUrl: null });
  }
}
