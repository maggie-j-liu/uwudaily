import Update from "components/Update";
import formatDate from "utils/formatDate";
import EmojiAnimation from "components/EmojiAnimation";
import UpdateSkeleton from "components/UpdateSkeleton";
import { useState } from "react";
import { sortByDate, sortByUpvotes } from "utils/sorting";
const Log = ({ updates, userInfo, skeleton }) => {
  const [updatesInOrder, setUpdatesInOrder] = useState(updates);
  const [dateSort, setDateSort] = useState(true);
  const updatesSortedByDate = sortByDate(updates);
  const updatesSortedByUpvotes = sortByUpvotes(updates);
  return (
    <>
      <EmojiAnimation />
      <div className="bg-gray-200 min-h-screen pt-32 pb-16">
        <main className="px-8">
          <div className="max-w-5xl mx-auto mb-4 flex justify-end items-center">
            <button
              className={`z-10 px-4 py-2 rounded-l-md ${
                dateSort ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() => {
                setDateSort(true);
                setUpdatesInOrder(updatesSortedByDate);
                console.log(updatesSortedByDate);
              }}
            >
              Sort by Date
            </button>
            <button
              className={`z-10 px-4 py-2 rounded-r-md ${
                !dateSort ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() => {
                setDateSort(false);
                setUpdatesInOrder(updatesSortedByUpvotes);
              }}
            >
              Sort by UwUs
            </button>
          </div>
          <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {skeleton && <UpdateSkeleton />}
            {updatesInOrder.map((update) => {
              const date = formatDate(new Date(update.created_at));
              return (
                <Update
                  key={update.id}
                  username={
                    userInfo ? userInfo.username : update.profiles.username
                  }
                  userId={userInfo ? userInfo.id : update.user_id}
                  description={update.description}
                  emoji={update.emoji}
                  date={date}
                  id={update.id}
                  upvotedBy={update.upvoted_by}
                />
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
};

export default Log;
