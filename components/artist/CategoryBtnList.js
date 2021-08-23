import React, { useState, useEffect } from "react";
import Link from "next/link";

const data = [
  { id: 1, name: "Wedding", image: "user4.jpg" },
  { id: 4, name: "Prom", image: "user5.png" },
  { id: 8, name: "Lessons", image: "user9.jpg" },
  { id: 2, name: "PhotoShoot", image: "makeup_1.jpg" },
  { id: 9, name: "Natural look", image: "makeup_3.png" }
];

const CategoryButtonList = props => {
//   console.log(props);
  return (
    <div className="category_list row col-sm-12">
      {Array.from(data).map((item, i) => (
        <Link href={`/search/category/${item.id}`} key={i}>
          <div className="button col-md-4 col-lg-2">
            <button className="btn btn-light btn-block">
              <img
                src={`/images/${item.image}`}
                width="40px"
                height="40px"
              ></img>
              {item.name}
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryButtonList;
