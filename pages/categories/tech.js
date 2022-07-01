import React from 'react'
import commerce from '../../lib/commerce';
import ProductCard from '../../components/Product/ProductCard';
import { Fade } from "react-awesome-reveal";

export async function getStaticProps(context) {
    const { data: products } = await commerce.products.list();

    return {
        props: { products },
        revalidate: 30,
    };
}


export default function Kitchen({ products }) {
    const kitchenProducts = products.filter(prod => prod.categories[0].slug === "tech")

    return (
        <div className="pt-16">
            <h1 className="w-full text-8xl text-center my-10">Tech</h1>
            <ul className="grid grid-cols-3 justify-center items-center mx-8">
                {kitchenProducts.map((product) => {
                    return (
                        <Fade key={product.id} triggerOnce duration={1500}>
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
                        </Fade>
                    );
                })}
            </ul>
        </div>
    )
}
