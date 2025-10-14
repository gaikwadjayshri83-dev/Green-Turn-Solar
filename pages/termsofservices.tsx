import React from "react";

export default function TermsOfServices() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6 md:px-20">
      <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">
          Last updated: October 2025
        </p>

        <p className="mb-6">
          Welcome to <strong>Green Turn Solar</strong>! These Terms of Service govern your use of our website (
          <a href="https://greenturnsolar.com" className="text-green-600 underline">
            https://greenturnsolar.com
          </a>
          ) and any services provided by Green Turn Solar. By accessing or using our website, you agree to comply with these terms.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">1. Use of Our Services</h2>
        <p className="mb-6">
          You agree to use this website only for lawful purposes. You must not use the site in a way that could damage, disable, or impair it or interfere with another party’s use.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">2. Intellectual Property</h2>
        <p className="mb-6">
          All content on this site, including text, graphics, logos, and images, is the property of Green Turn Solar or its content suppliers and is protected by applicable copyright and trademark laws.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">3. Quotes and Pricing</h2>
        <p className="mb-6">
          All pricing provided through our website is for reference purposes only. Actual quotes are based on site assessments and may vary depending on installation conditions and requirements.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">4. Limitation of Liability</h2>
        <p className="mb-6">
          Green Turn Solar shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the site or our services.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">5. External Links</h2>
        <p className="mb-6">
          Our website may contain links to external sites not operated by us. We are not responsible for the content or privacy practices of those sites.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">6. Changes to Terms</h2>
        <p className="mb-6">
          We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">7. Contact Us</h2>
        <p className="mb-6">
          For questions about these Terms or our services, contact us at{" "}
          <a href="mailto:info@greenturnsolar.com" className="text-green-600 underline">
            info@greenturnsolar.com
          </a>.
        </p>
      </section>
    </main>
  );
}
