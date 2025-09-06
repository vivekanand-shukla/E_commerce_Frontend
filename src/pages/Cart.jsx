import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useMainUrl } from "../customHooks/useMainUrl";
import { useFetch } from "../customHooks/useFetch";
import CartCard from "../components/CartCard";

const Cart = () => {
  const { mainUrl } = useMainUrl();
  const productsUrl = `/api/products`;
  const { data, loading, error } = useFetch(mainUrl, productsUrl, "GET");

  const [cartData, setCartData] = useState([]);




















  useEffect(() => {
    if (data) {
      setCartData(data.filter((d) => d.isAddedToCart === true));
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <Navbar  noOfCartItem ={cartData.length}/>
      <div className="container " style={{ paddingTop: "5%" }}>
        <h5 className="fw-bold text-center my-4">
          MY CART ({cartData.length})
        </h5>

        {cartData.length === 0 ? (
          <p className="text-center">No items in cart</p>
        ) : (
          cartData.map((item) => {
          return  <CartCard item={item}  key={item._id} mainUrl={mainUrl}/>
          
          })
        )}
      </div>
    </div>
  );
};

export default Cart;
