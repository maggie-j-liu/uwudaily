import { Emoji } from "emoji-mart";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useEmoji from "utils/useEmoji";
import Link from "next/link";
import Avatar from "boring-avatars";
import { FiLink } from "react-icons/fi";
import UwU from "./UwU";
import useAuth from "utils/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "utils/supabaseClient";
import router from "next/router";

const Update = ({
  username,
  userId,
  description,
  emoji,
  date,
  id,
  upvotedBy,
}) => {
  const { user } = useAuth();
  const { emoji: animatedEmoji, setEmoji: setAnimatedEmoji } = useEmoji();
  const [hasUpvoted, setHasUpvoted] = useState(
    user && upvotedBy.includes(user.id)
  );
  const [upvotes, setUpvotes] = useState(upvotedBy.length);
  useEffect(() => {
    setHasUpvoted(user && upvotedBy.includes(user.id));
  }, [user]);

  const handleUpvote = async () => {
    if (!user) return;
    if (!hasUpvoted) {
      setHasUpvoted(true);
      setUpvotes((u) => u + 1);
      await supabase
        .from("updates")
        .update({ upvoted_by: [...upvotedBy, user.id] })
        .eq("id", id);
    } else {
      setHasUpvoted(false);
      setUpvotes((u) => u - 1);
      await supabase
        .from("updates")
        .update({ upvoted_by: upvotedBy.filter((x) => x !== user.id) })
        .eq("id", id);
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-xl px-8 pt-8 pb-12 text-center flex flex-col justify-between items-center">
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
      <div
        className="mx-auto w-max"
        onMouseEnter={() => {
          if (!animatedEmoji) {
            setAnimatedEmoji(emoji);
          }
        }}
      >
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
      {user ? (
        <button
          className={`absolute right-4 bottom-4 flex items-center gap-4 px-2 py-0.5 rounded-xl ${
            hasUpvoted ? "bg-blue-100" : "bg-gray-100"
          }`}
          onClick={() => handleUpvote()}
        >
          {upvotes}
          <UwU size={25} />
        </button>
      ) : (
        <div
          className={
            "absolute right-4 bottom-4 flex items-center gap-4 px-2 py-0.5 rounded-xl bg-gray-100"
          }
        >
          {upvotes}
          <UwU size={25} />
        </div>
      )}
    </div>
  );
};

export default Update;
