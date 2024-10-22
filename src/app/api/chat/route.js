import { NextResponse } from "next/server";
export async function POST(req) {
  const { userPrompt, systemResponse } = await req.json();

  console.log(userPrompt, systemResponse);
  let token = await getToken();

  if (token) {
    let apiResponse = await getChat(token, userPrompt, systemResponse);
    console.log("apiResponse ", apiResponse);
    return NextResponse.json({ apiResponse });
  }
}

const getToken = async () => {
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
    return data.access_token;
  } catch (error) {
    console.log(error.message);
  }
};

const getChat = async (token, userPrompt, systemResponse) => {
  const url =
    "https://eu-de.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
  //   for (let i=0,) {
  //     let str = "\n<|user|>\nHello\n<|assistant|>\nHello! I am Granite Chat, created by IBM. How can I help you today?\n"
  //   }
  let chatHistory;
  for (let index = 0; index < userPrompt.length; index++) {
    chatHistory += `<|eot_id|><|start_header_id|>user<|end_header_id|>${userPrompt[index]}`;
    if (index < systemResponse.length)
      chatHistory += `<|eot_id|><|start_header_id|>assistant<|end_header_id|>${systemResponse[index]}`;
    else chatHistory += "<|eot_id|><|start_header_id|>assistant<|end_header_id|>";
  }
  console.log("chatHistory ", chatHistory);
  let bodyContent = JSON.stringify({
    input: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n Initially you respond to greetings (for example, hi, hello, g'''day, morning, afternoon, evening, night, what'''s up, nice to meet you, sup, etc) with \"Hello! I am WellBee. Your personal mental health advisor. How can I help you today?\". You must show empathy towards the user. Please do not say anything else and do not start a conversation. Strictly give response in three to four lines only.${chatHistory}`,
    parameters: {
      decoding_method: "greedy",
      max_new_tokens: 300,
      min_new_tokens: 0,
      stop_sequences: [],
      repetition_penalty: 1.0,
    },
    // model_id: "ibm/granite-13b-chat-v2",
    model_id: "meta-llama/llama-3-1-8b-instruct",
    project_id: "2dd7a246-39ba-4c08-9af2-de19199c5778",
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: bodyContent,
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // Get the response body
      throw new Error(`Failed to fetch chat data: ${errorDetails}`);
    }

    const data = await response.json();
    console.log("data chat ", data);
    return data.results[0].generated_text;
  } catch (error) {
    console.log(error);
  }
};
