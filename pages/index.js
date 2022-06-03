import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>TDD App | HOME</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-center text-4xl mb-10 font-medium">Welcome to my page</h1>

    </div>
  )
}
