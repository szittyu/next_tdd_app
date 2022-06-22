import commerce from '../../lib/commerce';
import Image from 'next/image';

// This function gets called at build time on server-side.
export async function getStaticPaths() {
    const { data: products } = await commerce.products.list();

    return {
        paths: products.map((product) => ({
            params: {
                permalink: product.permalink,
            },
        })),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { permalink } = params;

    const product = await commerce.products.retrieve(permalink, {
        // Must include a type value
        type: 'permalink'
    });

    return {
        props: {
            product,
        },

        revalidate: 60,
    }
}

const ProductDetailPage = ({ product, addToCart }) => {

    return (
        <div className="pt-16 px-10 w-full">
            <div className="flex flex-row mt-10 w-full h-full">
                <div className="flex flex-col justify-center mr-10 bg-gray-100 rounded-2xl items-center mx-auto w-3/5 h-auto">
                    <Image src={product.image.url} width="600" height="600" alt="image" />
                </div>
                <div className="flex flex-col w-2/5 h-auto items-left justify-center px-10">
                    <h1 className="text-5xl">{product.name}</h1>
                    <div className="my-6 text-xl">
                        {product.price.formatted_with_code}
                    </div>
                    <div
                        className="text-lg tracking-wide mb-6"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    ></div>
                    <button
                        className="border-2 bg-gray-200 rounded-full w-28 h-10 hover:bg-black transition duration-300 hover:text-white"
                        onClick={() => addToCart(product.id)}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div >
    )
}

export default ProductDetailPage;