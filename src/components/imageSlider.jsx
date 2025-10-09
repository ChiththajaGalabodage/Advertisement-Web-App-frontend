export default function ImageSlider(props) {
  const image = props.image;
  return (
    <div className="w-[90%] md:w-[500px] h-[600px]  bg-amber-50  ">
      <img className="w-full h-[500px]" />
      <div className="w-full h-[100px] bg-slate-300 flex justify-center items-center">
        {image?.map((image, index) => {
          return (
            <img key={index} className="w-[90px] h-[90px] mx-2" src={image} />
          );
        })}
      </div>
    </div>
  );
}
