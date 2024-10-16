"use client";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { create } from "@/api/action";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [responses, setResponses] = useState(); // Specify the type as string[]
  const [userPrompt, setUserPrompt] = useState([]);
  const [systemResponse, setSystemResponse] = useState([]);

  useEffect(() => {
    console.log("use user", userPrompt);
    console.log("use systemResponse", systemResponse);
  }, [userPrompt]);

  const getChats = async (userPrompt, systemResponse) => {
    // console.log("msg ", msg);
    const res = await fetch("/api/chat", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userPrompt: userPrompt,
        systemResponse: systemResponse,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setSystemResponse((prevResponses) => [...prevResponses, data.apiResponse]);
      setMessage("")
      setDisabled(false);
      console.log("systemResponse ", systemResponse);
      console.log("response getChats", data);
    }
  };
  const handleSubmit = async (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    setDisabled(true);
    // if (message.trim() !== "") {
    //   // setResponses((prevResponses) => [...prevResponses, message]);
    //   setMessage("");
    // }
    console.log(message);
    setUserPrompt((prevResponses) => [...prevResponses, message]);
    console.log("userPrompt handleSubmit", userPrompt);
    console.log("systemResponse handleSubmit", systemResponse);
    await getChats([...userPrompt, message], systemResponse);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  };

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

export default ChatInput;
