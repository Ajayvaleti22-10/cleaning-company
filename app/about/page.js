'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Heart, Shield, Leaf, Users, Target, Award, CheckCircle } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Passion for Clean', desc: 'We genuinely love what we do. Every space we clean is treated as if it were our own home.', color: 'from-pink-400 to-rose-500' },
  { icon: Shield, title: 'Trust & Reliability', desc: 'Licensed, insured, and background-checked. We show up on time, every time.', color: 'from-blue-400 to-indigo-500' },
  { icon: Leaf, title: 'Eco-Conscious', desc: 'We use only EPA-certified, non-toxic products that are safe for your family and the planet.', color: 'from-emerald-400 to-teal-500' },
  { icon: Target, title: 'Attention to Detail', desc: 'We don\'t cut corners. Our detailed checklists ensure nothing gets missed.', color: 'from-violet-400 to-purple-500' },
]

const team = [
  { name: 'Alexandra Rivers', role: 'Founder & CEO', bio: '10+ years in the cleaning industry. Started Sparkright Cleaning to bring premium quality to every home.' },
  { name: 'Marcus Chen', role: 'Operations Manager', bio: 'Ensures every cleaning meets our high standards. Quality control expert.' },
  { name: 'Sofia Martinez', role: 'Lead Cleaner', bio: 'Our most requested cleaner. Specializes in deep cleans and move-in/out services.' },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">More than a cleaning company — we're your trusted partners in creating healthy, beautiful spaces.</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Built on a Simple Promise: <span className="text-teal-600">Clean Done Right.</span></h2>
              <p className="text-slate-600 leading-relaxed mb-4">Sparkright Cleaning was founded with a clear mission: to deliver exceptional cleaning services that you can truly rely on. Tired of inconsistent quality, hidden fees, and no-show cleaners, our founder Alexandra set out to build a cleaning company that does things differently.</p>
              <p className="text-slate-600 leading-relaxed mb-4">Today, we serve over 500 happy clients across the metro area. Every team member is carefully vetted, extensively trained, and shares our passion for perfection.</p>
              <p className="text-slate-600 leading-relaxed">We use only eco-friendly, non-toxic products because we believe a clean home shouldn't come at the cost of your health or the environment.</p>
            </div>
            <div className="relative">
              <img src="https://images.pexels.com/photos/5217888/pexels-photo-5217888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Our eco-friendly cleaning supplies" className="rounded-2xl shadow-xl w-full h-[400px] object-cover" />
              <div className="absolute -bottom-6 -right-6 bg-teal-500 text-white rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-teal-100">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <Card key={i} className="border-0 shadow-md text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mx-auto mb-4`}>
                    <v.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Meet Our Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((t, i) => (
              <Card key={i} className="border-0 shadow-md text-center hover:shadow-lg transition-shadow overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${i === 0 ? 'from-teal-400 to-cyan-500' : i === 1 ? 'from-violet-400 to-purple-500' : 'from-orange-400 to-pink-500'}`} />
                <CardContent className="p-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-bold text-slate-800">{t.name}</h3>
                  <p className="text-sm text-teal-600 font-medium mb-3">{t.role}</p>
                  <p className="text-sm text-slate-500">{t.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Our Quality Promise</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">If you're not 100% satisfied with your cleaning, we'll come back and re-clean for free. No questions asked. That's our Sparkright Guarantee.</p>
          <Link href="/book"><Button size="lg" className="bg-white text-teal-700 hover:bg-white/90 font-semibold">Book With Confidence <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
        </div>
      </section>
    </div>
  )
}
