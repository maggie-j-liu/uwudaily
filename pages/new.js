import formatDate from "utils/formatDate";
import { Emoji } from "emoji-mart";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "utils/supabaseClient";
import useAuth from "utils/useAuth";
import { useRouter } from "next/router";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useEmoji from "utils/useEmoji";
import EmojiAnimation from "components/EmojiAnimation";
import UwU from "components/UwU";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
const Picker = dynamic(() => import("emoji-mart").then((mod) => mod.Picker), {
  ssr: false,
});

const AddNew = () => {
  const { setEmoji: setAnimatedEmoji } = useEmoji();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [emoji, setEmoji] = useState(null);
  const [description, setDescription] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const options = useMemo(
    () => ({
      minHeight: "150px",
      status: false,
      placeholder: "Optional: add a short description",
      previewRender: (plainText) => {
        return ReactDOMServer.renderToString(
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{plainText}</ReactMarkdown>
        );
      },
    }),
    []
  );

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [router, loading, user]);

  const formattedDate = formatDate(new Date());

  const handleSubmit = async () => {
    if (emoji === null) {
      return;
    }
    setSubmitLoading(true);
    const { data } = await supabase.from("updates").insert([
      {
        emoji,
        description: description ? description : null,
        created_at: new Date(),
        user_id: user.id,
      },
    ]);
    const id = data[0].id;
    setAnimatedEmoji(emoji);
    setTimeout(() => {
      router.push(`/log/${user.user_metadata.username}#${id}`);
      setSubmitLoading(false);
    }, 2000);
  };

  if (loading) return null;
  return (
    <div className="min-h-screen bg-gray-200 pt-32 pb-16 px-8 sm:px-16">
      <EmojiAnimation />
      <main className="mx-auto max-w-5xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1>
              <span className="block text-3xl uppercase font-medium text-gray-500">
                Today is
              </span>
              <span className="block text-5xl font-semibold">
                {formattedDate}
              </span>{" "}
            </h1>
            <h2 className="mt-4 text-4xl text-gray-800">
              How are <span className="text-blue-500 font-semibold">you</span>{" "}
              feeling today?
            </h2>
            <p className="mt-4 text-2xl">Choose an emoji to get started.</p>
            <div className="mt-4">
              <Picker
                onSelect={setEmoji}
                custom={[
                  {
                    name: "Party Parrot",
                    short_names: ["party_parrot"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/partyparrot.gif",
                    keywords: ["party", "parrot"],
                  },
                  {
                    name: "Supabase",
                    short_names: ["supabase"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/supabase.png",
                    keywords: ["supabase"],
                  },
                  {
                    name: "Blob Heart",
                    short_names: ["blobheart"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/blobheart.png",
                    keywords: ["blob", "heart"],
                  },
                  {
                    name: "Cool Thumbs",
                    short_names: ["cooll-thumbs"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/coollthumbs.png",
                    keywords: ["cool", "thumbs"],
                  },
                  {
                    name: "Crying Cool",
                    short_names: ["crying-cool"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/cryingcool.png",
                    keywords: ["crying", "cool"],
                  },
                  {
                    name: "Dead",
                    short_names: ["dead"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/dead.png",
                    keywords: ["dead", "tired"],
                  },
                  {
                    name: "Expanding Brain",
                    short_names: ["expanding-brain"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/expandingbrain.png",
                    keywords: ["brain", "expanding", "galaxy"],
                  },
                  {
                    name: "Hack",
                    short_names: ["hack"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/hack.gif",
                    keywords: ["hack", "cat", "typing"],
                  },
                  {
                    name: "Peefest",
                    short_names: ["peefest"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/peefest.png",
                    keywords: ["peefest", "pee"],
                  },
                  {
                    name: "Sadglas",
                    short_names: ["sadglas"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/sadglas.png",
                    keywords: ["sad"],
                  },
                  {
                    name: "Sad Thonk",
                    short_names: ["sad-thonk"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/sadthonk.png",
                    keywords: ["sad", "thonk"],
                  },
                  {
                    name: "Sad Yeehaw",
                    short_names: ["sad-yeehaw"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/sadyeehaw.png",
                    keywords: ["sad", "yeehaw", "cowboy"],
                  },
                  {
                    name: "Salute",
                    short_names: ["salute"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/salute.png",
                    keywords: ["salute"],
                  },
                  {
                    name: "Thinkies",
                    short_names: ["thinkies"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/thinkies.png",
                    keywords: ["think"],
                  },
                  {
                    name: "Thonk",
                    short_names: ["thonk"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/thonk.png",
                    keywords: ["think", "thonk"],
                  },
                  {
                    name: "Ultra-fast Parrot",
                    short_names: ["ultrafastparrot"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/ultrafastparrot.gif",
                    keywords: ["party", "parrot", "ultrafast"],
                  },
                  {
                    name: "Yay",
                    short_names: ["yay"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/emojis/yay.gif",
                    keywords: ["yay"],
                  },
                  {
                    name: "UwU",
                    short_names: ["uwu"],
                    text: "",
                    emoticons: [],
                    imageUrl: "/uwu.svg",
                    keywords: ["uwu"],
                  },
                ]}
              />
            </div>
          </div>
          <div className="justify-self-stretch">
            <div className="bg-white px-8 py-10 rounded-xl shadow-xl">
              <div
                className={`flex items-center justify-center rounded-full h-28 w-28 mx-auto ${
                  emoji === null ? " bg-blue-100 border-blue-400 border-4" : ""
                }`}
              >
                {emoji !== null ? (
                  <Emoji emoji={emoji} size={112} />
                ) : (
                  <div className="text-7xl text-blue-400">
                    <UwU size={75} />
                  </div>
                )}
              </div>
              <p className="text-center text-xl font-semibold text-gray-600 mt-4">
                {formattedDate}
              </p>
              <div className="prose !max-w-none mt-4">
                <SimpleMdeReact
                  options={options}
                  value={description}
                  onChange={setDescription}
                />
              </div>
              <button
                type="button"
                className="w-full mt-4 px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-blue-600 hover:duration-75 duration-300 disabled:saturate-50 disabled:cursor-not-allowed"
                onClick={() => handleSubmit()}
                disabled={submitLoading || emoji === null}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>
      <style>
        {`
          .emoji-mart{
            width: 100%!important;
            padding: 10px;
            border-radius: 0.75rem;
            --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
          }
          .emoji-mart-anchor-icon > svg{
            margin: auto;
          }
          .emoji-mart-bar{
            display: none;
          }
          `}
      </style>
    </div>
  );
};

export default AddNew;
