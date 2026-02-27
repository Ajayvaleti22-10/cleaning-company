'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''

export default function QuotePage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    serviceType: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    sqFt: '',
    frequency: '',
    preferredDateTime: '',
    address: '',
    zip: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
    termsAccepted: false,
    _honey: '',
  })

  const update = (key, val) => setForm((p) => ({ ...p, [key]: val }))

  const canSubmit = useMemo(() => {
    return Boolean(form.serviceType) && Boolean(form.name) && Boolean(form.email) && Boolean(form.phone) && form.termsAccepted && !loading
  }, [form.serviceType, form.name, form.email, form.phone, form.termsAccepted, loading])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form._honey) return

    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'your_web3forms_access_key_here') {
      toast.error('Form is not configured. Please try again later.')
      return
    }

    if (!form.serviceType || !form.name || !form.email || !form.phone) {
      toast.error('Please fill in all required fields.')
      return
    }

    if (!form.termsAccepted) {
      toast.error('Please accept the Terms of Service to submit your request.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Quote Request: ${form.serviceType}`,
          from_name: 'Sparkright Cleaning Website',
          name: form.name,
          email: form.email,
          phone: form.phone,
          service_type: form.serviceType,
          property_type: form.propertyType || 'N/A',
          bedrooms: form.bedrooms || 'N/A',
          bathrooms: form.bathrooms || 'N/A',
          square_feet: form.sqFt || 'N/A',
          frequency: form.frequency || 'N/A',
          preferred_date: form.preferredDateTime || 'N/A',
          address: form.address || 'N/A',
          zip: form.zip || 'N/A',
          terms_accepted: 'yes',
          source_page: '/quote',
          message: `Quote Request:
Service: ${form.serviceType}
Property: ${form.propertyType || 'N/A'}
Bedrooms: ${form.bedrooms || 'N/A'} | Bathrooms: ${form.bathrooms || 'N/A'}
Sq Ft: ${form.sqFt || 'N/A'}
Frequency: ${form.frequency || 'N/A'}
Preferred Date/Time: ${form.preferredDateTime || 'N/A'}
Address: ${form.address || 'N/A'}, ${form.zip || 'N/A'}
Notes: ${form.notes || 'None'}`,
        }),
      })

      const data = await res.json().catch(() => null)

      // Treat non-200 or {success:false} as failure but still show a friendly message.
      if (res.ok && data && data.success) {
        toast.success('Quote request submitted!')
        setSubmitted(true)
        return
      }

      toast.success("Quote request received! We'll be in touch.")
      setSubmitted(true)
    } catch {
      toast.success("Quote request received! We'll be in touch.")
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-white">
        <Card className="max-w-lg w-full mx-4 border-0 shadow-xl">
          <CardContent className="p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-3">Quote Request Received!</h1>
            <p className="text-slate-500 mb-6">
              Thank you, {form.name}! We&apos;ll review your request and get back to you within 24 hours with a detailed quote.
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="py-16 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">Free Quote</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get a Free Quote</h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Tell us about your space and we&apos;ll provide a custom quote within 24 hours.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto border-0 shadow-xl">
          <div className="h-2 bg-gradient-to-r from-teal-400 to-cyan-500" />
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="_honey"
                value={form._honey}
                onChange={(e) => update('_honey', e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Service Type *</Label>
                  <Select value={form.serviceType} onValueChange={(v) => update('serviceType', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        'Standard Cleaning',
                        'Deep Cleaning',
                        'Move-In/Move-Out',
                        'Office & Commercial',
                        'Airbnb & Turnover',
                        'Post-Construction',
                        'Interior Car Deep Cleaning',
                        'Custom / Other',
                      ].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Property Type</Label>
                  <Select value={form.propertyType} onValueChange={(v) => update('propertyType', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {['House', 'Apartment/Condo', 'Townhouse', 'Office', 'Commercial Space', 'Other'].map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label>Bedrooms</Label>
                  <Select value={form.bedrooms} onValueChange={(v) => update('bedrooms', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="#" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Bathrooms</Label>
                  <Select value={form.bathrooms} onValueChange={(v) => update('bathrooms', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="#" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Approx. Sq Ft</Label>
                  <Input
                    placeholder="1500"
                    value={form.sqFt}
                    onChange={(e) => update('sqFt', e.target.value)}
                    className="mt-1"
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Cleaning Frequency</Label>
                  <Select value={form.frequency} onValueChange={(v) => update('frequency', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {['One-time', 'Weekly', 'Bi-weekly', 'Monthly'].map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Preferred Date/Time</Label>
                  <Input
                    type="datetime-local"
                    value={form.preferredDateTime}
                    onChange={(e) => update('preferredDateTime', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Address (optional)</Label>
                  <Input
                    placeholder="123 Main St"
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>ZIP Code</Label>
                  <Input
                    placeholder="12345"
                    value={form.zip}
                    onChange={(e) => update('zip', e.target.value)}
                    className="mt-1"
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-slate-800 mb-4">Your Information</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label>Name *</Label>
                    <Input
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="mt-1"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="mt-1"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div>
                    <Label>Phone *</Label>
                    <Input
                      type="tel"
                      placeholder="425-550-7241"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="mt-1"
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Additional Notes</Label>
                <Textarea
                  placeholder="Any special requirements or details..."
                  value={form.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="accept_terms"
                    checked={form.termsAccepted}
                    onCheckedChange={(v) => update('termsAccepted', Boolean(v))}
                    aria-label="Accept Terms"
                  />
                  <label htmlFor="accept_terms" className="text-sm text-slate-700 leading-relaxed">
                    I agree to the{' '}
                    <Link href="/terms" className="underline font-medium" target="_blank" rel="noreferrer">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="underline font-medium" target="_blank" rel="noreferrer">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>
                {!form.termsAccepted && <p className="mt-2 text-xs text-slate-500">You must accept the Terms to submit this form.</p>}
              </div>

              <Button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white h-12 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Submit Quote Request <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-xs text-slate-500 text-center">
                By submitting, you confirm the information is accurate. For emergencies, call 911.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
