import { Phone, Mail, MapPin, Send } from "lucide-react";
export default function HomeUsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10">
      {/* Hero Section */}
      <section className="text-center mb-16 bg-gradient-to-r from-gray-700 to-gray-800 text-white py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to CBC</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Your one-stop destination for handcrafted custom clothing blending
          tradition and trend.
        </p>
      </section>
      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <div className="border rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🎨 Custom Designs</h3>
          <p>
            Create your own look with our wide range of custom tailoring
            options.
          </p>
        </div>
        <div className="border rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📐 Personalized Fit</h3>
          <p>We make clothes that fit you perfectly using your measurements.</p>
        </div>
        <div className="border rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">⏱ Fast Delivery</h3>
          <p>
            Get your outfits delivered quickly and reliably to your doorstep.
          </p>
        </div>
      </section>
      {/* About Short Section */}
      <section className="text-center bg-gray-100 p-10 rounded-2xl mb-20">
        <h2 className="text-3xl font-bold mb-4">About CBC</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Founded in 2024, CBC aims to merge creativity and comfort with
          fashion. We offer a seamless experience from design to delivery with
          real-time customization and top-notch support.
        </p>
      </section>
      {/* Contact Section */}
      <section className="bg-white rounded-2xl p-6 border shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Get in Touch</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Phone className="text-blue-600" />
            <span>+94 77 123 4567</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-blue-600" />
            <span>support@cbcclothing.com</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-blue-600" />
            <span>Colombo, Sri Lanka</span>
          </div>
          <div className="flex items-center gap-3">
            <Send className="text-blue-600" />
            <span>Live Chat Available 24/7</span>
          </div>
        </div>
      </section>
    </div>
  );
}
