import React from 'react'
import Link from 'next/link';
import commerce from '../../lib/commerce';

export async function getStaticProps(context) {
    const { data: products } = await commerce.products.list();
    const { data: categories } = await commerce.categories.list();

    return {
        props: { products, categories },
        revalidate: 30,
    };
}

export default function Categories({ products, categories }) {
    return (
        <div className="w-full pt-16">
            <h2>Choose one form these categories</h2>
            <div>
                <Link href="/categories/kitchen"><a>Kitchen</a></Link>
                <Link href="/categories/tech"><a>Tech</a></Link>
                <Link href="/categories/work"><a>Work</a></Link>
            </div>
        </div>
    )
}
