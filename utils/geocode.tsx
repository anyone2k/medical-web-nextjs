"use client";

import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

export async function geocode(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const results = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );
  if (results.data["results"].length > 0) {
    const location = results.data["results"][0]["geometry"]["location"];
    return {
      lat: location["lat"],
      lng: location["lng"],
    };
  }

  console.error(
    "Geocode failed:",
    results.data.status,
    results.data.error_message
  );
  return null;
}
