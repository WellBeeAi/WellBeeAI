import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useFormState } from "react-dom";
import { create } from "@/app/api/action";

const initialState =  {
    data: Promise<any>,
  }

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [responses, setResponses] = useState<string[]>([]); // Specify the type as string[]
  const [state, formAction] = useFormState(create, initialState);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setDisabled(true);
//     if (message.trim() !== "") {
//       setResponses((prevResponses) => [...prevResponses, message]);
//       setMessage("");
//     }
//     const response = await generateText();
//     console.log("resp ", response);
//     setTimeout(() => {
//       setDisabled(false);
//     }, 2000);
//   };
  console.log("state", state);
  return (
    <form className="flex items-center justify-center w-[500px]" action={formAction}>
      <Input
        type="text"
        placeholder={!disabled ? "Type your message ..." : "Thinking..."}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow mr-2 rounded-2xl"
        disabled={disabled}
      />
      <Button size="icon"  className="rounded-2xl">
        <Send className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
};
export const generateText = async () => {
  const options = {
    method: "POST",
    headers: {
      Accept: "*/*",
      Authorization:
        "Bearer eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJJQk1pZC02OTUwMDAzMFBVIiwiaWQiOiJJQk1pZC02OTUwMDAzMFBVIiwicmVhbG1pZCI6IklCTWlkIiwianRpIjoiMzRjNjUyMDUtMDhlYi00NjIyLTljMzMtZmM2ZGFhZGVjYzNkIiwiaWRlbnRpZmllciI6IjY5NTAwMDMwUFUiLCJnaXZlbl9uYW1lIjoiVmlzaHdhaml0IiwiZmFtaWx5X25hbWUiOiJEYW5kYWdlIiwibmFtZSI6IlZpc2h3YWppdCBEYW5kYWdlIiwiZW1haWwiOiJ2aXNod2FqaXRfZGFuZGFnZUBwZXJzaXN0ZW50LmNvbSIsInN1YiI6InZpc2h3YWppdF9kYW5kYWdlQHBlcnNpc3RlbnQuY29tIiwiYXV0aG4iOnsic3ViIjoidmlzaHdhaml0X2RhbmRhZ2VAcGVyc2lzdGVudC5jb20iLCJpYW1faWQiOiJJQk1pZC02OTUwMDAzMFBVIiwibmFtZSI6IlZpc2h3YWppdCBEYW5kYWdlIiwiZ2l2ZW5fbmFtZSI6IlZpc2h3YWppdCIsImZhbWlseV9uYW1lIjoiRGFuZGFnZSIsImVtYWlsIjoidmlzaHdhaml0X2RhbmRhZ2VAcGVyc2lzdGVudC5jb20ifSwiYWNjb3VudCI6eyJ2YWxpZCI6dHJ1ZSwiYnNzIjoiZjAwZmZhYjYzZDhkNGNkOGE4OTlmY2MxNmM3M2U5NTEiLCJmcm96ZW4iOnRydWV9LCJpYXQiOjE3MjgzNzgxNTYsImV4cCI6MTcyODM4MTc1NiwiaXNzIjoiaHR0cHM6Ly9pYW0uY2xvdWQuaWJtLmNvbS9pZGVudGl0eSIsImdyYW50X3R5cGUiOiJ1cm46aWJtOnBhcmFtczpvYXV0aDpncmFudC10eXBlOmFwaWtleSIsInNjb3BlIjoiaWJtIG9wZW5pZCIsImNsaWVudF9pZCI6ImRlZmF1bHQiLCJhY3IiOjEsImFtciI6WyJwd2QiXX0.p-ctgN67CHuxE0LE9EduoRdi3bvxblk7nue9IWWL05nuEYblSde95qnll695kCTYcmAEM6FMMLp-kTYepBTQrVAWbPQSUQ0Bly-FzEPsMWFbUg9v3WOA5cRRzKt5N7ZvOIWY8lw6YAKlgtcjM5LKHezcVYjysblTsAJ1DK_VcTaEv2GOqQkN3KnQfTrduh35mU3yG8NelnCf-xEv1MN7hnHDTLi-dBhN2rHy0_1XQzx75LFJJsD5U2XpzzM4VaqnF0bRRCyOu6EH2ht5NRO4GRKB-msYnrt-HS7Lj1OMRJTZ7sEsihRZ-H9R4E0WFpcXzKTOWQjeT4qml-WjX87umQ",
      "Content-Type": "application/json",
    },
    body: '{"input":"<|system|>\nYou are Granite Chat, an AI language model developed by IBM. You are a cautious assistant. You carefully follow instructions. You are helpful and harmless and you follow ethical guidelines and promote positive behavior. You always respond to greetings (for example, hi, hello, g\'\'\'day, morning, afternoon, evening, night, what\'\'\'s up, nice to meet you, sup, etc) with "Hello! I am Granite Chat, created by IBM. How can I help you today?". Please do not say anything else and do not start a conversation.\n<|user|>\nHello\n<|assistant|>\nHello! I am Granite Chat, created by IBM. How can I help you today?\n<|user|>\nHow are you?\n<|assistant|>\nI\'\'\'m an artificial intelligence designed to assist users like you. I don\'\'\'t have feelings or emotions, so I don\'\'\'t experience happiness or sadness. However, I\'\'\'m here and ready to help you with any questions or tasks you might have. Is there something specific you would like to know or discuss?\n\n(Note: In this improved conversation, I have clarified that I am an artificial intelligence and do not have feelings or emotions, but I am here to help users with their inquiries.)\n<|assistant|>\n","parameters":{"decoding_method":"greedy","max_new_tokens":900,"min_new_tokens":0,"stop_sequences":[],"repetition_penalty":1.05},"model_id":"ibm/granite-13b-chat-v2","project_id":"6632adbe-ecc1-43fa-af42-d730a4e4ce89"}',
  };
  const url =
    "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";

  const response = await fetch(
    "/ml/v1/text/generation?version=2023-05-29",
    options
  );
  console.log("resfun ", response);
  if (!response.ok) {
    throw new Error("Non-200 response");
  }

  return await response.json();
};
export default ChatInput;
