"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, RotateCcw } from "lucide-react";

const ChatInput = ({ onUserActiveChange }) => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [userPrompt, setUserPrompt] = useState([]);
  const [systemResponse, setSystemResponse] = useState([]);

  useEffect(() => {
    if (userPrompt.length > 0 || systemResponse.length > 0) {
      onUserActiveChange(true, userPrompt, systemResponse);
    }
  }, [userPrompt, systemResponse]);

  const getChats = async (userPrompt, systemResponse) => {
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
      setSystemResponse((prevResponses) => [
        ...prevResponses,
        data.apiResponse,
      ]);
      setMessage("");
      setDisabled(false);
      console.log("systemResponse ", systemResponse);
      console.log("response getChats", data);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    console.log(message);
    setUserPrompt((prevResponses) => [...prevResponses, message]);
    await getChats([...userPrompt, message], systemResponse);
  };
  const handleReset = () => {
    setUserPrompt([]);
    setSystemResponse([]);
    setMessage("");
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
      <Button className="rounded-2xl">
        <Send className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
      <Button className="rounded-2xl mx-2" onClick={handleReset}>
        <RotateCcw className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default ChatInput;
