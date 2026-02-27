'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  Sparkles, Shield, Leaf, UserCheck, Award, Star, ArrowRight, Phone,
  CheckCircle, Clock, Home, Building2, Truck, Plane, HardHat, Zap,
  MapPin, Calendar, ThumbsUp, Heart, Car
} from 'lucide-react'

const services = [
  { title: 'Standard Cleaning', desc: 'Regular maintenance to keep your home fresh and tidy every week.', icon: Home, price: 'From $99', color: 'from-teal-400 to-cyan-500' },
  { title: 'Deep Cleaning', desc: 'Thorough top-to-bottom clean for a spotless, refreshed space.', icon: Zap, price: 'From $199', color: 'from-violet-400 to-purple-500' },
  { title: 'Move-In/Move-Out', desc: 'Get your full deposit back with our comprehensive clean.', icon: Truck, price: 'From $249', color: 'from-orange-400 to-pink-500' },
  { title: 'Office & Commercial', desc: 'Professional workspace cleaning for productive environments.', icon: Building2, price: 'From $149', color: 'from-blue-400 to-indigo-500' },
  { title: 'Airbnb & Turnover', desc: 'Quick turnaround cleaning between guests. Always 5-star ready.', icon: Plane, price: 'From $129', color: 'from-emerald-400 to-teal-500' },
  { title: 'Post-Construction', desc: 'Dust-free and spotless after any renovation or build project.', icon: HardHat, price: 'From $299', color: 'from-amber-400 to-orange-500' },
  { title: 'Interior Car Deep Cleaning', desc: 'Chemical-free steam sanitizing, stain removal, odor treatment & pet hair removal.', icon: Car, price: 'From $129', color: 'from-slate-500 to-slate-700' },
]

const testimonials = [
  { name: 'Sarah M.', location: 'Downtown', rating: 5, text: 'Absolutely incredible attention to detail! My apartment has never looked this clean. The team was professional, on time, and so thorough. Will definitely be booking again!' },
  { name: 'James W.', location: 'Midtown', rating: 5, text: 'Best cleaning service in the area, hands down. They use eco-friendly products and my home smells amazing after every visit. Highly recommend their deep cleaning package!' },
  { name: 'Maria L.', location: 'West Side', rating: 5, text: 'They completely transformed my apartment before my move-out inspection. Got my full deposit back! The before and after was unbelievable.' },
]

const faqs = [
  { q: 'What\'s included in a standard cleaning?', a: 'Our standard cleaning includes dusting all surfaces, vacuuming and mopping floors, cleaning bathrooms (tub, toilet, sink, mirrors), kitchen cleaning (counters, appliances exterior, sink), and tidying up common areas. We bring all supplies and equipment.' },
  { q: 'Are your cleaning products pet-safe and eco-friendly?', a: 'Yes! We exclusively use eco-friendly, non-toxic cleaning products that are safe for children, pets, and the environment. Our products are EPA Safer Choice certified.' },
  { q: 'How do I reschedule or cancel a booking?', a: 'You can reschedule or cancel for free up to 24 hours before your appointment. Just call us or email, and we\'ll take care of it right away.' },
  { q: 'Do you bring your own cleaning supplies?', a: 'Absolutely! Our teams arrive fully equipped with all professional-grade supplies and equipment. You don\'t need to provide anything.' },
  { q: 'Are your cleaners background-checked?', a: 'Yes, every team member undergoes thorough background checks, is fully trained, bonded, and insured for your peace of mind.' },
  { q: 'Do you offer discounts?', a: 'Yes! First-time clients get 15% off. We also offer 10% off for bi-weekly cleanings and 15% off for weekly recurring services.' },
]

const stats = [
  { value: '500+', label: 'Happy Clients', icon: Heart },
  { value: '4.9★', label: 'Average Rating', icon: Star },
  { value: '2,000+', label: 'Cleanings Done', icon: Sparkles },
  { value: '100%', label: 'Satisfaction Rate', icon: ThumbsUp },
]

