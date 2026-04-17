export type ApiError = {
  error: string
  code: string
  details?: Record<string, unknown>
  retry_after?: number
}

export function badRequest(message: string, code = 'BAD_REQUEST'): ApiError {
  return { error: message, code }
}

export function countryNotFound(country: string): ApiError {
  return { error: `Country '${country}' is not supported`, code: 'COUNTRY_NOT_FOUND' }
}

export function categoryNotFound(category: string): ApiError {
  return { error: `Category '${category}' is not supported`, code: 'CATEGORY_NOT_FOUND' }
}

export function rateLimited(retryAfter: number): ApiError {
  return { error: 'Rate limit exceeded', code: 'RATE_LIMITED', retry_after: retryAfter }
}
