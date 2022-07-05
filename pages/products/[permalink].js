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
            <div className="flex flex-col mt-10 w-full h-full md:flex-row">
                <div className="flex flex-col justify-center items-center bg-gray-100 rounded-2xl mx-auto h-auto 
                md:mr-10 md:w-3/5">
                    <Image src={product.image.url} width="600" height="600" alt="image" />
                </div>
                <div className="flex flex-col w-4/5 h-auto justify-center pt-5 md:px-10 md:w-2/5">
                    <h1 className="text-3xl md:text-5xl">{product.name}</h1>
                    <div className="my-5 text-xl">
                        {product.price.formatted_with_code}
                    </div>
                    <div className="flex flex-col-reverse justify-center items-left md:flex-col">
                        <div
                            className="text-lg tracking-wide pb-20"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        ></div>
                        <button
                            className="flex justify-center items-center border-2 bg-black text-white rounded-full mb-5 w-32 h-12 text-md hover:bg-white transition duration-300 hover:text-black hover:border-black md:text-xl md:w-44 md:h-16"
                            onClick={() => addToCart(product.id)}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductDetailPage;