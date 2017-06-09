import Head from 'next/head'

export default ({ children }) =>
  <div>
    <Head>
      <title>Fernando's Book Reviews</title>
    </Head>

    { children }

    <style jsx global>{`
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      }
    `}</style>
  </div>
