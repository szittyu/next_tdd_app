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
    const kitchenProducts = products.filter(prod => prod.categories[0].slug === "kitchen")

    return (
        <div className="pt-16">
            <h1 className="w-full text-8xl text-center my-10">Kitchen</h1>
            <ul className="grid grid-cols-1 justify-center items-center mx-4 md:grid-cols-3 md:mx-8">
                {kitchenProducts.map((product) => {
                    return (
                        <Fade key={product.id} triggerOnce duration={1500}>
                            <li
                                key={product.id}
                                className="mx-3 my-5 md:mx-5"
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
