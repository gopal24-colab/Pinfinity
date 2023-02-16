export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  /**Try to get a document of type 'user' and _id == userId */
  return query;
};
