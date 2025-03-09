import React from "react";
import Link from "next/link";
import Footer from "@/components/common/Footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="relative h-[200px] bg-primary w-full">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <h1 className="text-4xl font-bold mb-4">Privacy Notice</h1>
          <p className="text-lg">Last updated February 19, 2025</p>
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
          <div className="space-y-4">
            {privacySections.map((section, index) => (
              <details
                key={index}
                className="border rounded-lg bg-white shadow-sm"
              >
                <summary className="px-4 py-3 cursor-pointer font-semibold bg-gray-50 hover:bg-gray-100">
                  {section.title}
                </summary>
                <div className="px-4 py-3">{section.content}</div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const privacySections = [
  {
    title: "1. WHAT INFORMATION DO WE COLLECT?",
    content: (
      <div>
        <h3 className="font-semibold mb-2">
          Personal information you disclose to us
        </h3>
        <p className="mb-4">
          <em>
            In Short: We collect personal information that you provide to us.
          </em>
        </p>
        <p>
          We collect personal information that you voluntarily provide to us
          when you register on the Services, express an interest in obtaining
          information about us or our products and Services, when you
          participate in activities on the Services, or otherwise when you
          contact us.
        </p>
        <p className="mt-4">
          Sensitive Information. We do not process sensitive information.
        </p>
        <h3 className="font-semibold mt-4 mb-2">
          Information automatically collected
        </h3>
        <p>
          <em>
            In Short: Some information — such as your Internet Protocol (IP)
            address and/or browser and device characteristics — is collected
            automatically when you visit our Services.
          </em>
        </p>
        <p className="mt-2">
          We automatically collect certain information when you visit, use, or
          navigate the Services. This information does not reveal your specific
          identity but may include device and usage information, such as your IP
          address, browser and device characteristics, operating system,
          language preferences, referring URLs, device name, country, location,
          information about how and when you use our Services, and other
          technical information.
        </p>
      </div>
    ),
  },
  {
    title: "2. HOW DO WE PROCESS YOUR INFORMATION?",
    content: (
      <div>
        <p className="mb-4">
          <em>
            In Short: We process your information to provide, improve, and
            administer our Services, communicate with you, for security and
            fraud prevention, and to comply with law.
          </em>
        </p>
        <p>
          We process your personal information for a variety of reasons,
          depending on how you interact with our Services, including:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>To facilitate account creation and authentication</li>
          <li>To deliver and facilitate delivery of services</li>
          <li>To respond to user inquiries/offer support</li>
          <li>To send administrative information</li>
          <li>To request feedback</li>
          <li>To send marketing and promotional communications</li>
          <li>To protect our Services</li>
          <li>To identify usage trends</li>
          <li>To determine the effectiveness of our marketing</li>
          <li>To save or protect an individual&apos;s vital interest</li>
        </ul>
      </div>
    ),
  },
  {
    title: "3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
    content: (
      <div>
        <p className="mb-4">
          <em>
            In Short: We may share information in specific situations described
            in this section and/or with specific third parties.
          </em>
        </p>
        <p>
          We may share your personal information in the following situations:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Business Transfers</li>
          <li>Affiliates</li>
          <li>Business Partners</li>
        </ul>
      </div>
    ),
  },
  {
    title: "4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
    content: (
      <div>
        <p className="mb-4">
          <em>
            In Short: We may use cookies and other tracking technologies to
            collect and store your information.
          </em>
        </p>
        <p>
          We may use cookies and similar tracking technologies to gather
          information when you interact with our Services. Some online tracking
          technologies help us maintain the security of our Services, prevent
          crashes, fix bugs, save your preferences, and assist with basic site
          functions.
        </p>
      </div>
    ),
  },
  {
    title: "5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?",
    content: (
      <div>
        <p className="mb-4">
          <em>
            In Short: If you choose to register or log in to our Services using
            a social media account, we may have access to certain information
            about you.
          </em>
        </p>
        <p>
          Our Services offer you the ability to register and log in using your
          third-party social media account details. Where you choose to do this,
          we will receive certain profile information about you from your social
          media provider.
        </p>
      </div>
    ),
  },
  {
    title: "6. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?",
    content: (
      <div>
        <p className="mb-4">
          <em>
            In Short: We may transfer, store, and process your information in
            countries other than your own.
          </em>
        </p>
        <p>
          Our servers are located in various countries. If you are accessing our
          Services from outside, please be aware that your information may be
          transferred to, stored, and processed by us in our facilities and by
          those third parties with whom we may share your personal information.
        </p>
      </div>
    ),
  },
  {
    title: "7. HOW LONG DO WE KEEP YOUR INFORMATION?",
    content: (
      <div>
        <p className="mb-4">
          <em>
            In Short: We keep your information for as long as necessary to
            fulfill the purposes outlined in this Privacy Notice unless
            otherwise required by law.
          </em>
        </p>
        <p>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this Privacy Notice, unless a
          longer retention period is required or permitted by law.
        </p>
      </div>
    ),
  },
  {
    title: "8. DO WE COLLECT INFORMATION FROM MINORS?",
    content: (
      <div>
        <p className="mb-4">
          <em>
            In Short: We do not knowingly collect data from or market to
            children under 18 years of age.
          </em>
        </p>
        <p>
          We do not knowingly collect, solicit data from, or market to children
          under 18 years of age. By using the Services, you represent that you
          are at least 18 or that you are the parent or guardian of such a minor
          and consent to such minor dependent&apos;s use of the Services.
        </p>
      </div>
    ),
  },
  {
    title: "9. WHAT ARE YOUR PRIVACY RIGHTS?",
    content: (
      <div>
        <p className="mb-4">
          <em>
            In Short: You may review, change, or terminate your account at any
            time.
          </em>
        </p>
        <p>
          Withdrawing your consent: If we are relying on your consent to process
          your personal information, you have the right to withdraw your consent
          at any time. You can withdraw your consent by contacting us.
        </p>
      </div>
    ),
  },
  {
    title: "10. CONTROLS FOR DO-NOT-TRACK FEATURES",
    content: (
      <div>
        <p>
          Most web browsers and some mobile operating systems include a
          Do-Not-Track (&quot;DNT&quot;) feature or setting. At this stage, no
          uniform technology standard for recognizing and implementing DNT
          signals has been finalized.
        </p>
      </div>
    ),
  },
  {
    title: "11. DO WE MAKE UPDATES TO THIS NOTICE?",
    content: (
      <div>
        <p className="mb-4">
          <em>
            In Short: Yes, we will update this notice as necessary to stay
            compliant with relevant laws.
          </em>
        </p>
        <p>
          We may update this Privacy Notice from time to time. The updated
          version will be indicated by an updated &quot;Revised&quot; date at
          the top of this Privacy Notice.
        </p>
      </div>
    ),
  },
  {
    title: "12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
    content: (
      <div>
        <p>
          If you have questions or comments about this notice, you may email us
          at info@voyagevibes.life
        </p>
      </div>
    ),
  },
  {
    title:
      "13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?",
    content: (
      <div>
        <p>
          Based on the applicable laws of your country, you may have the right
          to request access to the personal information we collect from you,
          change that information, or delete it. To request to review, update,
          or delete your personal information, please fill out and submit a data
          subject access request.
        </p>
      </div>
    ),
  },
];

export default PrivacyPage;
