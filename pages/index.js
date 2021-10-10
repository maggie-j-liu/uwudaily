import { supabase } from "utils/supabaseClient";
import Log from "components/Log";

const GlobalLog = ({ updates }) => {
  return <Log updates={updates} skeleton who="Everyone" />;
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
