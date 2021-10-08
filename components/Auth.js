import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Image from "next/image";
import { FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  const signInWithProvider = async (provider) => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        provider,
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="flex justify-center">
          <Image src="/uwu.svg" alt="uwu face" width={50} height={50} />
        </div>
        <p className="uppercase text-center text-2xl pb-6">
          Sign in to <br />
          <span className="text-blue-500 normal-case font-bold text-5xl">
            Poll
          </span>
        </p>
        <div className="w-80 mx-auto">
          <label htmlFor="email">Enter your email...</label>
          <input
            className="py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transform transition hover:scale-110 duration-300 focus-visible::outline-none"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Send magic link"}</span>
          </button>
          <div className="my-8">
            <hr className="text-gray-400" />
            <div className="flex items-center justify-center -mt-3">
              <span className="uppercase text-center bg-gray-200 px-2 text-gray-600">
                Or
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                signInWithProvider("github");
              }}
              className="flex items-center justify-center gap-4 w-full bg-black px-4 py-2 text-white font-semibold rounded-lg shadow-md transform transition hover:scale-105 duration-300 focus-visible::outline-none"
            >
              <FiGithub className="w-5 h-5" />
              Sign In With Github
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                signInWithProvider("google");
              }}
              className="flex items-center justify-center gap-4 w-full bg-white px-4 py-2 text-gray-700 font-semibold rounded-lg shadow-md transform transition hover:scale-105 duration-300 focus-visible::outline-none"
            >
              <FcGoogle className="w-5 h-5" />
              Sign In With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
