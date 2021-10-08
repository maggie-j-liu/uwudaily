import useAuth from "utils/useAuth";
import Link from "next/link";
import { supabase } from "utils/supabaseClient";

export default function Home() {
  const { loading, user } = useAuth();
  return (
    <div
      className="bg-gray-200 min-h-screen"
      style={{ padding: "50px 0 100px 0" }}
    >
      {loading ? null : user ? (
        <button
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md focus-visible:outline-none"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      ) : (
        <Link href="/sign-in">
          <a className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md focus-visible:outline-none">
            Sign In
          </a>
        </Link>
      )}
    </div>
  );
}
