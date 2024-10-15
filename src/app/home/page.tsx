"use client";
import ChatInput from "@/components/custom/chatinput";
import EmojiSection from "@/components/custom/emoji";
import SuggestionInput from "@/components/custom/suggestioninput";

import React, { useEffect, useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [responses, setResponses] = useState<string[]>([]); // Specify the type as string[]

  // Retrieve stored values from localStorage when component mounts
  useEffect(() => {
    const storedResponses = localStorage.getItem("responses");
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }
  }, []);

  // Update localStorage whenever responses change
  useEffect(() => {
    localStorage.setItem("responses", JSON.stringify(responses));
  }, [responses]);





  return (
    <div className="css-selector flex items-center justify-center  h-screen w-screen flex-col gap-2">
      {/* <EmojiSection /> */}
      <div className="font-serif text-3xl  p-2 text-white font-bold">
        What can i help with ?
      </div>
      <ChatInput/>
      <SuggestionInput/>
    </div>
  );
};



export default Home;
