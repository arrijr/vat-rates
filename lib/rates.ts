import rawData from '@/data/vat-rates.json'

export const CATEGORIES = [
  'food',
  'books',
  'medicine',
  'digital_services',
  'hotel',
  'transport',
  'restaurant',
  'clothing',
  'children_clothing',
  'periodicals',
] as const

export type Category = (typeof CATEGORIES)[number]
export type RateType = 'standard' | 'reduced' | 'super_reduced' | 'zero' | 'parking'

export type CountryRates = {
  country: string
  country_name: string
  currency: string
  standard_rate: number
  reduced_rates: number[]
  super_reduced_rate: number | null
  zero_rate: boolean
  parking_rate: number | null
  categories: Record<Category, number>
  last_updated: string
}

type RatesData = Record<string, CountryRates>

const data: RatesData = rawData as RatesData

export function getCountry(code: string): CountryRates | null {
  const key = code.toUpperCase()
  return data[key] ?? null
}

export function listCountries(): string[] {
  return Object.keys(data)
}

export function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value)
}

export function classifyRate(country: CountryRates, rate: number): RateType {
  if (rate === country.standard_rate) return 'standard'
  if (country.super_reduced_rate !== null && rate === country.super_reduced_rate) return 'super_reduced'
  if (country.parking_rate !== null && rate === country.parking_rate) return 'parking'
  if (rate === 0) return 'zero'
  if (country.reduced_rates.includes(rate)) return 'reduced'
  return 'reduced'
}
