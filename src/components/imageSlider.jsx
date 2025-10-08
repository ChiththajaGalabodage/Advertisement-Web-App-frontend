export default function ImageSlider(props) {
  const images = props.images;
  return (
    <div className="w-[90%] md:w-[500px] h-[600px]  bg-amber-50  ">
      <img className="w-full h-[500px]" />
      <div className="w-full h-[100px] bg-slate-300 flex justify-center items-center">
        {images?.map((images, index) => {
          return (
            <img key={index} className="w-[80px] h-[80px] mx-2" src={images} />
          );
        })}
      </div>
    </div>
  );
}
