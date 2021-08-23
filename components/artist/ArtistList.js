import React, { useState, useEffect } from "react";
import Link from "next/link";

const file_data = [
  "user4.jpg",
  "user5.png",
  "user9.jpg",
  "makeup_1.jpg",
  "makeup_3.png",
  "lowerRight.png",
  "user4.jpg",
  "user5.png",
  "user9.jpg",
  "makeup_1.jpg",
  "makeup_3.png",
  "lowerRight.png"
];

const ArtistList = () => {
  const [images, setImages] = useState(file_data);

  return (
    <div className="card_body">
      {Array.from(images).map((item, i) => (
        <div key={i} className={`card ${i} col-lg-2 col-md-4 col-6`}>
          {/* {item } */}
          <div className="image">
            <div className="image_cover">
              <img src={`/images/${item}`} />
            </div>
          </div>

          <span className="bookmark">
            <i className="far fa-bookmark"></i>
          </span>
          <span className="title">
            BRIDAL <b>&#183;</b> COSTUME
          </span>

          <span className="name">
            Mylah Morales&nbsp;
            <i className="fas fa-calendar-check"></i>
          </span>

          <span className="location">
            <i className="far fa-paper-plane"></i>&nbsp; brooklyn, NY
          </span>

          <span className="appointment">160 appointment, $$</span>
        </div>
      ))}
    </div>
  );
};
export default ArtistList;
