import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Privacy Policy | Sparkright Cleaning',
  description: 'Privacy Policy for Sparkright Cleaning cleaning services.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-24">
      <section className="py-12 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-white/70">Last updated: June 2025</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Information We Collect</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">When you use our services, we may collect personal information including your name, email address, phone number, home address, and payment information. We collect this information when you book a cleaning, request a quote, submit a review, or contact us.</p>

          <h2 className="text-2xl font-bold text-slate-800 mb-4">2. How We Use Your Information</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">We use your information to provide and improve our cleaning services, process bookings and payments, send confirmation and reminder emails, respond to inquiries, and improve our website experience.</p>

          <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Information Sharing</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business, as long as they agree to keep this information confidential.</p>

          <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Data Security</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

          <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Cookies</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">Our website may use cookies to enhance your experience. You can choose to disable cookies through your browser settings.</p>

          <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Your Rights</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">You have the right to access, correct, or delete your personal information. Contact us at vianneymuhoza13@gmail.com to exercise these rights.</p>

          <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Contact Us</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">If you have questions about this Privacy Policy, please contact us at vianneymuhoza13@gmail.com or call 425-550-7241.</p>

          <p className="text-sm text-slate-400 mt-8 italic">This is a template privacy policy. Please consult with a legal professional to ensure compliance with applicable laws and regulations for your specific business and jurisdiction.</p>
        </div>
      </section>
    </div>
  )
}
