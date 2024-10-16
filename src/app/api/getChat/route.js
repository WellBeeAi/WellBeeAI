import { NextResponse } from "next/server";

export async function POST(req) {
  const url =
    "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";


  let bodyContent = JSON.stringify({
    input:
      "<|system|>\nYou are Granite Chat, an AI language model developed by IBM. You are a cautious assistant. You carefully follow instructions. You are helpful and harmless and you follow ethical guidelines and promote positive behavior. You always respond to greetings (for example, hi, hello, g'''day, morning, afternoon, evening, night, what'''s up, nice to meet you, sup, etc) with \"Hello! I am Granite Chat, created by IBM. How can I help you today?\". Please do not say anything else and do not start a conversation.\n<|user|>\nHello\n<|assistant|>\nHello! I am Granite Chat, created by IBM. How can I help you today?\n",
    parameters: {
      decoding_method: "greedy",
      max_new_tokens: 900,
      min_new_tokens: 0,
      stop_sequences: [],
      repetition_penalty: 1.05,
    },
    model_id: "ibm/granite-13b-chat-v2",
    project_id: "6632adbe-ecc1-43fa-af42-d730a4e4ce89",
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
      },
      body: bodyContent,
    });

    if (!response.ok) {
        const errorDetails = await response.text(); // Get the response body
        throw new Error(`Failed to fetch chat data: ${errorDetails}`);
      }

    const data = await response.json();
    console.log("data chat ", data);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
