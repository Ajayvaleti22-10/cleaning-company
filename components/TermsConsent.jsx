'use client'

import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'

export default function TermsConsent({ checked, onCheckedChange }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <Checkbox
          id="accept_terms"
          checked={checked}
          onCheckedChange={onCheckedChange}
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
    </div>
  )
}
