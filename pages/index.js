import React, { useState } from 'react'
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
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <div className="flex flex-col justify-center items-center">
      <Head>
        <title>TDD App | HOME</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <input
          className="my-10 border-gray-500 border-2 rounded-lg"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          role="searchbox"
          type="text"
          title="Search"
          placeholder="Search products"
        />

        {searchTerm.length > 0 ? (
          <>
            <h2
              id="search-results-heading"
              className="text-xl font-bold"
            >Search results</h2>
            <ul aria-labelledby="search-results-heading" className="mt-10">
              {products
                .filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product) => {
                  return <li key={product.id} className="list-disc">{product.name}</li>;
                })}
            </ul>
          </>
        ) : (
          <>
            <ul aria-label="Categories">
              {categories.map((category) => {
                return (
                  <li aria-label="category" key={category.id}>
                    <h2 id={`category-${category.name}`} className="text-xl font-bold my-2">{category.name}</h2>
                    <ul aria-labelledby={`category-${category.name}`}>
                      {products
                        .filter((product) =>
                          product.categories.find((c) => c.id === category.id)
                        )
                        .map((product) => {
                          return <li key={product.id} className="list-disc">{product.name}</li>;
                        })}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <h2
              id="all-products-heading"
              className="text-xl my-10 font-bold"
            >All Products</h2>
            <ul aria-labelledby="all-products-heading">
              {products.map((product) => {
                return <li key={product.id} className="list-disc">{product.name}</li>;
              })}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}
