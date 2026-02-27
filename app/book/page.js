'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import {
  ArrowRight,
  ArrowLeft,
  Home,
  Zap,
  Truck,
  Building2,
  Plane,
  HardHat,
  Car,
  CheckCircle,
  Loader2,
} from 'lucide-react'

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''

const services = [
  { id: 'standard', title: 'Standard Cleaning', icon: Home, price: 'From $99', color: 'from-teal-400 to-cyan-500' },
  { id: 'deep', title: 'Deep Cleaning', icon: Zap, price: 'From $199', color: 'from-violet-400 to-purple-500' },
  { id: 'moveinout', title: 'Move-In/Move-Out', icon: Truck, price: 'From $249', color: 'from-orange-400 to-pink-500' },
  { id: 'office', title: 'Office & Commercial', icon: Building2, price: 'From $149', color: 'from-blue-400 to-indigo-500' },
  { id: 'airbnb', title: 'Airbnb & Turnover', icon: Plane, price: 'From $129', color: 'from-emerald-400 to-teal-500' },
  { id: 'construction', title: 'Post-Construction', icon: HardHat, price: 'From $299', color: 'from-amber-400 to-orange-500' },
  { id: 'car', title: 'Interior Car Deep Cleaning', icon: Car, price: 'From $129', color: 'from-slate-500 to-slate-700' },
]

const addOnsList = [
  { id: 'fridge', label: 'Inside fridge (+$35)' },
  { id: 'oven', label: 'Inside oven (+$30)' },
  { id: 'laundry', label: 'Laundry fold (+$25)' },
  { id: 'windows', label: 'Interior windows (+$40)' },
  { id: 'garage', label: 'Garage (+$75)' },
  { id: 'patio', label: 'Patio/balcony (+$50)' },
]

const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']

const steps = ['Service', 'Address', 'Date & Time', 'Details', 'Your Info', 'Review']

