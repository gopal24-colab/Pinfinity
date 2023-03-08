export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  /**Try to get a document of type 'user' and _id == userId */
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image,
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

// ${}* each one of this search terms after the closing bracket means that the search term even before you actually finish it

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc) {
  image{
      asset ->{url}
    },
    _id,
    destination,
    postedBy ->{
      _id,
      userName,
      image,
    },
    save[]{
      _key,
      postedBy ->{
        _id,
        userName,
        image
      },
    },
}`;
