import React from "react";
import { FaRegSurprise } from "react-icons/fa";

const SuggestionInput = () => {
  return (
    <div className="flex gap-2 items-center border p-2 rounded-full hover:bg-amber-300 hover:ease-in-out hover:cursor-pointer hover:text-white shadow-md font-sans">
      <div>
        <FaRegSurprise />
      </div>
      <div>Surprise Me</div>
    </div>
  );
};

export default SuggestionInput;
