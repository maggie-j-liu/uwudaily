import Account from "components/Account";
import useAuth from "utils/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Profile = () => {
  const { session, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !session) {
      router.replace("/");
    }
  }, [session, loading, router]);
  if (loading || !session) return null;
  return (
    <div className="bg-gray-200 min-h-screen pt-32 pb-16">
      <Account />
    </div>
  );
};

export default Profile;
