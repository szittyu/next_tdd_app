import React from 'react'
import commerce from '../lib/commerce'
import Head from 'next/head'

export async function getStaticProps(context) {
  const { data: products } = await commerce.products.list()
  const { data: categories } = await commerce.categories.list()

  return {
    props: { products, categories },
    revalidate: 30
  }
}


export default function Home({ products, categories }) {
  console.log(products, categories)
  return (
    <div className="flex flex-col justify-center items-center">
      <Head>
        <title>TDD App | HOME</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl mb-10 font-medium">Welcome to my page</h1>
      <input
        role="searchbox"
        type="text"
        title="Search"
        placeholder="Search products" />

    </div>
  )
}
