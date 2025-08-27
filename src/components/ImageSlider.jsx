import React, { useState } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

const ImageSlider = ({ event }) => {
  const [cur, setCur] = useState(0);

  const imagesArray = React.useMemo(() => {
    try {
      return typeof event === "string" ? JSON.parse(event) : event;
    } catch (e) {
      console.error("Failed to parse cover_images:", e);
      return [];
    }
  }, [event]);


  const COVER_IMAGES = [
    "https://media.istockphoto.com/id/479977238/photo/table-setting-for-an-event-party-or-wedding-reception.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyvetnLOz5AF4JPJGxqw0EJpwpBHl9swwqww&s",
    "https://static.vecteezy.com/system/resources/thumbnails/041/388/388/small/ai-generated-concert-crowd-enjoying-live-music-event-photo.jpg",
    "https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_640.jpg",
  ];

  const length = imagesArray.length > 0 ? imagesArray.length : COVER_IMAGES.length;

  const nextSlide = () => setCur(cur === length - 1 ? 0 : cur + 1);
  const prevSlide = () => setCur(cur === 0 ? length - 1 : cur - 1);

  return (
    <div className="relative flex items-center justify-center w-full bg-gray-800 rounded-tl-md rounded-tr-md overflow-hidden shadow-lg">
      <FaArrowCircleLeft
        className="absolute left-4 text-white z-20 top-1/2 transform -translate-y-1/2 text-4xl hover:cursor-pointer hover:text-yellow-200 transition-colors duration-200"
        onClick={prevSlide}
      />
      <div className="w-full h-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${cur * 100}%)` }}
        >
          {(imagesArray.length > 0 ? imagesArray : COVER_IMAGES).map((imageSrc, index) => (
            <img
              key={index}
              src={imageSrc}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
      <FaArrowCircleRight
        className="absolute right-4 text-white z-20 top-1/2 transform -translate-y-1/2 text-4xl hover:cursor-pointer hover:text-yellow-200 transition-colors duration-200"
        onClick={nextSlide}
      />


      <div className="absolute bottom-4 z-20 flex space-x-2">
        {(imagesArray.length > 0 ? imagesArray : COVER_IMAGES).map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 cursor-pointer rounded-full border-2 ${index === cur ? "bg-white border-white" : "bg-gray-400 border-gray-300"
              } transition-colors duration-200`}
            onClick={() => setCur(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
