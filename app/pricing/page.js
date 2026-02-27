'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowRight, Calculator, CheckCircle, Star } from 'lucide-react'

const basePrices = {
  standard: { label: 'Standard Cleaning', base: 99 },
  deep: { label: 'Deep Cleaning', base: 150 },
  moveinout: { label: 'Move-In/Move-Out', base: 200 },
  office: { label: 'Office & Commercial', base: 169 },
  airbnb: { label: 'Airbnb & Turnover', base: 129 },
  construction: { label: 'Post-Construction', base: 200 },
  car: { label: 'Interior Car Deep Cleaning', base: 129 },
}

const addOnsList = [
  { id: 'fridge', label: 'Inside fridge', price: 35 },
  { id: 'oven', label: 'Inside oven', price: 30 },
  { id: 'laundry', label: 'Laundry fold', price: 25 },
  { id: 'windows', label: 'Interior windows', price: 40 },
  { id: 'garage', label: 'Garage cleaning', price: 75 },
  { id: 'patio', label: 'Patio/balcony', price: 50 },
]

export default function PricingPage() {
  const [service, setService] = useState('standard')
  const [bedrooms, setBedrooms] = useState([2])
  const [bathrooms, setBathrooms] = useState([1])
  const [sqft, setSqft] = useState([1000])
  const [addOns, setAddOns] = useState([])
  const [frequency, setFrequency] = useState('once')

  const basePrice = basePrices[service]?.base || 99
  const sizeMultiplier = 1 + (sqft[0] - 500) / 3000
  const roomsExtra = (bedrooms[0] - 1) * 20 + (bathrooms[0] - 1) * 15
  const addOnsTotal = addOns.reduce((sum, id) => sum + (addOnsList.find(a => a.id === id)?.price || 0), 0)
  const subtotal = Math.round(basePrice * sizeMultiplier + roomsExtra + addOnsTotal)
  const discount = frequency === 'weekly' ? 0.15 : frequency === 'biweekly' ? 0.10 : frequency === 'monthly' ? 0.05 : 0
  const total = Math.round(subtotal * (1 - discount))

  const toggleAddOn = (id) => {
    setAddOns(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">Transparent Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Honest Pricing</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">No hidden fees, no surprises. Get an instant estimate below or request a custom quote.</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { name: 'Standard Cleaning', price: '$99+', features: ['All rooms cleaned', 'Eco-friendly products', 'Supplies included'], popular: false },
              { name: 'Deep Cleaning', price: '$199+', features: ['Everything in Standard', 'Deep scrub all areas', 'Inside appliances', 'Baseboards & trim'], popular: true },
              { name: 'Move-In/Move-Out', price: '$249+', features: ['Everything in Deep', 'Inside cabinets', 'Full sanitization', 'Deposit-back guarantee'], popular: false },
            ].map((plan, i) => (
              <Card key={i} className={`border-0 shadow-lg relative overflow-hidden ${plan.popular ? 'ring-2 ring-teal-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center py-1.5 text-sm font-semibold">
                    <Star className="w-4 h-4 inline mr-1" /> Most Popular
                  </div>
                )}
                <CardContent className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-teal-600 mb-6">{plan.price}</div>
                  <div className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-teal-500" /> {f}
                      </div>
                    ))}
                  </div>
                  <Link href="/book">
                    <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}>
                      Book Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Instant Estimate Calculator */}
          <Card className="border-0 shadow-xl max-w-4xl mx-auto overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-teal-400 to-cyan-500" />
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Instant Estimate Calculator</h2>
                  <p className="text-slate-500 text-sm">Get a rough estimate in seconds</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label className="mb-2 block font-semibold">Service Type</Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(basePrices).map(([key, val]) => (
                          <SelectItem key={key} value={key}>{val.label} - ${val.base}+</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block font-semibold">Bedrooms: {bedrooms[0]}</Label>
                    <Slider value={bedrooms} onValueChange={setBedrooms} min={1} max={6} step={1} className="mt-2" />
                  </div>
                  <div>
                    <Label className="mb-2 block font-semibold">Bathrooms: {bathrooms[0]}</Label>
                    <Slider value={bathrooms} onValueChange={setBathrooms} min={1} max={5} step={1} className="mt-2" />
                  </div>
                  <div>
                    <Label className="mb-2 block font-semibold">Square Feet: {sqft[0].toLocaleString()}</Label>
                    <Slider value={sqft} onValueChange={setSqft} min={500} max={5000} step={100} className="mt-2" />
                  </div>
                  <div>
                    <Label className="mb-2 block font-semibold">Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">One-time</SelectItem>
                        <SelectItem value="monthly">Monthly (5% off)</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly (10% off)</SelectItem>
                        <SelectItem value="weekly">Weekly (15% off)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <div className="space-y-3 mb-6">
                    <Label className="font-semibold block">Add-Ons:</Label>
                    {addOnsList.map((addon) => (
                      <label key={addon.id} className="flex items-center gap-3 cursor-pointer">
                        <Checkbox checked={addOns.includes(addon.id)} onCheckedChange={() => toggleAddOn(addon.id)} />
                        <span className="text-sm text-slate-600">{addon.label}</span>
                        <span className="text-sm text-slate-400 ml-auto">+${addon.price}</span>
                      </label>
                    ))}
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Your Estimate</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-slate-600">Base ({basePrices[service]?.label})</span><span className="font-medium">${basePrice}</span></div>
                      <div className="flex justify-between"><span className="text-slate-600">Size adjustment</span><span className="font-medium">+${Math.round(basePrice * sizeMultiplier - basePrice + roomsExtra)}</span></div>
                      {addOnsTotal > 0 && <div className="flex justify-between"><span className="text-slate-600">Add-ons</span><span className="font-medium">+${addOnsTotal}</span></div>}
                      {discount > 0 && <div className="flex justify-between text-teal-600"><span>Recurring discount</span><span>-{Math.round(discount * 100)}%</span></div>}
                      <div className="border-t pt-3 mt-3 flex justify-between">
                        <span className="font-bold text-lg">Estimated Total</span>
                        <span className="font-bold text-2xl text-teal-600">${total}</span>
                      </div>
                    </div>
                    <Link href="/book" className="block mt-4">
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                        Book at This Price <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <p className="text-xs text-slate-400 mt-2 text-center">*Final price may vary. We'll confirm before starting.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
