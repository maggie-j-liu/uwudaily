import Update from "components/Update";
import { supabase } from "utils/supabaseClient";
import formatDate from "utils/formatDate";
import { EmojiProvider } from "utils/useEmoji";
import EmojiAnimation from "components/EmojiAnimation";
import UpdateSkeleton from "components/UpdateSkeleton";

const GlobalLog = ({ updates }) => {
  return (
    <EmojiProvider>
      <EmojiAnimation />
      <div className="bg-gray-200 min-h-screen pt-32 pb-16">
        <main className="px-8">
          <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <UpdateSkeleton />
            {updates.map((update) => {
              const date = formatDate(new Date(update.created_at));
              return (
                <Update
                  key={update.id}
                  username={update.profiles.username}
                  userId={update.user_id}
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
    </EmojiProvider>
  );
};

export default GlobalLog;

export const getServerSideProps = async () => {
  const { data: updates, error } = await supabase
    .from("updates")
    .select(
      `
      emoji,
      description,
      id,
      created_at,
      user_id,
      upvoted_by,
      profiles (
        username
      )
    `
    )
    .order("created_at", { ascending: false });
  return {
    props: {
      updates,
    },
  };
};
