import formatDate from "utils/formatDate";
import { Picker, Emoji } from "emoji-mart";
import { useState } from "react";

const AddNew = () => {
  const [emoji, setEmoji] = useState(null);
  const formattedDate = formatDate(new Date());
  return (
    <div className="min-h-screen bg-gray-200 pt-32 pb-16 px-8 sm:px-16">
      <main className="mx-auto max-w-5xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h1>
              <span className="block text-3xl uppercase font-medium text-gray-500">
                Today is
              </span>
              <span className="block text-5xl font-semibold">
                {formattedDate}
              </span>{" "}
            </h1>
            <h2 className="mt-8 text-4xl text-gray-800">
              How are <span className="text-blue-500 font-semibold">you</span>{" "}
              feeling today?
            </h2>
            <p className="mt-4 text-2xl">Choose an emoji to get started.</p>
            <div className="mt-8">
              <Picker
                emoji="heart"
                title="Choose an emoji"
                onSelect={setEmoji}
              />
            </div>
          </div>
          <div className="justify-self-stretch">
            <div className="bg-white px-8 py-10 rounded-xl shadow-xl">
              <div
                className={`rounded-full h-28 w-28 mx-auto ${
                  emoji === null ? " bg-white" : ""
                }`}
              >
                {emoji !== null && <Emoji emoji={emoji} size={112} />}
              </div>
              <p className="text-center text-xl font-semibold text-gray-600 mt-2">
                {formattedDate}
              </p>
              <label className="block mt-8">
                <p className="text-lg text-gray-600">
                  Optional: add a short description
                </p>
                <textarea className="w-full border-gray-400 rounded-md h-28" />
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddNew;
