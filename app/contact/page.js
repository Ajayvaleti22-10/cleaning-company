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
import { toast } from 'sonner'
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react'

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    termsAccepted: false,
    _honey: '',
  })

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  const canSubmit = useMemo(() => {
    return Boolean(form.name) && Boolean(form.email) && Boolean(form.message) && form.termsAccepted && !loading
  }, [form.name, form.email, form.message, form.termsAccepted, loading])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form._honey) return

    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'your_web3forms_key_here') {
      toast.error('Contact form is not configured. Please try again later.')
      return
    }

    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in required fields.')
      return
    }

    if (!form.termsAccepted) {
      toast.error('Please accept the Terms of Service to submit your message.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Contact: ${form.subject || 'Website Inquiry'}`,
          from_name: 'Sparkright Cleaning Website',
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          terms_accepted: 'yes',
          source_page: '/contact',
          message: `New contact message:
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone || 'Not provided'}
Subject: ${form.subject || 'Website Inquiry'}

Message:
${form.message}`,
        }),
      })

      const data = await res.json().catch(() => null)

      // Treat success properly:
      if (res.ok && data && data.success) {
        setSubmitted(true)
        toast.success('Message sent!')
        setForm({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          termsAccepted: false,
          _honey: '',
        })
        return
      }

      // If API failed, still show a friendly confirmation (your original behavior)
      setSubmitted(true)
      toast.success("Message received! We'll be in touch.")
    } catch {
      setSubmitted(true)
      toast.success("Message received! We'll be in touch.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">Contact Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-white/80 max-w-xl mx-auto">Have questions? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              {[
                { icon: Phone, label: 'Call / Text', value: '425-550-7241', href: 'tel:+14255507241' },
                { icon: Mail, label: 'Email', value: 'vianneymuhoza13@gmail.com', href: 'mailto:vianneymuhoza13@gmail.com' },
                { icon: MapPin, label: 'Service Area', value: 'Serving Cedar Rapids & Surrounding Areas' },
              ].map((c, i) => (
                <Card key={i} className="border-0 shadow-md">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shrink-0">
                      <c.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-teal-600 hover:underline text-sm">
                          {c.value}
                        </a>
                      ) : (
                        <div className="text-slate-500 text-sm whitespace-pre-line">{c.value}</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl">
                <div className="h-2 bg-gradient-to-r from-teal-400 to-cyan-500" />
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-slate-500">We'll get back to you within 24 hours.</p>
                      <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                        Send another message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Phone</Label>
                          <Input
                            type="tel"
                            placeholder="425-550-7241"
                            value={form.phone}
                            onChange={(e) => update('phone', e.target.value)}
                            className="mt-1"
                            autoComplete="tel"
                          />
                        </div>
                        <div>
                          <Label>Subject</Label>
                          <Input
                            placeholder="General Inquiry"
                            value={form.subject}
                            onChange={(e) => update('subject', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Message *</Label>
                        <Textarea
                          placeholder="How can we help you?"
                          value={form.message}
                          onChange={(e) => update('message', e.target.value)}
                          className="mt-1"
                          rows={5}
                          required
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
                        {!form.termsAccepted && (
                          <p className="mt-2 text-xs text-slate-500">You must accept the Terms to submit this form.</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={!canSubmit}
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white h-12 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                          </>
                        ) : (
                          <>
                            Send Message <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
