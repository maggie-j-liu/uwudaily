import "../styles/globals.css";
import "emoji-mart/css/emoji-mart.css";
import "easymde/dist/easymde.min.css";
import { AuthProvider } from "utils/useAuth";
import Navbar from "components/Navbar";
import { EmojiProvider } from "utils/useEmoji";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <EmojiProvider>
        <Navbar />
        <Component {...pageProps} />
      </EmojiProvider>
    </AuthProvider>
  );
}

export default MyApp;
