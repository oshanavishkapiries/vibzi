import React from "react";
import Link from "next/link";
import Footer from "@/components/common/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="relative h-[200px] bg-primary w-full">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <h1 className="text-4xl font-bold mb-4">&quot;Terms and Conditions&quot;</h1>
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
          <div className="mb-8">
            <p className="mb-4">
              We are Voyage Vibes (PVT) LTD (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;). We operate
              the website https://vibzi.co (the &quot;Site&quot;), the mobile application Vibzi
              (the &quot;App&quot;), as well as any other related products and services that
              refer or link to these legal terms (the &quot;Legal Terms&quot;) (collectively,
              the &quot;Services&quot;).
            </p>
            <p className="mb-4">
              You can contact us by phone at (+94)719181154, email at
              info@voyagevibes.life
            </p>
          </div>

          <div className="space-y-4">
            {termsSections.map((section, index) => (
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

const termsSections = [
  {
    title: "1. OUR SERVICES",
    content: (
      <div>
        <p className="mb-4">
          The information provided when using the Services is not intended for
          distribution to or use by any person or entity in any jurisdiction or
          country where such distribution or use would be contrary to law or
          regulation or which would subject us to any registration requirement
          within such jurisdiction or country.
        </p>
        <p>
          The Services are not tailored to comply with industry-specific regulations
          (Health Insurance Portability and Accountability Act (HIPAA), Federal
          Information Security Management Act (FISMA), etc.), so if your
          interactions would be subjected to such laws, you may not use the
          Services. You may not use the Services in a way that would violate the
          Gramm-Leach-Bliley Act (GLBA).
        </p>
      </div>
    ),
  },
  {
    title: "2. INTELLECTUAL PROPERTY RIGHTS",
    content: (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Our intellectual property</h3>
          <p>
            We are the owner or the licensee of all intellectual property rights in
            our Services, including all source code, databases, functionality,
            software, website designs, audio, video, text, photographs, and
            graphics in the Services (collectively, the &quot;Content&quot;), as well as the
            trademarks, service marks, and logos contained therein (the &quot;Marks&quot;).
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Your use of our Services</h3>
          <p>
            Subject to your compliance with these Legal Terms, including the
            &quot;PROHIBITED ACTIVITIES&quot; section below, we grant you a non-exclusive,
            non-transferable, revocable license to:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>access the Services; and</li>
            <li>
              download or print a copy of any portion of the Content to which you
              have properly gained access
            </li>
          </ul>
          <p className="mt-2">solely for your personal, non-commercial use.</p>
        </div>
      </div>
    ),
  },
  {
    title: "3. USER REPRESENTATIONS",
    content: (
      <div>
        <p className="mb-4">
          By using the Services, you represent and warrant that: (1) all
          registration information you submit will be true, accurate, current, and
          complete; (2) you will maintain the accuracy of such information and
          promptly update such registration information as necessary; (3) you have
          the legal capacity and you agree to comply with these Legal Terms; (4)
          you are not under the age of 13; (5) you are not a minor in the
          jurisdiction in which you reside, or if a minor, you have received
          parental permission to use the Services; (6) you will not access the
          Services through automated or non-human means, whether through a bot,
          script or otherwise; (7) you will not use the Services for any illegal or
          unauthorized purpose; and (8) your use of the Services will not violate
          any applicable law or regulation.
        </p>
      </div>
    ),
  },
  {
    title: "4. USER REGISTRATION",
    content: (
      <div>
        <p>
          You may be required to register to use the Services. You agree to keep
          your password confidential and will be responsible for all use of your
          account and password. We reserve the right to remove, reclaim, or change
          a username you select if we determine, in our sole discretion, that such
          username is inappropriate, obscene, or otherwise objectionable.
        </p>
      </div>
    ),
  },
  {
    title: "5. PROHIBITED ACTIVITIES",
    content: (
      <div>
        <p className="mb-4">
          You may not access or use the Services for any purpose other than that
          for which we make the Services available. The Services may not be used in
          connection with any commercial endeavors except those that are
          specifically endorsed or approved by us.
        </p>
        <p>As a user of the Services, you agree not to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>
            Systematically retrieve data or other content from the Services to
            create or compile, directly or indirectly, a collection, compilation,
            database, or directory without written permission from us.
          </li>
          <li>
            Trick, defraud, or mislead us and other users, especially in any
            attempt to learn sensitive account information such as user passwords.
          </li>
          {/* Add more prohibited activities as needed */}
        </ul>
      </div>
    ),
  },
  {
    title: "6. USER GENERATED CONTRIBUTIONS",
    content: (
      <div>
        <p className="mb-4">
          The Services may invite you to chat, contribute to, or participate in blogs,
          message boards, online forums, and other functionality, and may provide you
          with the opportunity to create, submit, post, display, transmit, perform,
          publish, distribute, or broadcast content and materials to us or on the
          Services, including but not limited to text, writings, video, audio,
          photographs, graphics, comments, suggestions, or personal information or
          other material (collectively, &quot;Contributions&quot;).
        </p>
        <p>
          Contributions may be viewable by other users of the Services and through
          third-party websites. As such, any Contributions you transmit may be
          treated as non-confidential and non-proprietary.
        </p>
      </div>
    ),
  },
  {
    title: "7. CONTRIBUTION LICENSE",
    content: (
      <div>
        <p className="mb-4">
          By posting your Contributions to any part of the Services or making
          Contributions accessible to the Services by linking your account from the
          Services to any of your social networking accounts, you automatically
          grant, and you represent and warrant that you have the right to grant, to
          us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive,
          transferable, royalty-free, fully-paid, worldwide right, and license to
          host, use, copy, reproduce, disclose, sell, resell, publish, broadcast,
          retitle, archive, store, cache, publicly perform, publicly display,
          reformat, translate, transmit, excerpt (in whole or in part), and
          distribute such Contributions.
        </p>
      </div>
    ),
  },
  {
    title: "8. GUIDELINES FOR REVIEWS",
    content: (
      <div>
        <p className="mb-4">
          We may provide you areas on the Services to leave reviews or ratings.
          When posting a review, you must comply with the following criteria:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You should have firsthand experience with the person/entity being reviewed</li>
          <li>Your reviews should not contain offensive profanity, or abusive, racist, offensive, or hateful language</li>
          <li>Your reviews should not contain discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation, or disability</li>
          <li>Your reviews should not contain references to illegal activity</li>
          <li>You should not be affiliated with competitors if posting negative reviews</li>
          <li>You should not make any conclusions as to the legality of conduct</li>
          <li>You may not post any false or misleading statements</li>
          <li>You may not organize a campaign encouraging others to post reviews, whether positive or negative</li>
        </ul>
      </div>
    ),
  },
  {
    title: "9. MOBILE APPLICATION LICENSE",
    content: (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Use License</h3>
          <p>
            If you access the Services via the App, then we grant you a revocable,
            non-exclusive, non-transferable, limited right to install and use the
            App on wireless electronic devices owned or controlled by you, and to
            access and use the App on such devices strictly in accordance with the
            terms and conditions of this mobile application license contained in
            these Legal Terms.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Apple and Android Devices</h3>
          <p>
            The following terms apply when you use the App obtained from either the
            Apple Store or Google Play (each an &quot;App Distributor&quot;) to access the
            Services:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>The license granted to you for our App is limited to a non-transferable license to use the application on a device that utilizes the Apple iOS or Android operating systems</li>
            <li>We are responsible for providing any maintenance and support services with respect to the App</li>
            <li>App Distributors have no warranty obligation whatsoever with respect to the App</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "10. SOCIAL MEDIA",
    content: (
      <div>
        <p className="mb-4">
          As part of the functionality of the Services, you may link your account
          with online accounts you have with third-party service providers (each
          such account, a &quot;Third-Party Account&quot;) by either: (1) providing your
          Third-Party Account login information through the Services; or (2)
          allowing us to access your Third-Party Account, as is permitted under the
          applicable terms and conditions that govern your use of each Third-Party
          Account.
        </p>
        <p>
          You represent and warrant that you are entitled to disclose your
          Third-Party Account login information to us and/or grant us access to
          your Third-Party Account, without breach by you of any of the terms and
          conditions that govern your use of the applicable Third-Party Account.
        </p>
      </div>
    ),
  },
  {
    title: "11. THIRD-PARTY WEBSITES AND CONTENT",
    content: (
      <div>
        <p className="mb-4">
          The Services may contain (or you may be sent via the Site or App) links
          to other websites (&quot;Third-Party Websites&quot;) as well as articles,
          photographs, text, graphics, pictures, designs, music, sound, video,
          information, applications, software, and other content or items belonging
          to or originating from third parties (&quot;Third-Party Content&quot;).
        </p>
        <p>
          Such Third-Party Websites and Third-Party Content are not investigated,
          monitored, or checked for accuracy, appropriateness, or completeness by
          us, and we are not responsible for any Third-Party Websites accessed
          through the Services or any Third-Party Content posted on, available
          through, or installed from the Services.
        </p>
      </div>
    ),
  },
  {
    title: "12. SERVICES MANAGEMENT",
    content: (
      <div>
        <p>
          We reserve the right, but not the obligation, to: (1) monitor the
          Services for violations of these Legal Terms; (2) take appropriate legal
          action against anyone who, in our sole discretion, violates the law or
          these Legal Terms, including without limitation, reporting such user to
          law enforcement authorities; (3) in our sole discretion and without
          limitation, refuse, restrict access to, limit the availability of, or
          disable (to the extent technologically feasible) any of your
          Contributions or any portion thereof; (4) in our sole discretion and
          without limitation, notice, or liability, to remove from the Services or
          otherwise disable all files and content that are excessive in size or are
          in any way burdensome to our systems; and (5) otherwise manage the
          Services in a manner designed to protect our rights and property and to
          facilitate the proper functioning of the Services.
        </p>
      </div>
    ),
  },
  {
    title: "13. PRIVACY POLICY",
    content: (
      <div>
        <p className="mb-4">
          We care about data privacy and security. Please review our Privacy
          Policy:{" "}
          <Link href="/privacy" className="text-primary hover:text-primary-dark underline">
            https://vibzi.co/privacy
          </Link>
          . By using the Services, you agree to be bound by our Privacy Policy,
          which is incorporated into these Legal Terms.
        </p>
        <p>
          Please be advised the Services are hosted in Singapore. If you access the
          Services from any other region of the world with laws or other
          requirements governing personal data collection, use, or disclosure that
          differ from applicable laws in Singapore, then through your continued use
          of the Services, you are transferring your data to Singapore, and you
          expressly consent to have your data transferred to and processed in
          Singapore.
        </p>
      </div>
    ),
  },
  {
    title: "14. TERM AND TERMINATION",
    content: (
      <div>
        <p className="mb-4">
          These Legal Terms shall remain in full force and effect while you use the
          Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE
          RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR
          LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING
          CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON,
          INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY,
          OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR
          REGULATION.
        </p>
        <p>
          If we terminate or suspend your account for any reason, you are
          prohibited from registering and creating a new account under your name, a
          fake or borrowed name, or the name of any third party, even if you may
          be acting on behalf of the third party.
        </p>
      </div>
    ),
  },
  {
    title: "15. MODIFICATIONS AND INTERRUPTIONS",
    content: (
      <div>
        <p className="mb-4">
          We reserve the right to change, modify, or remove the contents of the
          Services at any time or for any reason at our sole discretion without
          notice. We will not be liable to you or any third party for any
          modification, price change, suspension, or discontinuance of the
          Services.
        </p>
        <p>
          We cannot guarantee the Services will be available at all times. We may
          experience hardware, software, or other problems or need to perform
          maintenance related to the Services, resulting in interruptions, delays,
          or errors.
        </p>
      </div>
    ),
  },
  {
    title: "16. GOVERNING LAW",
    content: (
      <div>
        <p>
          These Legal Terms shall be governed by and defined following the laws of
          Sri Lanka. Voyage Vibes (PVT) LTD and yourself irrevocably consent that
          the courts of Sri Lanka shall have exclusive jurisdiction to resolve any
          dispute which may arise in connection with these Legal Terms.
        </p>
      </div>
    ),
  },
  {
    title: "17. DISPUTE RESOLUTION",
    content: (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Informal Negotiations</h3>
          <p>
            To expedite resolution and control the cost of any dispute,
            controversy, or claim related to these Legal Terms (each a &quot;Dispute&quot;
            and collectively, the &quot;Disputes&quot;), the Parties agree to first attempt
            to negotiate any Dispute informally for at least thirty (30) days
            before initiating arbitration.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Binding Arbitration</h3>
          <p>
            Any dispute arising out of or in connection with these Legal Terms
            shall be referred to and finally resolved by the International
            Commercial Arbitration Court under the European Arbitration Chamber
            according to the Rules of this ICAC.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "18. CORRECTIONS",
    content: (
      <div>
        <p>
          There may be information on the Services that contains typographical
          errors, inaccuracies, or omissions. We reserve the right to correct any
          errors, inaccuracies, or omissions and to change or update the
          information on the Services at any time, without prior notice.
        </p>
      </div>
    ),
  },
  {
    title: "19. DISCLAIMER",
    content: (
      <div>
        <p className="mb-4">
          THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE
          THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST
          EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED,
          IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.
        </p>
      </div>
    ),
  },
  {
    title: "20. LIMITATIONS OF LIABILITY",
    content: (
      <div>
        <p>
          IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO
          YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL,
          EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES.
        </p>
      </div>
    ),
  },
  {
    title: "21. INDEMNIFICATION",
    content: (
      <div>
        <p>
          You agree to defend, indemnify, and hold us harmless, including our
          subsidiaries, affiliates, and all of our respective officers, agents,
          partners, and employees, from and against any loss, damage, liability,
          claim, or demand, including reasonable attorneys&apos; fees and expenses, made
          by any third party due to or arising out of: (1) your Contributions; (2)
          use of the Services; (3) breach of these Legal Terms; (4) any breach of
          your representations and warranties set forth in these Legal Terms; (5)
          your violation of the rights of a third party.
        </p>
      </div>
    ),
  },
  {
    title: "22. USER DATA",
    content: (
      <div>
        <p>
          We will maintain certain data that you transmit to the Services for the
          purpose of managing the performance of the Services, as well as data
          relating to your use of the Services. Although we perform regular routine
          backups of data, you are solely responsible for all data that you
          transmit or that relates to any activity you have undertaken using the
          Services.
        </p>
      </div>
    ),
  },
  {
    title: "23. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES",
    content: (
      <div>
        <p>
          Visiting the Services, sending us emails, and completing online forms
          constitute electronic communications. You consent to receive electronic
          communications, and you agree that all agreements, notices, disclosures,
          and other communications we provide to you electronically, via email and
          on the Services, satisfy any legal requirement that such communication be
          in writing.
        </p>
      </div>
    ),
  },
  {
    title: "24. MISCELLANEOUS",
    content: (
      <div>
        <p className="mb-4">
          These Legal Terms and any policies or operating rules posted by us on the
          Services or in respect to the Services constitute the entire agreement
          and understanding between you and us. Our failure to exercise or enforce
          any right or provision of these Legal Terms shall not operate as a
          waiver of such right or provision.
        </p>
        <p>
          These Legal Terms operate to the fullest extent permissible by law. We
          may assign any or all of our rights and obligations to others at any
          time. We shall not be responsible or liable for any loss, damage, delay,
          or failure to act caused by any cause beyond our reasonable control.
        </p>
      </div>
    ),
  },
  {
    title: "25. CONTACT US",
    content: (
      <div>
        <p className="mb-4">
          In order to resolve a complaint regarding the Services or to receive
          further information regarding use of the Services, please contact us at:{" "}
          <a
            href="mailto:info@voyagevibes.life"
            className="text-primary hover:text-primary-dark underline"
          >
            info@voyagevibes.life
          </a>
        </p>
        <p>
          You can also reach us by phone at:{" "}
          <a
            href="tel:+94719181154"
            className="text-primary hover:text-primary-dark underline"
          >
            (+94) 719181154
          </a>
        </p>
      </div>
    ),
  },
];

export default TermsPage;