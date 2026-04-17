import { NextRequest, NextResponse } from 'next/server'
import { checkRapidApiProxy } from '@/lib/auth'
import { checkRateLimit } from '@/lib/ratelimit'
import { countryNotFound, rateLimited } from '@/lib/errors'
import { getCountry } from '@/lib/rates'

export const maxDuration = 10

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ country: string }> }
) {
  const forbidden = checkRapidApiProxy(req)
  if (forbidden) return forbidden

  const rl = await checkRateLimit(req)
  if (!rl.allowed) {
    const retry = Math.ceil((rl.reset - Date.now()) / 1000)
    return NextResponse.json(rateLimited(retry), {
      status: 429,
      headers: {
        'Retry-After': String(retry),
        'X-RateLimit-Remaining': '0',
      },
    })
  }

  const { country } = await params
  const code = (country ?? '').toUpperCase()
  const data = getCountry(code)
  if (!data) {
    return NextResponse.json(countryNotFound(code), {
      status: 404,
      headers: { 'X-RateLimit-Remaining': String(rl.remaining) },
    })
  }

  return NextResponse.json(data, {
    status: 200,
    headers: { 'X-RateLimit-Remaining': String(rl.remaining) },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-RapidAPI-Key',
    },
  })
}
