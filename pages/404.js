import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push("/")
        }, 5000)
    }, [router])

    return (
        <div
            className="flex flex-col justify-center items-center w-full h-[calc(100vh_-_104px)] text-center"
            role="404"
        >
            <h1 className="text-6xl w-3/5 mx-auto">
                {`The page you’re looking for can’t be found.`}
            </h1>
            <p className="my-10">You will be redirected to the Homepage in 5 seconds...</p>
            <Link href="/">
                <a className="flex flex-col items-center justify-center border border-black bg-white text-center text-black rounded-full p-4 w-44 h-12 text-md hover:bg-black transition duration-300 hover:text-white hover:border-white">
                    Go to homepage
                </a>
            </Link>
        </div>
    );
}

export default NotFound;