"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const emojis = ["😌", "😍", "😖", "😡"];

const EmojiSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Open emoji picker"
        className="h-10 w-10"
      >
        &#128524;
      </Button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute bottom-full left-0 bg-background border rounded-md shadow-lg overflow-hidden"
          >
            {emojis.map((emoji, index) => (
              <Button
                key={index}
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  setIsExpanded(false);
                }}
                className="h-10 w-10"
                aria-label={`Select ${emoji} emoji`}
              >
                {emoji}
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmojiSection;
