import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [badge, setBadge] = useState("");
  const [images, setImages] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "Vehicles",
    "Hobbies",
    "Home & Living",
    "Business & Industry",
    "Property",
    "Women's Fashion & Beauty",
    "Men's Fashion & Grooming",
    "Essentials",
    "Education",
  ];

  const badges = ["NEW", "HOT", "DEAL"];

  // Handle image file selection
  async function handleImageUpload(e) {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      toast.error("No files selected");
      return;
    }

    setUploadingImages(true);

    try {
      const uploadedUrls = [];

      for (const file of files) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image file`);
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 5MB)`);
          continue;
        }

        // Generate unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `listings/${fileName}`;

        // Upload to Supabase Storage
        const { error } = await supabase.storage
          .from("advertisement-images")
          .upload(filePath, file);

        if (error) {
          console.error("Supabase upload error:", error);
          toast.error(`Failed to upload ${file.name}`);
          continue;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("advertisement-images")
          .getPublicUrl(filePath);

        if (publicUrlData) {
          uploadedUrls.push(publicUrlData.publicUrl);
        }
      }

      if (uploadedUrls.length > 0) {
        setImages([...images, ...uploadedUrls]);
        toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploadingImages(false);
    }
  }

  // Remove image from list
  function removeImage(index) {
    setImages(images.filter((_, i) => i !== index));
    toast.success("Image removed");
  }

  // Handle form submission
  async function handleCreateListing(e) {
    e.preventDefault();

    try {
      // Validate required fields
      if (
        !title.trim() ||
        !description.trim() ||
        !price ||
        !category ||
        !country.trim()
      ) {
        toast.error("All fields are required");
        return;
      }

      if (images.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }

      // Validate price is a positive number
      if (isNaN(price) || price <= 0) {
        toast.error("Price must be a positive number");
        return;
      }

      setLoading(true);

      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to create a listing");
        navigate("/login");
        return;
      }

      // Prepare listing data
      const listingData = {
        title: title.trim(),
        description: description.trim(),
        price: parseFloat(price),
        category,
        country: country.trim(),
        image: images, // Array of Supabase URLs
        urgent,
        badge: badge || null,
        currency: "LKR",
      };

      // Submit to backend
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/listings/create",
        listingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      toast.success("Listing created successfully!");
      console.log("Listing response:", response.data);

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setCountry("");
      setImages([]);
      setUrgent(false);
      setBadge("");

      // Redirect to home or listings page
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error creating listing:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to create listing. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Create New Listing
        </h1>

        <form onSubmit={handleCreateListing} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter listing title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter listing description"
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (LKR) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Urgent & Badge */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={urgent}
                  onChange={(e) => setUrgent(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Mark as Urgent
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Badge (Optional)
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select badge</option>
                {badges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-blue-500 transition">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImages}
                className="hidden"
                id="image-input"
              />
              <label htmlFor="image-input" className="cursor-pointer block">
                <div className="text-gray-600">
                  <p className="text-lg font-semibold mb-2">
                    {uploadingImages
                      ? "Uploading..."
                      : "Click to upload images"}
                  </p>
                  <p className="text-sm">
                    or drag and drop (PNG, JPG, GIF up to 5MB)
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Uploaded Images Preview */}
          {images.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Uploaded Images ({images.length})
              </label>
              <div className="grid grid-cols-2 gap-4">
                {images.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || uploadingImages}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md transition"
            >
              {loading ? "Creating Listing..." : "Create Listing"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-md transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
