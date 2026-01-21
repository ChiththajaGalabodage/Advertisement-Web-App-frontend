import React from "react";
import { Check, X, ArrowRight } from "lucide-react";

const PricingPlan = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        { name: "Up to 5 listings", included: true },
        { name: "Basic listing analytics", included: true },
        { name: "Limited featured listings", included: false },
        { name: "Priority support", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Custom branding", included: false },
      ],
      cta: "Get Started",
      ctaStyle: "bg-gray-200 hover:bg-gray-300 text-gray-800",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$9.99",
      period: "/month",
      description: "For active sellers and businesses",
      features: [
        { name: "Up to 50 listings", included: true },
        { name: "Basic listing analytics", included: true },
        { name: "Limited featured listings", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced analytics", included: false },
        { name: "Custom branding", included: false },
      ],
      cta: "Start Free Trial",
      ctaStyle: "bg-blue-600 hover:bg-blue-700 text-white",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "/month",
      description: "For high-volume sellers",
      features: [
        { name: "Unlimited listings", included: true },
        { name: "Basic listing analytics", included: true },
        { name: "Limited featured listings", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Custom branding", included: true },
      ],
      cta: "Contact Sales",
      ctaStyle: "bg-gray-800 hover:bg-gray-900 text-white",
      highlighted: false,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      {/* Hero Section */}
      <section className="text-center mb-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your advertising needs. Scale as you grow.
        </p>
      </section>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl transition-all ${
                plan.highlighted
                  ? "bg-white shadow-2xl ring-2 ring-blue-600 scale-105"
                  : "bg-white shadow-lg hover:shadow-xl"
              }`}
            >
              {plan.highlighted && (
                <div className="bg-blue-600 text-white text-center py-2 px-4 rounded-t-2xl font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                {/* Plan Name */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h2>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold mb-8 inline-flex items-center justify-center transition-colors ${plan.ctaStyle}`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2" size={18} />
                </button>

                {/* Features List */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check
                          className="text-green-500 mr-3 flex-shrink-0"
                          size={20}
                        />
                      ) : (
                        <X
                          className="text-gray-300 mr-3 flex-shrink-0"
                          size={20}
                        />
                      )}
                      <span
                        className={
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I change my plan anytime?
            </h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes
              will be reflected in your next billing cycle.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Is there a free trial?
            </h3>
            <p className="text-gray-600">
              Professional and Enterprise plans come with a 14-day free trial.
              No credit card required to start.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600">
              We accept all major credit cards, PayPal, and bank transfers for
              Enterprise customers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Do you offer discounts for annual billing?
            </h3>
            <p className="text-gray-600">
              Yes! Choose annual billing and save 20% on Professional and
              Enterprise plans.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 mt-20 bg-blue-600 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg opacity-90 mb-6">
          Join thousands of successful advertisers on AdListing today.
        </p>
        <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg inline-flex items-center transition-colors">
          Start Your Free Account
          <ArrowRight className="ml-2" size={20} />
        </button>
      </section>
    </div>
  );
};

export default PricingPlan;
