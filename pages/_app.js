import { useEffect, useState } from "react";
import commerce from "../lib/commerce";
import "../styles/globals.css";
import Layout from "../components/Layout/Layout";


function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState();
  const [products, setProduct] = useState();
  const [searchTerm, setSearchTerm] = useState("")
  const [searchbarState, setSearchbarState] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const { data: products } = await commerce.products.list();
      const response = await commerce.cart.retrieve();
      setProduct(products)
      setCart(response);
    }
    fetchData()
  }, []);
  //

  const addToCart = async (productID) => {
    const response = await commerce.cart.add(productID, 1);
    setCart(response.cart);
    return;
  };

  //  update  item's quantity in cart
  const updateQuantity = async (quantity, productID) => {
    let response = await commerce.cart.update(productID, {
      quantity: quantity,
    });
    setCart(response.cart);
    return;
  };

  //  remove  item  from cart
  const removeItem = async (productID) => {
    let response = await commerce.cart.remove(productID);
    setCart(response.cart);
    return;
  };

  //    empty the cart
  const emptyCart = async () => {
    let response = await commerce.cart.empty();
    setCart(response.cart);
  };

  //    refresh the  cart
  const refreshCart = async () => {
    let response = await commerce.cart.refresh();
    setCart(response);
  };

  //
  return (
    <>
      <Layout
        cart={cart}
        products={products}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchbarState={searchbarState}
        setSearchbarState={setSearchbarState}
      >
        <Component
          {...pageProps}
          cart={cart}
          searchTerm={searchTerm}
          searchbarState={searchbarState}
          setSearchbarState={setSearchbarState}
          addToCart={addToCart}
          emptyCart={emptyCart}
          refreshCart={refreshCart}
          removeItem={removeItem}
          updateQuantity={updateQuantity}
        />
      </Layout>
    </>
  );
}

export default MyApp;