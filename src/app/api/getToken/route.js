import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const response = await fetch("https://iam.cloud.ibm.com/identity/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://cloud.ibm.com",
      },
      body: new URLSearchParams({
        grant_type: "urn:ibm:params:oauth:grant-type:apikey",
        apikey: process.env.NEXT_PUBLIC_API_KEY,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ token: data.access_token });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
