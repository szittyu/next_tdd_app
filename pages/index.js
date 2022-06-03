import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>TDD App | HOME</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold underline">Welcome to my page</h1>

    </div>
  )
}
