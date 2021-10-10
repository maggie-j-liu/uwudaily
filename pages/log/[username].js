import Update from "components/Update";
import { supabase } from "utils/supabaseClient";
import formatDate from "utils/formatDate";
import { EmojiProvider } from "utils/useEmoji";
import EmojiAnimation from "components/EmojiAnimation";

const Log = ({ userInfo, updates }) => {
  return (
    <EmojiProvider>
      <EmojiAnimation />
      <div className="bg-gray-200 min-h-screen pt-32 pb-16">
        <main className="w-full px-8 md:px-0 max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {updates.map((update) => {
            const date = formatDate(new Date(update.created_at));
            return (
              <Update
                key={update.id}
                username={userInfo.username}
                userId={userInfo.id}
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

export default Log;

export const getServerSideProps = async ({ params }) => {
  const { data: userInfo } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("username", params.username)
    .single();
  if (userInfo == null) {
    return {
      notFound: true,
    };
  }
  const { data: updates } = await supabase
    .from("updates")
    .select("emoji, description, id, created_at")
    .order("created_at", { ascending: false })
    .eq("user_id", userInfo.id);
  return {
    props: {
      userInfo,
      updates,
    },
  };
};
