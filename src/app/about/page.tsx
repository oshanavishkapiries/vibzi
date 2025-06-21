import React from "react";
import Link from "next/link";
import Footer from "@/components/common/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="relative h-[200px] bg-primary w-full">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg">Discover Our Story</p>
        </div>
        <Link
          href="/"
          className="absolute top-4 left-4 flex items-center text-white z-20 hover:text-gray-200 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <section className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  Discover Vibzi: Your Ultimate Travel Planning Companion
                </h2>
                <p className="text-gray-600">
                  At Voyage Vibes, we&apos;re passionate about revolutionizing
                  the way people explore the world. Our first innovative
                  product, Vibzi, is designed to make travel planning seamless,
                  enjoyable, and tailored to your unique needs.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">What is Vibzi?</h2>
                <p className="text-gray-600">
                  Vibzi is your personal travel planner, created to help
                  travelers uncover the best experiences and restaurants around
                  their destinations. Whether you&apos;re an adventurer, a
                  foodie, or someone seeking hidden gems, Vibzi ensures your
                  travels are filled with memorable moments.
                </p>
                <p className="text-gray-600">
                  With our Minimum Viable Product (MVP), Vibzi is already making
                  waves by simplifying the search for quality travel
                  experiences. But this is just the beginning of our journey!
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">What We Offer</h2>
                <div className="grid md:grid-cols-3 gap-6 mt-4">
                  <div className="text-center p-4 border rounded-lg">
                    <h3 className="text-xl font-medium mb-2">
                      Curated Experiences
                    </h3>
                    <p className="text-gray-600">
                      Top-rated experiences and dining options near your
                      destination.
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h3 className="text-xl font-medium mb-2">
                      Viator Partnership
                    </h3>
                    <p className="text-gray-600">
                      Access to trusted tours and activities at competitive
                      prices.
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h3 className="text-xl font-medium mb-2">
                      Smart Recommendations
                    </h3>
                    <p className="text-gray-600">
                      Personalized suggestions based on your preferences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  Our Vision for the Future
                </h2>
                <p className="text-gray-600">
                  At Vibzi, we believe that travel should be as unique as the
                  traveler. That&apos;s why we are committed to a
                  customer-centric approach for future development.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">
                    What&apos;s Next for Vibzi:
                  </h3>
                  <ul className="space-y-3">
                    {futureFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  Join Us on This Adventure
                </h2>
                <p className="text-gray-600">
                  Vibzi is more than a travel planner—it&apos;s your partner in
                  creating unforgettable travel stories. Whether you&apos;re
                  planning your next trip or dreaming about one, Vibzi is here
                  to make it extraordinary.
                </p>
                <p className="text-gray-600">
                  Stay tuned as we continue to evolve and expand, bringing you
                  the future of travel, one feature at a time.
                </p>
                <p className="font-medium text-primary text-center text-lg mt-6">
                  Start your journey with Vibzi today!
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const futureFeatures = [
  "Enhanced Features: Itinerary builders, real-time updates, and social features",
  "Expanded Coverage: Growing beyond Asia-Pacific to global destinations",
  "Better Deals: New partnerships and exclusive offers",
  "Seamless Technology: Continuous enhancement of performance and personalization",
];

export default AboutPage;
