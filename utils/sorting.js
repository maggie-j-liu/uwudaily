export const sortByDate = (arr) => {
  const sorted = [...arr].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
  });
  return sorted;
};

export const sortByUpvotes = (arr) => {
  const sorted = [...arr].sort((a, b) => {
    if (a.upvoted_by.length === b.upvoted_by.length) {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    }
    return b.upvoted_by.length - a.upvoted_by.length;
  });
  return sorted;
};
