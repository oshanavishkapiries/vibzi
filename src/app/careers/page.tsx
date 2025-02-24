import React from "react";
import Link from "next/link";
import Footer from "@/components/common/Footer";

const CareersPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="relative h-[200px] bg-primary w-full">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <h1 className="text-4xl font-bold mb-4">Career Openings</h1>
          <p className="text-lg">Join Our Team</p>
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
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-8">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h2 className="text-2xl font-semibold mb-4">
                No Current Vacancies
              </h2>
              <p className="text-gray-600 mb-6">
                We currently don&apos;t have any vacancies! However, if you would still
                like to send in your CV, we&apos;d love to keep it on file for future
                opportunities.
              </p>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Send your CV to:{" "}
                  <a
                    href="mailto:info@voyagevibes.life"
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    info@voyagevibes.life
                  </a>
                </p>
                <p className="text-sm text-gray-500">
                  We&apos;ll review your application and reach out if a suitable
                  position becomes available.
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Why Join Us?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="text-primary mb-2">{benefit.icon}</div>
                    <h4 className="font-medium mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const benefits = [
  {
    icon: "🚀",
    title: "Growth Opportunities",
    description: "Continuous learning and career development possibilities",
  },
  {
    icon: "🤝",
    title: "Great Culture",
    description: "Collaborative and innovative work environment",
  },
  {
    icon: "💪",
    title: "Work-Life Balance",
    description: "Flexible working hours and remote work options",
  },
];

export default CareersPage;