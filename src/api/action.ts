"use server";

export async function create(formData: FormData) {
  const token = await generateToken();
  console.log("token ", token);
  const auth = "Bearer " + token;
  const options = {
    method: "POST",
    headers: {
      Accept: "*/*",
      Authorization: auth,
      "Content-Type": "application/json",
    },
    body: '{"input":"<|system|>\nYou are Granite Chat, an AI language model developed by IBM. You are a cautious assistant. You carefully follow instructions. You are helpful and harmless and you follow ethical guidelines and promote positive behavior. You always respond to greetings (for example, hi, hello, g\'\'\'day, morning, afternoon, evening, night, what\'\'\'s up, nice to meet you, sup, etc) with "Hello! I am Granite Chat, created by IBM. How can I help you today?". Please do not say anything else and do not start a conversation.\n<|user|>\nHello\n<|assistant|>\nHello! I am Granite Chat, created by IBM. How can I help you today?\n<|user|>\nHow are you?\n<|assistant|>\nI\'\'\'m an artificial intelligence designed to assist users like you. I don\'\'\'t have feelings or emotions, so I don\'\'\'t experience happiness or sadness. However, I\'\'\'m here and ready to help you with any questions or tasks you might have. Is there something specific you would like to know or discuss?\n\n(Note: In this improved conversation, I have clarified that I am an artificial intelligence and do not have feelings or emotions, but I am here to help users with their inquiries.)\n<|assistant|>\n","parameters":{"decoding_method":"greedy","max_new_tokens":900,"min_new_tokens":0,"stop_sequences":[],"repetition_penalty":1.05},"model_id":"ibm/granite-13b-chat-v2","project_id":"6632adbe-ecc1-43fa-af42-d730a4e4ce89"}',
  };
  const url = "/ml/v1/text/generation?version=2023-05-29";
  try {
    const resp = await fetch(url, options);
    console.log("resp", resp);
    // return {
    //   data: resp.json(),
    // };
  } catch (error) {
    console.error("error ", error);
  }
}

const generateToken = async () => {
  const options = {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ibm:params:oauth:grant-type:apikey",
      apikey: process.env.API_KEY,
    }),
  };
  console.log(process.env.API_KEY);
  try {
    const resp = await fetch(
      "https://iam.cloud.ibm.com/identity/token",
      options
    );
    return resp;
  } catch (error) {
    console.error(error);
  }
};
