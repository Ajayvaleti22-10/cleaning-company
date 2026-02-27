import './globals.css'
import ClientLayout from '@/components/ClientLayout'

export const metadata = {
  title: 'Sparkright Cleaning | Professional Steam Cleaning & Sanitizing',
  description: 'Professional steam cleaning and sanitizing. Deep cleaning, move-out cleaning, chemical-free steam. Licensed & insured. Serving Cedar Rapids & surrounding areas.',
  keywords: 'cleaning service, steam cleaning, deep cleaning, move out cleaning, car interior cleaning, Cedar Rapids cleaning, eco-friendly cleaning',
  openGraph: {
    title: 'Sparkright Cleaning | Professional Steam Cleaning & Sanitizing',
    description: 'Professional steam cleaning and sanitizing. Licensed & insured. Serving Cedar Rapids & surrounding areas.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sparkright Cleaning',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sparkright Cleaning | Professional Steam Cleaning & Sanitizing',
    description: 'Professional steam cleaning and sanitizing. Licensed & insured. Serving Cedar Rapids & surrounding areas.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Sparkright Cleaning',
              description: 'Professional steam cleaning and sanitizing. Deep cleaning, move-out, interior car deep cleaning.',
              telephone: '425-550-7241',
              email: 'vianneymuhoza13@gmail.com',
              address: { '@type': 'PostalAddress', addressLocality: 'Cedar Rapids', addressRegion: 'IA' },
              priceRange: '$$',
              aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '500' },
            }),
          }}
        />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
