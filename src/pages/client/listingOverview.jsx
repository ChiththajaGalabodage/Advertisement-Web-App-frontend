import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

export default function ListingOverviewPage() {
  const { listingId } = useParams();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [listings, setListings] = useState();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/listings/" + listingId)
      .then((response) => {
        console.log(response.data);
        setListings(response.data);
        setStatus("success");
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
        toast.error("Failed to fetch listing details");
      });
  }, []);

  return (
    <>
      {status == "success" && (
        <div className="w-full h-full flex">
          <div className="w-[50%] bg-red-900 h-full flex justify-center items-center">
            <ImageSlider images={listings.image} />
          </div>
          <div className="w-[50%] bg-blue-900 h-full"></div>
        </div>
      )}
      {status == "loading" && <Loading />}
    </>
  );
}
