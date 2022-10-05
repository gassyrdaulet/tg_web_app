import React from "react";

export default function ({ data }) {
  return (
    <div>
      {data.map((price, index) => (
        <div key={price.id}>
          {price.suk} {price.model}
        </div>
      ))}
    </div>
  );
}
