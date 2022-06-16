import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function Layout({ children, cart, products, searchTerm, setSearchTerm, searchbarState, setSearchbarState }) {
    return (
        <div
            className=""
        >
            <div className="">
                <Navbar
                    cart={cart}
                    products={products}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    searchbarState={searchbarState}
                    setSearchbarState={setSearchbarState}
                />
                {children}
                <Footer />
            </div>
        </div>
    )
}