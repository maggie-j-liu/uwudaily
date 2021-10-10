import useEmoji from "utils/useEmoji";
import AnimatedEmoji from "./AnimatedEmoji";
import { useEffect } from "react";
const EmojiAnimation = () => {
  const { emoji, setEmoji } = useEmoji();
  useEffect(() => {
    if (emoji !== null) {
      const timer = setTimeout(() => {
        setEmoji(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [emoji]);
  return (
    <>
      {emoji !== null &&
        [...Array(50)].map((_, i) => <AnimatedEmoji emoji={emoji} key={i} />)}
    </>
  );
};

export default EmojiAnimation;
