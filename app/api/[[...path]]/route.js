import { NextResponse } from 'next/server'

// Minimal API route for static site
// All form submissions go directly to Web3Forms from the client

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Sparkright Cleaning - Static Site' })
}

export async function POST() {
  return NextResponse.json({ status: 'ok', message: 'This is a static site. Forms submit directly to Web3Forms.' })
}
