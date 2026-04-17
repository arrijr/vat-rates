export default function Home() {
  return (
    <main style={{ fontFamily: 'monospace', padding: '2rem', maxWidth: '600px' }}>
      <h1>VAT Rates API</h1>
      <p>EU, UK &amp; Swiss VAT rates with product category support.</p>
      <h2>Endpoints</h2>
      <ul>
        <li><code>GET /api/v1/rates/:country</code> — All VAT rates for a country</li>
        <li><code>GET /api/v1/rates/:country/:category</code> — Rate for a product category</li>
        <li><code>GET /api/health</code> — Service health</li>
      </ul>
      <p>
        Available on{' '}
        <a href="https://rapidapi.com" target="_blank" rel="noreferrer">RapidAPI</a>.
      </p>
    </main>
  )
}
