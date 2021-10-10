import { Emoji } from "emoji-mart";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useEmoji from "utils/useEmoji";
import Link from "next/link";
import Avatar from "boring-avatars";

const Update = ({ username, userId, description, emoji, date }) => {
  const { emoji: animatedEmoji, setEmoji: setAnimatedEmoji } = useEmoji();
  return (
    <div
      className="bg-white rounded-lg shadow-xl px-8 py-8"
      onMouseEnter={() => {
        if (!animatedEmoji) {
          setAnimatedEmoji(emoji);
        }
      }}
    >
      <h2 className="text-2xl font-bold">{date}</h2>
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

      <div className="flex justify-end">
        <Link href={`/log/${username}`}>
          <a className="flex items-center gap-2 mt-4 text-lg text-blue-500 font-medium hover:underline">
            <Avatar size={42} name={userId} variant="beam" />
            <h3>@{username}</h3>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Update;
