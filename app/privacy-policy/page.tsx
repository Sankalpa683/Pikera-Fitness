// app/privacy-policy/page.tsx

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: June 23, 2025</p>

      <p className="mb-6">
        Welcome to <strong>Pikera Fitness</strong>. This privacy policy explains how we collect,
        use, and protect your data when you sign in to our application using Google or Facebook.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">1. What We Collect</h2>
      <ul className="list-disc ml-6 mb-6 space-y-1">
        <li>Your <strong>email address</strong></li>
        <li>Your <strong>name</strong></li>
        <li>Your <strong>Google or Facebook user ID</strong></li>
      </ul>
      <p className="mb-6">
        That’s it. No cookies. No IP tracking. No creepy stuff.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">2. Why We Collect It</h2>
      <p className="mb-6">
        We collect this information <strong>solely</strong> to:
      </p>
      <ul className="list-disc ml-6 mb-6 space-y-1">
        <li>Authenticate you into the app</li>
        <li>Personalize your experience</li>
        <li>Prevent unauthorized access</li>
      </ul>
      <p className="mb-6">
        We do <strong>not</strong> collect your health data, private messages, friends list, or anything else.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">3. How We Use Your Data</h2>
      <p className="mb-6">
        Your data is only used for the purpose of allowing you to:
      </p>
      <ul className="list-disc ml-6 mb-6 space-y-1">
        <li>Log in securely</li>
        <li>Access a database of <strong>Nepali food macros</strong> (e.g., dal bhat, dhido, etc.)</li>
      </ul>
      <p className="mb-6">We do not share, sell, trade, or do anything shady with your data.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Data Sharing</h2>
      <p className="mb-6">
        We do <strong>not</strong> share your data with any third parties.  
        Your data is stored securely within <a href="https://supabase.com" className="text-blue-400 underline" target="_blank">Supabase</a> and follows their compliance policies.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Your Control</h2>
      <ul className="list-disc ml-6 mb-6 space-y-1">
        <li>Revoke permissions anytime from your Google or Facebook account settings.</li>
        <li>Request account deletion by emailing: <strong>privacy@pikera-fitness.com</strong></li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Third-Party Services</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Google OAuth —{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            className="text-blue-400 underline"
          >
            Google Privacy Policy
          </a>
        </li>
        <li>
          Facebook OAuth —{" "}
          <a
            href="https://www.facebook.com/policy.php"
            target="_blank"
            className="text-blue-400 underline"
          >
            Facebook Privacy Policy
          </a>
        </li>
      </ul>
    </main>
  )
}
