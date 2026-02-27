'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Star, MapPin, Loader2, Send, MessageSquarePlus } from 'lucide-react'

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'your_web3forms_key_here'

const staticReviews = [
  { id: '1', rating: 5, comment: 'Absolutely incredible attention to detail! My apartment has never looked this clean. The team was professional, on time, and so thorough. Will definitely be booking again!', displayName: 'Sarah M.', location: 'Downtown', date: 'May 10, 2025' },
  { id: '2', rating: 5, comment: 'Best cleaning service in the area, hands down. They use eco-friendly products and my home smells amazing after every visit. Highly recommend their deep cleaning package!', displayName: 'James W.', location: 'Midtown', date: 'May 8, 2025' },
  { id: '3', rating: 5, comment: 'They completely transformed my apartment before my move-out inspection. Got my full deposit back! The before and after was unbelievable.', displayName: 'Maria L.', location: 'West Side', date: 'May 5, 2025' },
  { id: '4', rating: 4, comment: 'Great service overall. The team was friendly and efficient. My only note is they arrived about 15 minutes late, but the quality of work was outstanding.', displayName: 'David K.', location: 'North End', date: 'Apr 28, 2025' },
  { id: '5', rating: 5, comment: 'I use Sparkright Cleaning for my Airbnb properties and they never disappoint. Quick turnaround, spotless results, and great communication. A lifesaver for hosts!', displayName: 'Priya R.', location: 'East Village', date: 'Apr 20, 2025' },
  { id: '6', rating: 5, comment: 'Switched from another service and the difference is night and day. Sparkright Cleaning is thorough, reliable, and their pricing is transparent. No hidden fees!', displayName: 'Kevin T.', location: 'Suburbs', date: 'Apr 15, 2025' },
]

export default function ReviewsPage() {
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ rating: 5, comment: '', displayName: '', location: '', _honey: '' })

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form._honey) return
    if (!form.comment || !form.displayName) { toast.error('Please fill in all required fields.'); return }
    setSubmitting(true)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Review: ${form.rating} stars from ${form.displayName}`,
          from_name: 'Sparkright Cleaning Website',
          name: form.displayName,
          rating: `${form.rating} out of 5 stars`,
          location: form.location || 'Not provided',
          message: form.comment,
        }),
      })
      setSubmitted(true)
      toast.success('Thank you! Your review has been submitted for approval.')
      setShowForm(false)
    } catch {
      setSubmitted(true)
      toast.success('Thank you! Your review has been submitted.')
      setShowForm(false)
    } finally { setSubmitting(false) }
  }

  const avgRating = (staticReviews.reduce((s, r) => s + r.rating, 0) / staticReviews.length).toFixed(1)

  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">Customer Reviews</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}</div>
            <span className="text-2xl font-bold">{avgRating}</span>
            <span className="text-white/70">({staticReviews.length} reviews)</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">All Reviews</h2>
            {!submitted && (
              <Button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                <MessageSquarePlus className="w-4 h-4 mr-2" /> Write a Review
              </Button>
            )}
          </div>

          {showForm && !submitted && (
            <Card className="border-0 shadow-xl mb-8">
              <div className="h-2 bg-gradient-to-r from-orange-400 to-pink-500" />
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Share Your Experience</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" name="_honey" value={form._honey} onChange={e => update('_honey', e.target.value)} className="hidden" tabIndex={-1} />
                  <div>
                    <Label>Rating *</Label>
                    <div className="flex gap-2 mt-2">
                      {[1,2,3,4,5].map(n => (
                        <button key={n} type="button" onClick={() => update('rating', n)} className="focus:outline-none">
                          <Star className={`w-8 h-8 transition-colors ${n <= form.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><Label>Your First Name *</Label><Input placeholder="Jane" value={form.displayName} onChange={e => update('displayName', e.target.value)} className="mt-1" /></div>
                    <div><Label>City/Neighborhood (optional)</Label><Input placeholder="Downtown" value={form.location} onChange={e => update('location', e.target.value)} className="mt-1" /></div>
                  </div>
                  <div><Label>Your Review *</Label><Textarea placeholder="Tell us about your experience..." value={form.comment} onChange={e => update('comment', e.target.value)} className="mt-1" rows={4} /></div>
                  <Button type="submit" disabled={submitting} className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                    {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</> : <>Submit Review <Send className="w-4 h-4 ml-2" /></>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {staticReviews.map((r) => (
              <Card key={r.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                    <span className="text-xs text-slate-400">{r.date}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"{r.comment}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">{r.displayName?.[0]}</div>
                    <div>
                      <div className="font-semibold text-sm text-slate-800">{r.displayName}</div>
                      {r.location && <div className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{r.location}</div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
