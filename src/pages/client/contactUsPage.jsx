import { Phone, Mail, MapPin } from "lucide-react";

const ContactUsPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-700 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto">
            Reach out to our team — we're always happy to help!
          </p>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-gray-700 text-white p-3 rounded-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p className="text-gray-600">+94 789107363</p>
                  <p className="text-gray-600">Mon - Fri | 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-gray-700 text-white p-3 rounded-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-gray-600">contactcbc@gmail.com</p>
                  <p className="text-gray-600">supportcbc@gmail.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="bg-gray-700 text-white p-3 rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Address</h3>
                  <p className="text-gray-600">123 Business Street</p>
                  <p className="text-gray-600">Colombo Road, Malabe</p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Office Hours
              </h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="flex flex-col justify-center items-center bg-gray-200 p-6 rounded-lg h-full shadow-md">
            <MapPin className="w-16 h-16 text-gray-500 mb-4" />
            <p className="text-gray-700 text-center text-lg mb-2">
              123 Business Street, Colombo Road, Malabe
            </p>
            <p className="text-sm text-gray-500">Interactive Map Coming Soon</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