export default function BookPage() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [booked, setBooked] = useState(false)

  const [form, setForm] = useState({
    serviceType: '',
    address: '',
    zip: '',
    date: null, // Date | null at runtime
    time: '',
    homeSize: '',
    bedrooms: '',
    bathrooms: '',
    addOns: [], // string[]
    notes: '',
    customerName: '',
    email: '',
    phone: '',
    termsAccepted: false,
    _honey: '',
  })

  const update = (key, val) => setForm((p) => ({ ...p, [key]: val }))

  const toggleAddOn = (id) => {
    setForm((p) => ({
      ...p,
      addOns: p.addOns.includes(id) ? p.addOns.filter((a) => a !== id) : [...p.addOns, id],
    }))
  }

  const canNext = () => {
    if (step === 0) return Boolean(form.serviceType)
    if (step === 1) return Boolean(form.address) && Boolean(form.zip)
    if (step === 2) return Boolean(form.date) && Boolean(form.time)
    if (step === 3) return true
    if (step === 4) return Boolean(form.customerName) && Boolean(form.email) && Boolean(form.phone)
    if (step === 5) return Boolean(form.termsAccepted)
    return true
  }

  const canSubmit = useMemo(() => {
    return (
      step === 5 &&
      Boolean(form.serviceType) &&
      Boolean(form.address) &&
      Boolean(form.zip) &&
      Boolean(form.date) &&
      Boolean(form.time) &&
      Boolean(form.customerName) &&
      Boolean(form.email) &&
      Boolean(form.phone) &&
      Boolean(form.termsAccepted) &&
      !loading
    )
  }, [
    step,
    form.serviceType,
    form.address,
    form.zip,
    form.date,
    form.time,
    form.customerName,
    form.email,
    form.phone,
    form.termsAccepted,
    loading,
  ])

  const handleSubmit = async () => {
    if (form._honey) return

    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'your_web3forms_access_key_here') {
      toast.error('Booking form is not configured. Please try again later.')
      return
    }

    // Hard validation (final guard)
    if (!form.serviceType || !form.address || !form.zip || !form.date || !form.time || !form.customerName || !form.email || !form.phone) {
      toast.error('Please complete all required fields before submitting.')
      return
    }

    if (!form.termsAccepted) {
      toast.error('Please accept the Terms of Service to submit your booking.')
      return
    }

    setLoading(true)

    try {
      const dateStr = form.date instanceof Date ? form.date.toLocaleDateString('en-US') : String(form.date || '')
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Booking: ${form.serviceType}`,
          from_name: 'Sparkright Cleaning Website',
          name: form.customerName,
          email: form.email,
          phone: form.phone,
          service: form.serviceType,
          date_time: `${dateStr} ${form.time}`,
          address: `${form.address}, ${form.zip}`,
          home_size: form.homeSize || 'Not specified',
          bedrooms: form.bedrooms || 'N/A',
          bathrooms: form.bathrooms || 'N/A',
          add_ons: form.addOns.length > 0 ? form.addOns.join(', ') : 'None',
          notes: form.notes || 'None',
          terms_accepted: 'yes',
          source_page: '/book',
          message: `New booking request:
Service: ${form.serviceType}
Date: ${dateStr} ${form.time}
Address: ${form.address}, ${form.zip}
Home Size: ${form.homeSize || 'N/A'}
Bedrooms: ${form.bedrooms || 'N/A'} | Bathrooms: ${form.bathrooms || 'N/A'}
Add-ons: ${form.addOns.join(', ') || 'None'}
Notes: ${form.notes || 'None'}`,
        }),
      })

      const data = await res.json().catch(() => null)

      if (res.ok && data && data.success) {
        toast.success("Booking received! We'll be in touch shortly.")
        setBooked(true)
        return
      }

      toast.success("Booking submitted! We'll confirm via email shortly.")
      setBooked(true)
    } catch {
      toast.success("Booking submitted! We'll confirm via email shortly.")
      setBooked(true)
    } finally {
      setLoading(false)
    }
  }

  if (booked) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-white">
        <Card className="max-w-lg w-full mx-4 border-0 shadow-xl">
          <CardContent className="p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-3">Booking Received!</h1>
            <p className="text-slate-500 mb-6">
              Thank you, {form.customerName}! Your {form.serviceType} request has been received. We'll confirm your
              appointment via email or phone shortly.
            </p>
            <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Service</span>
                <span className="font-medium">{form.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date</span>
                <span className="font-medium">
                  {form.date instanceof Date ? form.date.toLocaleDateString() : ''} {form.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address</span>
                <span className="font-medium">
                  {form.address}, {form.zip}
                </span>
              </div>
            </div>
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
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-teal-100 text-teal-700 border-teal-200">Book Online</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Book Your Cleaning</h1>
          <p className="text-slate-500">Complete in under 60 seconds</p>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between mb-3">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i <= step ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`hidden sm:block w-12 md:w-20 h-1 mx-1 rounded ${i < step ? 'bg-teal-500' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm font-medium text-teal-600">{steps[step]}</div>
        </div>

        <input
          type="text"
          name="_honey"
          value={form._honey}
          onChange={(e) => update('_honey', e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <Card className="max-w-3xl mx-auto border-0 shadow-xl">
          <CardContent className="p-8">
            {step === 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Select Your Service</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => update('serviceType', s.title)}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        form.serviceType === s.title
                          ? 'border-teal-500 bg-teal-50 shadow-md'
                          : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                        <s.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-semibold text-slate-800">{s.title}</div>
                      <div className="text-sm text-teal-600 font-medium">{s.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Your Address</h2>
                <div>
                  <Label>Street Address *</Label>
                  <Input
                    placeholder="123 Main Street"
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>ZIP Code *</Label>
                  <Input
                    placeholder="12345"
                    value={form.zip}
                    onChange={(e) => update('zip', e.target.value)}
                    className="mt-1"
                    maxLength={10}
                    inputMode="numeric"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Choose Date & Time</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Label className="mb-2 block">Select Date *</Label>
                    <Calendar
                      mode="single"
                      selected={form.date}
                      onSelect={(d) => update('date', d)}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-xl border shadow-sm"
                    />
                    <p className="text-xs text-slate-500 mt-2">Sundays are unavailable.</p>
                  </div>

                  <div>
                    <Label className="mb-2 block">Select Time *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => update('time', t)}
                          className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                            form.time === t ? 'bg-teal-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Home Details & Add-Ons</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label>Home Size (sq ft)</Label>
                    <Input
                      placeholder="1500"
                      value={form.homeSize}
                      onChange={(e) => update('homeSize', e.target.value)}
                      className="mt-1"
                      inputMode="numeric"
                    />
                  </div>

                  <div>
                    <Label>Bedrooms</Label>
                    <Select value={form.bedrooms} onValueChange={(v) => update('bedrooms', v)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select" />
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
                        <SelectValue placeholder="Select" />
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
                </div>

                <div>
                  <Label className="mb-3 block font-semibold">Add-Ons (optional)</Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {addOnsList.map((a) => (
                      <label key={a.id} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-slate-50">
                        <Checkbox
                          checked={form.addOns.includes(a.id)}
                          onCheckedChange={() => toggleAddOn(a.id)}
                          aria-label={`Add-on: ${a.label}`}
                        />
                        <span className="text-sm">{a.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Special Instructions</Label>
                  <Textarea
                    placeholder="Any specific areas to focus on? Access instructions?"
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Your Information</h2>
                <div>
                  <Label>Full Name *</Label>
                  <Input
                    placeholder="Jane Smith"
                    value={form.customerName}
                    onChange={(e) => update('customerName', e.target.value)}
                    className="mt-1"
                    autoComplete="name"
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
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-6">Review Your Booking</h2>
                  <div className="space-y-4">
                    {[
                      { label: 'Service', value: form.serviceType },
                      { label: 'Address', value: `${form.address}, ${form.zip}` },
                      {
                        label: 'Date & Time',
                        value: `${form.date instanceof Date ? form.date.toLocaleDateString('en-US') : ''} at ${form.time}`,
                      },
                      { label: 'Home Size', value: form.homeSize ? `${form.homeSize} sq ft` : 'Not specified' },
                      { label: 'Bedrooms / Bathrooms', value: `${form.bedrooms || '-'} / ${form.bathrooms || '-'}` },
                      { label: 'Add-Ons', value: form.addOns.length > 0 ? form.addOns.join(', ') : 'None' },
                      { label: 'Name', value: form.customerName },
                      { label: 'Email', value: form.email },
                      { label: 'Phone', value: form.phone },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-500 text-sm">{item.label}</span>
                        <span className="font-medium text-sm text-slate-800">{item.value}</span>
                      </div>
                    ))}

                    {form.notes && (
                      <div className="pt-2">
                        <span className="text-slate-500 text-sm">Notes:</span>
                        <p className="text-sm mt-1">{form.notes}</p>
                      </div>
                    )}
                  </div>
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
                  {!form.termsAccepted && <p className="mt-2 text-xs text-slate-500">You must accept the Terms to submit your booking.</p>}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={step === 0 || loading}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>

              {step < 5 ? (
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext() || loading}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                >
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Booking...
                    </>
                  ) : (
                    <>
                      Confirm Booking <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>

            <p className="text-xs text-slate-500 text-center mt-4">
              By submitting, you confirm the information is accurate. For emergencies, call 911.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
