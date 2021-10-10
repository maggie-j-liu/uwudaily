import Image from "next/image";
import Link from "next/link";
import { supabase } from "utils/supabaseClient";
import useAuth from "utils/useAuth";
import Avatar from "boring-avatars";
const Navbar = () => {
  const { user, loading } = useAuth();
  return (
    <nav className="w-full h-16 z-10 fixed top-0 bg-white/40 backdrop-blur-lg px-8 sm:px-16">
      <div className="w-full h-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/">
            <a className="flex items-center gap-2 text-blue-500">
              <svg
                width="50"
                height="50"
                viewBox="0 0 74 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.99999 6C1.99999 9.89642 0.555525 14.2469 4.49999 16C6.90459 17.0687 9.36486 17.7081 11.5 16C16.2704 12.1836 18 10.4073 18 4M26 8C26 11.2726 24.8486 14 28.5 14C29.9951 14 32.0056 14.3556 33.4444 13.9444C37.0458 12.9155 33.1367 6.24605 35.5 10.5C38.8677 16.5618 46 18.3337 46 10M54.8369 4.256V12.2396C54.8369 14.4449 54.7019 15.3744 56.7154 16.7913C57.987 17.6862 61.6251 18.7144 62.965 17.5861C64.0454 16.6763 65.6611 16.2477 66.8665 15.4728C68.0389 14.7191 68.5517 12.6229 69.1424 11.4087C70.0891 9.46271 70.7843 7.19347 71.1112 5.06881C71.2017 4.48018 71.3006 2.52664 71.7434 2.30525"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-semibold hidden sm:block">daily</span>
            </a>
          </Link>

          {user && (
            <>
              <Link href="/new">
                <a>Post</a>
              </Link>
              <Link href={`/log/${user.user_metadata.username}`}>
                <a>My Log</a>
              </Link>
            </>
          )}
        </div>
        {!loading && (
          <div className="flex items-center gap-4 sm:gap-8">
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link href="/profile">
                  <a className="flex items-center gap-2">
                    <Avatar size={32} name={user.id} variant="beam" />
                    {user.user_metadata.username}
                  </a>
                </Link>
                <span className="text-xl">&bull;</span>
                <button type="button" onClick={() => supabase.auth.signOut()}>
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/sign-in">
                <a>Sign In</a>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
