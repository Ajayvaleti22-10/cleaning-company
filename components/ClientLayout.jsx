'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Toaster } from '@/components/ui/sonner'
import { Menu, Phone, Mail, MapPin, Facebook, Instagram, Twitter, ArrowRight, Sparkles } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function ClientLayout({ children }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isAdmin) return <>{children}<Toaster richColors /></>

  return (
    <>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              {logoError ? (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-200 group-hover:shadow-teal-300 transition-shadow">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              ) : (
                <img src="/logo.png" alt="Sparkright Cleaning" className="h-10 w-auto object-contain" onError={() => setLogoError(true)} />
              )}
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Sparkright Cleaning
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === item.href
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-slate-600 hover:text-teal-600 hover:bg-teal-50/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Link href="/quote">
                <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/book">
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-200 hover:shadow-orange-300">
                  Book Now <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon"><Menu className="w-6 h-6" /></Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-2 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        pathname === item.href
                          ? 'text-teal-600 bg-teal-50'
                          : 'text-slate-600 hover:text-teal-600 hover:bg-teal-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="mt-4 flex flex-col gap-3">
                    <Link href="/quote" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full border-teal-200 text-teal-700">Get a Quote</Button>
                    </Link>
                    <Link href="/book" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                        Book Now <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {logoError ? (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <img src="/logo.png" alt="Sparkright Cleaning" className="h-10 w-auto object-contain" onError={() => setLogoError(true)} />
                )}
                <span className="text-xl font-bold">Sparkright Cleaning</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Professional steam cleaning & sanitizing. Licensed, insured, and committed to making your space shine.
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-700 hover:bg-teal-500 flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Home', 'Services', 'Pricing', 'Reviews', 'About', 'Contact'].map((l) => (
                  <Link key={l} href={l === 'Home' ? '/' : `/${l.toLowerCase()}`} className="text-slate-400 hover:text-teal-400 text-sm transition-colors">{l}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Our Services</h4>
              <div className="flex flex-col gap-2">
                {['Standard Cleaning', 'Deep Cleaning', 'Move-In/Out', 'Office Cleaning', 'Airbnb Turnover', 'Post-Construction', 'Interior Car Deep Cleaning'].map((s) => (
                  <Link key={s} href="/services" className="text-slate-400 hover:text-teal-400 text-sm transition-colors">{s}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="flex flex-col gap-3 text-sm text-slate-400">
                <div className="flex items-center gap-2" suppressHydrationWarning><Phone className="w-4 h-4 text-teal-400" /><a href="tel:+14255507241" className="hover:text-teal-400">425-550-7241</a></div>
                <div className="flex items-center gap-2" suppressHydrationWarning><Mail className="w-4 h-4 text-teal-400" /><a href="mailto:vianneymuhoza13@gmail.com" className="hover:text-teal-400">vianneymuhoza13@gmail.com</a></div>
                <div className="flex items-center gap-2" suppressHydrationWarning><MapPin className="w-4 h-4 text-teal-400" /><span>Serving Cedar Rapids & Surrounding Areas</span></div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm" suppressHydrationWarning>&copy; 2025 Sparkright Cleaning. All rights reserved.</p>
            <div className="flex gap-4 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA - Mobile */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <a href="tel:+14255507241" className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-xl shadow-teal-300/40 hover:shadow-teal-300/60 transition-shadow">
          <Phone className="w-5 h-5" />
          <span className="font-semibold text-sm">Call Now</span>
        </a>
      </div>

      <Toaster richColors />
    </>
  )
}
