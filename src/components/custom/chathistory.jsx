import React from "react";

const ChatHistory = ({ userPrompt, systemResponse }) => {
  // Combine messages into one array with alternating messages
  console.log("chatHistory ", userPrompt, systemResponse);
  const combinedMessages = [];
//   const maxLength = Math.max(userPrompt.length, systemResponse.length);

  for (let i = 0; i < userPrompt.length; i++) {
      combinedMessages.push({ type: "user", message: userPrompt[i] });
    if (i < systemResponse.length) {
      combinedMessages.push({ type: "system", message: systemResponse[i] });
    }
  }
  console.log("chatHistory combinedMessages", combinedMessages);
  return (
    <div>
      {combinedMessages.map((item, index) =>
        item.type === "user" ? (
          <UserMessage key={index} message={item.message} />
        ) : (
          <SystemResponse key={index} message={item.message} />
        )
      )}
    </div>
  );
};

const UserMessage = ({ message }) => {
  return (
    <div className="flex flex-row-reverse items-center gap-3 w-full px-4">
      <div className="rounded-full p-3 bg-lime-400">U</div>
      <div className="font-mono">{message}</div>
    </div>
  );
};

const SystemResponse = ({ message }) => {
  return (
    <div className="flex  items-center gap-3  w-[70%] px-4">
      <div className="rounded-full p-3 bg-lime-600">S</div>
      <div className="font-sans">{message}</div>
    </div>
  );
};

export default ChatHistory;
