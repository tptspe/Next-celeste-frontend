import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

const images = [
  
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/"
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/"
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/"
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/"
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/"
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/"
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/"
  }
];

const not_yet_image = "/images/no-not-yet.png";

const ProfileGallery = (props) => {
  const {dataSet} = props;
  const [slideImages, setSlideImages] = useState(dataSet);
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    initImages()
  },[]);
  
  let initImages=()=>{
    console.log(slideImages);
    slideImages.map((item, i ) => {
      setImages(images => [...images,{original:item.image, thumbnail:item.image}]);
  
    })    
    console.log(images);
    if(slideImages.length == 0){
       setImages(images => [...images,{original:not_yet_image, thumbnail:not_yet_image}]);
      console.log("blank images", images)
    }
  }
  console.log(images);
  return (
    <ImageGallery
      showPlayButton={false}
      showFullscreenButton={false}
      items={images}
      showIndex={true}
    />
  );
};
export default ProfileGallery;
