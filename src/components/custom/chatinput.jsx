"use client";
import React, { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { create } from "@/api/action";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [responses, setResponses] = useState(); // Specify the type as string[]
  // const [error, action, isPending] = useActionState(create, null);
  // const [state, formAction] = useFormState(create, initialState);
  const [token, setToken] = useState("");
  const getToken = async () => {
    try {
      const response = await fetch("/api/getToken", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("data ", data);
      setToken(data.token);
      localStorage.setItem("ibm_token", data.token);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };
  const getChat = async () => {

    try {
      const response = await fetch("/api/getChat", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('ibm_token')}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("data chat", data);
    } catch (error) {
      console.error("Error chat:", error);
    }
  };
  const handleSubmit = async (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    setDisabled(true);
    if (message.trim() !== "") {
      // setResponses((prevResponses) => [...prevResponses, message]);
      setMessage("");
    }
    await getToken();
    const response = await getChat();
    // const generatetext = await generateText();
    console.log("resp ", response);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  };
  // console.log("state", state);

  return (
    <form
      className="flex items-center justify-center w-[500px]"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder={!disabled ? "Type your message ..." : "Thinking..."}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow mr-2 rounded-2xl"
        disabled={disabled}
      />
      <Button size="icon" className="rounded-2xl">
        <Send className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
};
// // export async function create() {
// //   const token = await generateToken();
// //   const auth = "Bearer " + token;
// //   const options = {
// //     method: "POST",
// //     headers: {
// //       Accept: "*/*",
// //       Authorization: auth,
// //       "Content-Type": "application/json",
// //     },
// //     body: '{"input":"<|system|>\nYou are Granite Chat, an AI language model developed by IBM. You are a cautious assistant. You carefully follow instructions. You are helpful and harmless and you follow ethical guidelines and promote positive behavior. You always respond to greetings (for example, hi, hello, g\'\'\'day, morning, afternoon, evening, night, what\'\'\'s up, nice to meet you, sup, etc) with "Hello! I am Granite Chat, created by IBM. How can I help you today?". Please do not say anything else and do not start a conversation.\n<|user|>\nHello\n<|assistant|>\nHello! I am Granite Chat, created by IBM. How can I help you today?\n<|user|>\nHow are you?\n<|assistant|>\nI\'\'\'m an artificial intelligence designed to assist users like you. I don\'\'\'t have feelings or emotions, so I don\'\'\'t experience happiness or sadness. However, I\'\'\'m here and ready to help you with any questions or tasks you might have. Is there something specific you would like to know or discuss?\n\n(Note: In this improved conversation, I have clarified that I am an artificial intelligence and do not have feelings or emotions, but I am here to help users with their inquiries.)\n<|assistant|>\n","parameters":{"decoding_method":"greedy","max_new_tokens":900,"min_new_tokens":0,"stop_sequences":[],"repetition_penalty":1.05},"model_id":"ibm/granite-13b-chat-v2","project_id":"6632adbe-ecc1-43fa-af42-d730a4e4ce89"}',
// //   };
// //   const url = "/ml/v1/text/generation?version=2023-05-29";
// //   try {
// //     const resp = await fetch(url, options);
// //     console.log("resp", resp);
// //     return {
// //       data: resp.json(),
// //     };
// //   } catch (error) {
// //     console.error("error ", error);
// //   }
// // }
const generateToken = async () => {
  console.log("token called");
  const options = {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ibm:params:oauth:grant-type:apikey",
      apikey: process.env.NEXT_PUBLIC_API_KEY,
    }),
  };
  console.log(process.env.NEXT_PUBLIC_API_KEY);
  let resp;
  try {
    resp = await fetch("https://iam.cloud.ibm.com/identity/token", options);
    console.log(resp);
  } catch (error) {
    console.error(error);
  }
  return resp.access_token;
};

// https://iam.cloud.ibm.com/identity/token

async function generateText() {
  e.preventDefault();
  setDisabled(true);
  const token = await generateToken();
  console.log(token);
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
    setResponses(resp.json());
    console.log("resp", responses);
    return {
      data: resp.json(),
    };
  } catch (error) {
    console.error("error ", error);
  }
}

const getToken = async () => {
  try {
    const response = await fetch("/api/getToken", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Token:", data.token); // Use the token as needed
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

export default ChatInput;
