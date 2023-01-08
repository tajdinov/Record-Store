import React, { Fragment, useState } from "react";
import R1 from "./assets/R1.jpeg";
import R2 from "./assets/R2.jpeg";
import R3 from "./assets/R3.jpeg";
import R4 from "./assets/R4.jpeg";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";

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

  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className=" w-full h-full flex flex-wrap p-4 justify-center ">
        {images.map((image) => (
          <div onClick={openModal}>
            <img
              src={image.image}
              alt={image.id}
              className=" w-[400px]  m-4 cursor-pointer"
              key={image.id}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
