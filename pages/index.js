import Update from "components/Update";
import { supabase } from "utils/supabaseClient";
import formatDate from "utils/formatDate";
import { EmojiProvider } from "utils/useEmoji";
import EmojiAnimation from "components/EmojiAnimation";

const GlobalLog = ({ updates }) => {
  return (
    <EmojiProvider>
      <EmojiAnimation />
      <div className="bg-gray-200 min-h-screen pt-32 pb-16">
        <main className="w-full px-8 sm:px-16 max-w-3xl mx-auto space-y-8">
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
              />
            );
          })}
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
