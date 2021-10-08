import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const initialState = { session: null, user: null, loading: true };
const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      setAuth({ user: session.user, session, loading: false });
    } else {
      setAuth({ ...initialState, loading: false });
    }
    return supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth({ user: session.user, session, loading: false });
      } else {
        setAuth({ ...initialState, loading: false });
      }
    });
  }, []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
