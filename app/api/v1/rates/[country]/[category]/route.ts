import { NextRequest, NextResponse } from 'next/server'
import { checkRapidApiProxy } from '@/lib/auth'
import { checkRateLimit } from '@/lib/ratelimit'
import { categoryNotFound, countryNotFound, rateLimited } from '@/lib/errors'
import { classifyRate, getCountry, isCategory } from '@/lib/rates'

export const maxDuration = 10

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ country: string; category: string }> }
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

  const { country, category } = await params
  const code = (country ?? '').toUpperCase()
  const cat = (category ?? '').toLowerCase()

  const rlHeaders = { 'X-RateLimit-Remaining': String(rl.remaining) }

  const data = getCountry(code)
  if (!data) {
    return NextResponse.json(countryNotFound(code), { status: 404, headers: rlHeaders })
  }

  if (!isCategory(cat)) {
    return NextResponse.json(categoryNotFound(cat), { status: 404, headers: rlHeaders })
  }

  const rate = data.categories[cat]
  return NextResponse.json(
    {
      country: data.country,
      category: cat,
      rate,
      rate_type: classifyRate(data, rate),
      standard_rate: data.standard_rate,
    },
    { status: 200, headers: rlHeaders }
  )
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
