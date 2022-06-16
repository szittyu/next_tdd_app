import React from 'react'
import commerce from '../lib/commerce';
import ProductCard from '../components/Product/ProductCard';

export async function getStaticProps(context) {
    const { data: products } = await commerce.products.list();

    return {
        props: { products },
        revalidate: 30,
    };
}

export default function All({ products, addToCart }) {
    return (
        <div className="flex flex-col justify-center pt-16 w-full">
            <h1 className="w-full text-8xl text-center my-20">All</h1>
            <ul
                className="grid grid-cols-3 justify-center items-center mx-8" aria-labelledby="all-products-heading">
                {products.map((product) => {
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
        </div>
    )
}
