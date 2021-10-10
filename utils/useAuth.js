import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useRouter } from "next/router";

const initialState = { session: null, user: null, loading: true };
const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState(initialState);
  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      setAuth({ user: session.user, session, loading: false });
    } else {
      setAuth({ ...initialState, loading: false });
    }
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setAuth({ user: session.user, session, loading: false });
        if (
          event === "SIGNED_IN" &&
          !session.user.user_metadata.updated_profile
        ) {
          await supabase.auth.update({
            data: {
              ...session.user.user_metadata,
              updated_profile: true,
            },
          });
          router.replace("/profile");
        }
      } else {
        setAuth({ ...initialState, loading: false });
      }
    });
  }, []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
