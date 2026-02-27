'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Home, Zap, Truck, Building2, Plane, HardHat, Car, CheckCircle, Clock, DollarSign } from 'lucide-react'

const services = [
  {
    id: 'standard', title: 'Standard Cleaning', icon: Home, price: 'From $99',
    color: 'from-teal-400 to-cyan-500', duration: '2-3 hours',
    desc: 'Our most popular service. Regular maintenance cleaning to keep your home fresh, tidy, and welcoming every single week.',
    includes: ['Dust all surfaces & furniture', 'Vacuum & mop all floors', 'Clean bathrooms (tub, toilet, sink, mirrors)', 'Kitchen cleaning (counters, appliances, sink)', 'Empty trash cans', 'Make beds & tidy rooms'],
    addOns: ['Inside fridge (+$35)', 'Inside oven (+$30)', 'Laundry fold (+$25)', 'Interior windows (+$40)'],
  },
  {
    id: 'deep', title: 'Deep Cleaning', icon: Zap, price: 'From $199',
    color: 'from-violet-400 to-purple-500', duration: '4-6 hours',
    desc: 'A thorough top-to-bottom clean that reaches every corner, removing built-up grime and leaving your space truly refreshed.',
    includes: ['Everything in Standard Cleaning', 'Deep scrub bathrooms & kitchen', 'Clean inside appliances', 'Baseboard & trim cleaning', 'Light fixture dusting', 'Door & frame cleaning', 'Window sill cleaning'],
    addOns: ['Garage cleaning (+$75)', 'Patio/balcony (+$50)', 'Wall washing (+$60)'],
  },
  {
    id: 'moveinout', title: 'Move-In/Move-Out', icon: Truck, price: 'From $249',
    color: 'from-orange-400 to-pink-500', duration: '5-8 hours',
    desc: 'Comprehensive cleaning designed to get your full deposit back or prepare your new home for a fresh start.',
    includes: ['Everything in Deep Cleaning', 'Inside all cabinets & drawers', 'Inside all closets', 'All appliances inside & out', 'Window cleaning (interior)', 'Remove all marks & scuffs', 'Sanitize all surfaces'],
    addOns: ['Carpet steam clean (+$100)', 'Exterior windows (+$50)'],
  },
  {
    id: 'office', title: 'Office & Commercial', icon: Building2, price: 'From $149',
    color: 'from-blue-400 to-indigo-500', duration: '2-4 hours',
    desc: 'Professional workspace cleaning for productive, healthy environments. Customizable to your business needs.',
    includes: ['Desk & workstation cleaning', 'Floor cleaning (all types)', 'Restroom sanitization', 'Kitchen/break room cleaning', 'Trash removal & recycling', 'Glass & surface polishing'],
    addOns: ['After-hours service (+$25)', 'Window cleaning (+$60)', 'Carpet cleaning (+$80)'],
  },
  {
    id: 'airbnb', title: 'Airbnb & Turnover', icon: Plane, price: 'From $129',
    color: 'from-emerald-400 to-teal-500', duration: '2-3 hours',
    desc: 'Quick turnaround cleaning between guests. Always 5-star ready with our reliable, efficient service.',
    includes: ['Full standard clean', 'Fresh linen change', 'Restock essentials checklist', 'Photo-ready staging', 'Trash & recycling removal', 'Appliance check & clean'],
    addOns: ['Laundry service (+$30)', 'Inventory restock (+$20)', 'Deep clean add-on (+$70)'],
  },
  {
    id: 'construction', title: 'Post-Construction', icon: HardHat, price: 'From $299',
    color: 'from-amber-400 to-orange-500', duration: '6-10 hours',
    desc: 'Specialized cleaning after renovation or construction. We remove dust, debris, and residue for a move-in ready space.',
    includes: ['Remove all construction dust', 'Clean all surfaces thoroughly', 'Floor scrubbing & polishing', 'Window cleaning (all)', 'Fixture & hardware cleaning', 'Detail cleaning of all rooms', 'Final inspection walk-through'],
    addOns: ['Pressure washing (+$100)', 'Air duct cleaning (+$150)'],
  },
  {
    id: 'car', title: 'Interior Car Deep Cleaning', icon: Car, price: 'From $129',
    color: 'from-slate-500 to-slate-700', duration: '1-2 hours',
    desc: 'Chemical-free steam sanitizing for your vehicle interior. Seats, carpets, dashboard, and odor treatment—we leave your car fresh and spotless.',
    includes: ['Steam sanitizing (chemical-free)', 'Seat & carpet stain removal', 'Dashboard & console detailing', 'Odor treatment', 'Pet hair removal'],
    addOns: [],
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">Our Services</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Steam Cleaning & Sanitizing</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">Deep cleaning, move-out cleaning, chemical-free steam, and interior car deep cleaning. Licensed & insured.</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((s, i) => (
              <Card key={s.id} className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className={`h-2 bg-gradient-to-r ${s.color}`} />
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-2/3">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                            <s.icon className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-slate-800">{s.title}</h2>
                            <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {s.duration}</span>
                              <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {s.price}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-600 mb-6 leading-relaxed">{s.desc}</p>
                        <h3 className="font-semibold text-slate-800 mb-3">What's Included:</h3>
                        <div className="grid sm:grid-cols-2 gap-2 mb-6">
                          {s.includes.map((item, j) => (
                            <div key={j} className="flex items-center gap-2 text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 text-teal-500 shrink-0" /> {item}
                            </div>
                          ))}
                        </div>
                      </div>
                        <div className="lg:w-1/3">
                        <div className="bg-slate-50 rounded-xl p-6">
                          <h3 className="font-semibold text-slate-800 mb-3">Popular Add-Ons:</h3>
                          <div className="space-y-2 mb-6">
                            {s.addOns && s.addOns.length > 0 ? s.addOns.map((addon, j) => (
                              <div key={j} className="text-sm text-slate-600 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> {addon}
                              </div>
                            )) : <span className="text-sm text-slate-500">No add-ons for this service</span>}
                          </div>
                          <div className="text-2xl font-bold text-teal-600 mb-4">{s.price}</div>
                          <Link href="/book">
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                              Book This Service <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">Get a free personalized quote and we'll recommend the perfect cleaning plan for your space.</p>
          <Link href="/quote"><Button size="lg" className="bg-white text-teal-700 hover:bg-white/90 font-semibold px-8">Get a Free Quote <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
        </div>
      </section>
    </div>
  )
}
