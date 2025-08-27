import { Shirt, Paintbrush, Ruler, Truck, Smile } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          About Us
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Welcome to <span className="font-semibold text-indigo-600">CBC</span>{" "}
          — your one-stop destination for custom-designed clothing. We
          specialize in high-quality, handcrafted outfits that beautifully blend
          tradition with modern trends.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-4xl text-center">
        <p className="text-base leading-7 text-gray-700">
          Founded in <span className="font-medium text-indigo-600">2024</span>,
          our mission is to bridge the gap between
          <span className="font-semibold"> creativity </span> and{" "}
          <span className="font-semibold"> comfort</span>. Whether you're
          looking for elegant traditional wear or sleek modern styles, we bring
          your fashion vision to life.
        </p>
        <p className="mt-4 text-base leading-7 text-gray-700">
          Our passionate team of designers, skilled tailors, and trendsetters
          works hard to ensure that every outfit reflects your unique identity.
          From real-time customization to doorstep delivery, we focus on making
          your experience smooth, stylish, and satisfying.
        </p>
      </div>

      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Why Choose CBC?
        </h2>
        <ul className="space-y-6">
          <li className="flex items-start space-x-4">
            <Shirt className="h-6 w-6 text-indigo-600 mt-1" />
            <span className="text-gray-800">
              <strong>100% Handcrafted Quality:</strong> Every piece is made
              with precision and love.
            </span>
          </li>
          <li className="flex items-start space-x-4">
            <Ruler className="h-6 w-6 text-indigo-600 mt-1" />
            <span className="text-gray-800">
              <strong>Personalized Measurements:</strong> Tailored to your
              unique fit and comfort.
            </span>
          </li>
          <li className="flex items-start space-x-4">
            <Paintbrush className="h-6 w-6 text-indigo-600 mt-1" />
            <span className="text-gray-800">
              <strong>Custom Designs Available:</strong> Express yourself with
              original styles.
            </span>
          </li>
          <li className="flex items-start space-x-4">
            <Truck className="h-6 w-6 text-indigo-600 mt-1" />
            <span className="text-gray-800">
              <strong>Fast Delivery & Easy Returns:</strong> Get your order on
              time with no stress.
            </span>
          </li>
          <li className="flex items-start space-x-4">
            <Smile className="h-6 w-6 text-indigo-600 mt-1" />
            <span className="text-gray-800">
              <strong>Friendly Customer Support:</strong> We're here to help —
              anytime you need us.
            </span>
          </li>
        </ul>
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center">
        <p className="text-lg font-medium text-gray-700">
          Thank you for being a part of our journey. Let's craft something
          beautiful together! 🎉
        </p>
      </div>
    </div>
  );
}
