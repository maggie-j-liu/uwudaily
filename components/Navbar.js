import Image from "next/image";
import Link from "next/link";
import { supabase } from "utils/supabaseClient";
import useAuth from "utils/useAuth";
import Avatar from "boring-avatars";
import UwU from "./UwU";
const Navbar = () => {
  const { user, loading } = useAuth();
  return (
    <nav className="w-full h-16 z-10 fixed top-0 bg-white/40 backdrop-blur-lg px-8 sm:px-16">
      <div className="w-full h-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/">
            <a className="flex items-center gap-2 text-blue-500">
              <UwU />
              <span className="font-semibold hidden sm:block">daily</span>
            </a>
          </Link>

          {user && (
            <>
              <Link href="/new">
                <a>new entry</a>
              </Link>
              <Link href={`/log/${user.user_metadata.username}`}>
                <a>my log</a>
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
                    <span className="hidden sm:block">
                      {user.user_metadata.username}
                    </span>
                  </a>
                </Link>
                <span className="text-xl">&bull;</span>
                <button type="button" onClick={() => supabase.auth.signOut()}>
                  sign out
                </button>
              </div>
            ) : (
              <Link href="/sign-in">
                <a>sign in</a>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
