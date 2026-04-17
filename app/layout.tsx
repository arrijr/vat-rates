import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VAT Rates API',
  description: 'EU, UK & Swiss VAT rates with product category support',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
