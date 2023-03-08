import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../utils/data";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      // if categoryId exists then we give only that category
      const query = searchQuery(categoryId);
      client
        .fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(`Error fetching category: ${error}`);
        });
    } else {
      // if categoryId does not exist then we give all categories
      client
        .fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(`Error fetching category: ${error}`);
        });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are adding a new ideas to your feed !" />;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
