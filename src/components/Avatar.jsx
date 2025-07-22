import React from "react";

const Avatar = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "1px solid #ccc",
      }}
    />
  );
};

export default Avatar;
