import React, { useState } from "react";
import R1 from "./assets/R1.jpeg";
import R2 from "./assets/R2.jpeg";
import R3 from "./assets/R3.jpeg";
import R4 from "./assets/R4.jpeg";

const Gallery = () => {
  const [images, setImages] = useState([
    {
      image: R1,
      id: 1,
    },
    {
      image: R2,
      id: 2,
    },
    {
      image: R3,
      id: 3,
    },
    {
      image: R4,
      id: 4,
    },
  ]);

  return (
    <>
      <div className=" w-full h-full flex flex-wrap p-4 justify-center ">
        {images.map((image) => (
          <div>
            <img
              src={image.image}
              alt={image.id}
              className=" md:w-[400px]  m-4 cursor-pointer"
              key={image.id}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
