import { Emoji } from "emoji-mart";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useEmoji from "utils/useEmoji";
import Link from "next/link";
import Avatar from "boring-avatars";
import { FiLink } from "react-icons/fi";

const Update = ({ username, userId, description, emoji, date, id }) => {
  const { emoji: animatedEmoji, setEmoji: setAnimatedEmoji } = useEmoji();
  return (
    <div
      className="bg-white rounded-lg shadow-xl px-8 py-8 text-center flex flex-col justify-between items-center"
      onMouseEnter={() => {
        if (!animatedEmoji) {
          setAnimatedEmoji(emoji);
        }
      }}
    >
      <h2
        className="mx-auto relative text-2xl font-bold flex items-center gap-4 group w-max pt-28 -mt-28 mb-5"
        id={id}
      >
        {date}
        <Link href={`#${id}`}>
          <a className="text-gray-500 absolute -right-8 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:duration-100 duration-300">
            <FiLink className="w-5 h-5" />
          </a>
        </Link>
      </h2>
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

      <div className="flex justify-center">
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
