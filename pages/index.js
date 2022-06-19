import React from 'react'
import commerce from '../lib/commerce'
import ProductCard from "../components/Product/ProductCard";
import Head from 'next/head'
import Link from 'next/link';

export async function getStaticProps(context) {
  const { data: products } = await commerce.products.list();
  const { data: categories } = await commerce.categories.list();

  return {
    props: { products, categories },
    revalidate: 30,
  };
}


export default function Home({ products, categories, addToCart, searchTerm, searchbarState, setSearchbarState }) {

  return (
    <div className="flex flex-col justify-center items-center">
      <Head>
        <title>TDD App | HOME</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center items-center mt-16 w-full">
        <div className="w-full">
          <h1 className="w-full text-8xl font-medium text-center my-20">Online Store</h1>
          <div>
            {searchTerm.length > 0 && searchbarState === true ? (
              <>
                <h2
                  id="search-results-heading"
                  className="text-xl font-bold"
                >
                  Search results:
                </h2>
                <ul
                  aria-labelledby="search-results-heading"
                  className="grid grid-cols-3 justify-center items-center mx-8"
                >
                  {products
                    .filter((product) =>
                      product.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((product) => {
                      return <li
                        key={product.id}
                        className="mx-5 my-5"
                      >
                        <ProductCard
                          product={product}
                          addToCart={() => {
                            addToCart(product.id);
                          }}
                        />
                      </li>;
                    })}
                </ul>
              </>
            ) : (
              <>
                <ul
                  className="grid grid-cols-3 justify-center items-center mx-8" aria-labelledby="all-products-heading">
                  {products.slice(0, 6).map((product) => {
                    return (
                      <li
                        key={product.id}
                        className="mx-5 my-5"
                      >
                        <ProductCard
                          product={product}
                          addToCart={() => {
                            addToCart(product.id);
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
                <div className="flex flex-col items-center">
                  <Link href="/all">
                    <button
                      className="border-2 mt-10 border-black rounded-full w-44 h-14 hover:bg-black transition duration-300 hover:text-white"
                    >
                      See all products
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

      </main>
    </div>
  )
}
