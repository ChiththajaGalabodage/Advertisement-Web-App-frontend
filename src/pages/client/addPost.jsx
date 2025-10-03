import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddPostPage() {
  const [listingId, setListingId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("LKR");
  const [Images, setImage] = useState([]);
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [badge, setBadge] = useState("");

  const navigate = useNavigate();

  async function AddPost() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (Images.length <= 0) {
      toast.error("Please select at least one image");
      return;
    }

    try {
      // Upload images
      const promisesArray = [];
      for (let i = 0; i < Images.length; i++) {
        promisesArray[i] = mediaUpload(Images[i]);
      }
      const imageUrls = await Promise.all(promisesArray);

      const listing = {
        listingId,
        title,
        description,
        price,
        currency,
        image: imageUrls, // array of URLs
        country,
        category,
        featured,
        urgent,
        badge,
      };

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/listings",
        listing
      );

      toast.success("Listing added successfully!");
      navigate("/client/listings");
    } catch (e) {
      console.error(e);
      toast.error("Error saving listing");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8 ">
      <h2 className="text-2xl font-bold mb-4">Add New Listing</h2>
      <div className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          required
        ></textarea>

        {/* Price */}
        <div className="flex gap-2">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-1/2 border p-2 rounded"
            required
          />
          <input
            type="text"
            name="currency"
            placeholder="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-1/2 border p-2 rounded"
          />
        </div>

        {/* Image URL */}
        <input
          type="file"
          name="Image"
          placeholder="Images"
          multiple
          onChange={(e) => setImage(e.target.files)}
          className="w-full border p-2 rounded"
        />

        {/* Country */}
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Vehicles, Electronics)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* Options */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="urgent"
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
            />
            Urgent
          </label>
        </div>

        {/* Badge */}
        <input
          type="text"
          name="badge"
          placeholder="Badge (e.g., NEW, HOT, DEAL)"
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-2 rounded hover:bg-blue-700"
          onClick={AddPost}
        >
          Add Listing
        </button>
      </div>
    </div>
  );
}
