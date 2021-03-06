import { useState, useEffect } from "react";
import useAuth from "utils/useAuth";
import { supabase } from "utils/supabaseClient";

export default function Account() {
  const { user, session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        const user = supabase.auth.user();

        let { data, error, status } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }
        if (data) {
          setUsername(data.username);
        } else if (user.user_metadata.full_name) {
          const usernameFromName =
            user.user_metadata.full_name +
            Math.floor(Math.random() * (10000 - 1000) + 1000);
          await updateProfile({
            username: usernameFromName,
          });
          setUsername(usernameFromName);
        } else {
          const usernameFromEmail =
            user.email.split("@")[0] +
            Math.floor(Math.random() * (10000 - 1000) + 1000);
          await updateProfile({
            username: usernameFromEmail,
          });
          setUsername(usernameFromEmail);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, [session]);

  async function updateProfile({ username }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });
      if (error) {
        throw error;
      }

      let { error: authError } = await supabase.auth.update({
        data: {
          ...user.user_metadata,
          username: username,
        },
      });
      if (authError) {
        throw authError;
      }
    } catch (error) {
      if (error.code === "23505") {
        alert("This username has already been taken.");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-8 sm:px-16">
      <div className="max-w-xs mx-auto">
        <h1 className="text-center text-4xl font-semibold">Update Profile</h1>
        <div className="grid grid-rows-2 sm:text-xl items-center mt-6">
          <label htmlFor="username" className="row-start-1">
            Name
          </label>
          <input
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="row-start-1 input sm:text-xl rounded-lg"
          />
          <label htmlFor="email" className="row-start-2 mt-4">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={user.email}
            disabled
            className="row-start-2 mt-4 input sm:text-xl rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div className="mt-6">
          <button
            className="px-4 py-2 w-full bg-blue-500 text-white font-semibold rounded-lg shadow-md focus:outline-none disabled:cursor-not-allowed disabled:saturate-50"
            onClick={() => updateProfile({ username })}
            disabled={loading || !username || username.length < 3}
          >
            {loading ? "Loading ..." : "Update"}
          </button>

          <button
            className="px-4 py-2 mt-3 w-full bg-red-500 text-white font-semibold rounded-lg shadow-md focus:outline-none"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
