const { createContext, useState, useContext } = require("react");

const EmojiContext = createContext({ emoji: null, setEmoji: () => {} });

export const EmojiProvider = ({ children }) => {
  const [emoji, setEmoji] = useState(null);
  return (
    <EmojiContext.Provider value={{ emoji, setEmoji }}>
      {children}
    </EmojiContext.Provider>
  );
};

const useEmoji = () => useContext(EmojiContext);

export default useEmoji;
