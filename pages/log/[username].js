import Update from "components/Update";
import { supabase } from "utils/supabaseClient";
import formatDate from "utils/formatDate";
import EmojiAnimation from "components/EmojiAnimation";
import UpdateSkeleton from "components/UpdateSkeleton";
import useAuth from "utils/useAuth";

const Log = ({ userInfo, updates }) => {
  const { user } = useAuth();
  return (
    <>
      <EmojiAnimation />
      <div className="bg-gray-200 min-h-screen pt-32 pb-16">
        <main className="px-8">
          <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {user && user.id === userInfo.id && <UpdateSkeleton />}
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
    .select("emoji, description, id, created_at, upvoted_by")
    .order("created_at", { ascending: false })
    .eq("user_id", userInfo.id);
  return {
    props: {
      userInfo,
      updates,
    },
  };
};
