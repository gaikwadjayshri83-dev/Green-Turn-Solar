import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6 md:px-20">
      <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">
          Last updated: October 2025
        </p>

        <p className="mb-6">
          At <strong>Green Turn Solar</strong>, accessible from{" "}
          <a href="https://greenturnsolar.com" className="text-green-600 underline">
            https://greenturnsolar.com
          </a>
          , we value your privacy and are committed to protecting your personal data. 
          This Privacy Policy describes how we collect, use, and safeguard information you provide while using our website and services.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-6">
          We may collect personal information such as your name, email address, phone number, and location when you contact us, request a quote, or fill out forms on our website. 
          Non-personal data such as browser type, IP address, and pages visited may also be collected for analytics.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 mb-6 space-y-2">
          <li>To provide and improve our solar installation services.</li>
          <li>To respond to your inquiries and provide quotations.</li>
          <li>To send updates, offers, or service information (with your consent).</li>
          <li>To comply with legal requirements and prevent fraudulent activity.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">3. Data Protection</h2>
        <p className="mb-6">
          We implement appropriate technical and organizational measures to ensure your data is secure. 
          Your information is stored on protected servers, and we never sell, rent, or trade your personal details to third parties.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">4. Cookies and Tracking</h2>
        <p className="mb-6">
          Our website may use cookies to enhance your browsing experience and analyze site traffic. 
          You can disable cookies in your browser settings, but this may affect certain site functionalities.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">5. Third-Party Services</h2>
        <p className="mb-6">
          We may use third-party tools (such as analytics or AI assistants) that collect anonymous usage data. 
          These services are bound by their own privacy policies and comply with international data protection regulations.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">6. Your Rights</h2>
        <p className="mb-6">
          You have the right to access, correct, or delete your personal information. 
          If you wish to exercise these rights, contact us at{" "}
          <a href="mailto:info@greenturnsolar.com" className="text-green-600 underline">
            info@greenturnsolar.com
          </a>.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">7. Updates to This Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time. The latest version will always be available on our website with the updated date.
        </p>

        <p className="mt-10 text-gray-700">
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:info@greenturnsolar.com" className="text-green-600 underline">
            info@greenturnsolar.com
          </a>.
        </p>
      </section>
    </main>
  );
}
