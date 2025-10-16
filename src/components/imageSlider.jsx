import { useState } from "react";
export default function ImageSlider(props) {
  const I = props.images;
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="w-[90%] md:w-[500px] h-[600px]  bg-amber-50  ">
      <img
        src={I[currentIndex]}
        className="w-full h-[500px] object-cover rounded-3xl"
      />
      <div className="w-full h-[100px] bg-slate-300 flex justify-center items-center">
        {I?.map((image, index) => {
          return (
            <img
              key={index}
              className={
                "w-[90px] h-[90px] mx-2 rounded-2xl object-cover cursor-pointer hover:border-4 hover:border-blue-900" +
                (index == currentIndex && "border-accent border-4")
              }
              src={image}
              onClick={() => setCurrentIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
