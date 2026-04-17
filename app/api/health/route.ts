import { NextResponse } from 'next/server'
import { listCountries } from '@/lib/rates'

export const maxDuration = 5

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    countries_covered: listCountries().length,
    timestamp: new Date().toISOString(),
  })
}
