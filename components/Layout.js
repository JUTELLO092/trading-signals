import Head from 'next/head';

export default function Layout({ children, title = 'Trading Signals' }) {
  return (
    <>
      <Head>
        <title>{title} | Bio-Medic Trading</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📈</text></svg>" />
      </Head>
      <div style={{ minHeight: '100vh', maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        {children}
      </div>
    </>
  );
}
