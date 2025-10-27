// This is a serverless function that can be deployed to Vercel, Netlify, or similar platforms.
// It securely fetches Google reviews using an API key stored in an environment variable.

// A simple in-memory cache to store the reviews and avoid hitting the API on every request.
let cachedReviews: any = null;
let cacheTimestamp = 0;

export const config = {
  runtime: 'edge',
};

// The main handler for the serverless function.
export default async function handler() {
  const CACHE_DURATION = 1000 * 60 * 60; // Cache for 1 hour

  // Serve from cache if it's not stale
  if (cachedReviews && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    return new Response(JSON.stringify(cachedReviews), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.error("Google API Key or Place ID is not configured.");
    return new Response(JSON.stringify({ error: 'Server configuration error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google Places API Error:', errorData);
      throw new Error('Failed to fetch data from Google Places API.');
    }

    const data = await response.json();
    const result = data.result;

    if (!result || !result.reviews) {
       // Return a successful response with empty data if there are no reviews
       return new Response(JSON.stringify({ rating: 0, totalRatings: 0, reviews: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Filter for 5-star reviews and format the response
    const formattedReviews = result.reviews
      .filter((review: any) => review.rating === 5)
      .slice(0, 5) // Get the top 5
      .map((review: any) => ({
        author_name: review.author_name,
        profile_photo_url: review.profile_photo_url,
        rating: review.rating,
        text: review.text,
        relative_time_description: review.relative_time_description,
      }));
      
    const responsePayload = {
        name: result.name,
        rating: result.rating,
        totalRatings: result.user_ratings_total,
        reviews: formattedReviews,
    };

    // Update cache
    cachedReviews = responsePayload;
    cacheTimestamp = Date.now();

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in google-reviews function:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch reviews.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
