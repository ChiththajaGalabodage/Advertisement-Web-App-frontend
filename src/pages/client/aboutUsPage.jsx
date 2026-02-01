import React from "react";
import { useNavigate } from "react-router-dom";
import { Megaphone, Users, ShieldCheck, Zap, ArrowRight } from "lucide-react";

const AboutUsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About AdListing
          </h1>
          <p className="text-xl opacity-90 leading-relaxed">
            Connecting people and opportunities through a seamless, modern
            advertisement experience.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              At AdListing, we believe that finding what you need and reaching
              your target audience should be effortless. We are a dynamic
              digital marketplace designed to bridge the gap between sellers and
              motivated buyers.
            </p>
            <p className="text-gray-600 text-lg">
              Whether you are looking to sell products, promote professional
              services, or find your next home, our platform provides the tools
              to make it happen securely and efficiently.
            </p>
          </div>
          <div className="bg-blue-100 p-8 rounded-2xl flex justify-center">
            {/* Simple Illustration Placeholder */}
            <Megaphone size={120} className="text-blue-600" />
          </div>
        </div>

        {/* Feature Grid */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Why Choose AdListing?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
              <Zap className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Built for Speed</h3>
            <p className="text-gray-500">
              Powered by the MERN stack for high performance and rapid response
              times.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="inline-block p-4 bg-green-50 rounded-full mb-4">
              <ShieldCheck className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Trading</h3>
            <p className="text-gray-500">
              Integrated authentication and listing moderation to keep our
              community safe.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="inline-block p-4 bg-purple-50 rounded-full mb-4">
              <Users className="text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">User Centric</h3>
            <p className="text-gray-500">
              A mobile-friendly experence allowing you to manage ads anywhere,
              anytime.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-gray-900 rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to grow your reach?</h2>
          <p className="mb-8 opacity-80">
            Join thousands of users and start posting your advertisements today.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-colors"
          >
            Get Started Now <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
