import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, ArrowRight, Shield, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Admin | Sparkright Cleaning',
}

export default function AdminPage() {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <Card className="w-full max-w-lg mx-4 border-0 shadow-2xl">
        <CardContent className="p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Admin Access</h1>
          <Badge className="mb-6 bg-teal-100 text-teal-700 border-teal-200">Static Site</Badge>
          <p className="text-slate-500 mb-6 leading-relaxed">
            This is a static website. All form submissions (bookings, quotes, reviews, and contact messages) are sent directly to your email via Web3Forms.
          </p>
          <div className="bg-slate-50 rounded-xl p-6 text-left space-y-4 mb-6">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2"><Sparkles className="w-5 h-5 text-teal-500" /> How It Works</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">1.</span> Customers fill out forms on the website</li>
              <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">2.</span> Web3Forms sends the submission to your email instantly</li>
              <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">3.</span> You review and respond directly via email or phone</li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Mail className="w-4 h-4 text-teal-500" />
              <span>vianneymuhoza13@gmail.com</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Phone className="w-4 h-4 text-teal-500" />
              <span>425-550-7241</span>
            </div>
          </div>
          <Link href="/" className="block mt-6">
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
              Back to Website <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