const trustBadges = [
  { icon: Shield, label: 'Licensed & Insured' },
  { icon: Leaf, label: 'Eco-Friendly Products' },
  { icon: UserCheck, label: 'Background-Checked' },
  { icon: Award, label: '100% Satisfaction' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-40 right-1/4 w-48 h-48 bg-orange-300/15 rounded-full blur-2xl animate-pulse-glow" />
          <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-teal-300/10 rounded-full blur-3xl animate-float" />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-sm px-4 py-1.5">
                  ✨ Trusted by 500+ Happy Clients
                </Badge>
                <Badge className="bg-green-500/90 text-white border-green-400 hover:bg-green-500 text-sm px-4 py-1.5">
                  🎉 First-Time Clients 15% Off!
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Professional{' '}
                <span className="bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 bg-clip-text text-transparent">
                  Steam Cleaning & Sanitizing
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/85 max-w-xl mb-8 leading-relaxed">
                Deep cleaning, move-out cleaning, and chemical-free steam for homes, offices, and cars. Licensed & insured. Serving Cedar Rapids & surrounding areas.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/quote">
                  <Button size="lg" className="bg-white text-teal-700 hover:bg-white/90 font-semibold text-base px-8 h-13 shadow-xl shadow-black/10">
                    Get a Free Quote
                  </Button>
                </Link>
                <Link href="/book">
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold text-base px-8 h-13 shadow-xl shadow-orange-500/30">
                    Book Now <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                    <div className="text-2xl font-bold">{s.value}</div>
                    <div className="text-white/70 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-xl" />
                <img
                  src="https://images.pexels.com/photos/6195951/pexels-photo-6195951.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Professional cleaning service"
                  className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Verified & Insured</div>
                    <div className="text-sm text-slate-500">All staff background-checked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C360,100 720,20 1440,60 L1440,100 L0,100 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-3 justify-center">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <badge.icon className="w-5 h-5 text-teal-600" />
                </div>
                <span className="font-semibold text-slate-700 text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - from poster */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 border-teal-200 text-teal-700">Why Choose Us?</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Why Choose Us?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              'High-Temperature Steam Sanitizing',
              'Bathroom & Kitchen Deep Cleaning',
              'Grout & Tile Restoration',
              'Pet & Odor Treatment',
              'Licensed & Insured',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm border border-slate-100">
                <CheckCircle className="w-6 h-6 text-teal-500 shrink-0" />
                <span className="font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 border-teal-200 text-teal-700">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Cleaning Solutions for{' '}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">Every Need</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              From regular maintenance to specialized deep cleans, we have the perfect service for you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{service.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">{service.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-600">{service.price}</span>
                    <Link href="/services" className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services">
              <Button variant="outline" size="lg" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                View All Services <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-teal-500/20 text-teal-300 border-teal-500/30">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Booking Is <span className="text-teal-400">Easy as 1-2-3</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">Get your space cleaned in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Book Online', desc: 'Choose your service, pick a date, and book in under 30 seconds.', icon: Calendar },
              { step: '02', title: 'We Clean', desc: 'Our professional team arrives on time with all supplies needed.', icon: Sparkles },
              { step: '03', title: 'You Relax', desc: 'Enjoy your spotless, fresh-smelling space. Satisfaction guaranteed.', icon: Heart },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="relative mx-auto mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
                    <item.icon className="w-9 h-9 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 border-teal-200 text-teal-700">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              What Our <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">Clients Say</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${i === 0 ? 'from-teal-400 to-cyan-500' : i === 1 ? 'from-violet-400 to-purple-500' : 'from-orange-400 to-pink-500'}`} />
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{t.name}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/reviews">
              <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                Read All Reviews <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Before/After Placeholder */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 border-teal-200 text-teal-700">Our Results</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">See the Sparkright Difference</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { label: 'Kitchen Deep Clean', img: 'https://images.pexels.com/photos/9462732/pexels-photo-9462732.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
              { label: 'Living Room Refresh', img: 'https://images.pexels.com/photos/15031992/pexels-photo-15031992.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
              { label: 'Office Space Clean', img: 'https://images.pexels.com/photos/245219/pexels-photo-245219.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
            ].map((item, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden shadow-lg">
                <img src={item.img} alt={item.label} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="text-white font-semibold">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Serving Cedar Rapids & Surrounding Areas</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">We proudly serve Cedar Rapids and the surrounding communities.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Cedar Rapids', 'Marion', 'Hiawatha', 'North Liberty', 'Coralville', 'Iowa City', 'Surrounding Areas'].map((area) => (
              <Badge key={area} className="bg-white/20 text-white border-white/30 text-sm px-4 py-1.5">{area}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 border-teal-200 text-teal-700">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-left font-semibold text-slate-700 hover:text-teal-600">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for a <span className="text-teal-400">Spotless Space</span>?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Join 500+ happy clients who trust Sparkright Cleaning for their cleaning needs.
              Book your first cleaning today and see the difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/book">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold text-base px-8 h-13 shadow-xl shadow-orange-500/30">
                  Book Your Cleaning <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/quote">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 h-13">
                  Get a Free Quote
                </Button>
              </Link>
            </div>
            <p className="text-slate-500 text-sm mt-6 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Or call / text us at <a href="tel:+14255507241" className="text-teal-400 hover:underline">425-550-7241</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
