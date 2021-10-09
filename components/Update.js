import { Emoji } from "emoji-mart";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useEmoji from "utils/useEmoji";

const Update = ({ username, description, emoji, date }) => {
  const { emoji: animatedEmoji, setEmoji: setAnimatedEmoji } = useEmoji();
  return (
    <div
      className="bg-white rounded-lg shadow-xl px-8 py-8"
      onMouseMove={() => {
        if (!animatedEmoji) {
          setAnimatedEmoji(emoji);
        }
      }}
    >
      <h2 className="text-2xl font-bold">{date}</h2>
      <h3 className="text-lg text-gray-600">@{username}</h3>
      <div className="mx-auto w-max">
        <Emoji emoji={emoji} size={112} />
      </div>
      {description && (
        <div className="prose prose-blue">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {description}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Update;
