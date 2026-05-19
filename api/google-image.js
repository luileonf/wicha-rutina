export default async function handler(request, response) {
  const query = request.query?.q;
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  if (!query) {
    response.status(200).json({ imageUrl: null, reason: "missing_query" });
    return;
  }

  if (!apiKey || !searchEngineId) {
    response.status(200).json({
      imageUrl: null,
      reason: "missing_environment_variables",
      hasApiKey: Boolean(apiKey),
      hasSearchEngineId: Boolean(searchEngineId)
    });
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
    const data = await googleResponse.json();

    if (!googleResponse.ok) {
      response.status(200).json({
        imageUrl: null,
        reason: "google_api_error",
        googleStatus: googleResponse.status,
        googleMessage: data.error?.message ?? "Google did not return an image response"
      });
      return;
    }

    const firstImage = data.items?.[0];

    response.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
    response.status(200).json({
      imageUrl: firstImage?.link ?? null,
      sourceUrl: firstImage?.image?.contextLink ?? null,
      title: firstImage?.title ?? null,
      reason: firstImage ? "ok" : "no_results"
    });
  } catch (error) {
    response.status(200).json({ imageUrl: null, reason: "request_failed", message: error.message });
  }
}
