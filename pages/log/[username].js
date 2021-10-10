import { supabase } from "utils/supabaseClient";
import useAuth from "utils/useAuth";
import Log from "components/Log";

const LogPage = ({ userInfo, updates }) => {
  const { user } = useAuth();
  return (
    <Log
      userInfo={userInfo}
      updates={updates}
      skeleton={user && user.id === userInfo.id}
    />
  );
};

export default LogPage;

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
