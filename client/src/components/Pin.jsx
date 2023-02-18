import React from "react";
import { urlFor } from "../client";

const Pin = ({ pin: { image, postedBy, _id } }) => {
  return (
    <div>
      Image
      <img
        className="rounded-lg w-full"
        alt="user-post"
        src={urlFor(image?.asset?.url).width(250).url()}
      />
    </div>
  );
};

export default Pin;
