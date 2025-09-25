import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { useMainUrl } from "../customHooks/useMainUrl";
import { useFetch } from "../customHooks/useFetch";
import CartCard from "../components/CartCard";
import { allContext } from "../context/context";
import {Link} from 'react-router-dom'

const Cart = () => {
  const { mainUrl } = useMainUrl();
  const { data, loading, error } = useFetch(mainUrl, "/api/products", "GET");
  const [cartData, setCartData] = useState([]);
  const { search, settotalCartItem, totalCartItem, totalWishlistItem } =
    useContext(allContext);


  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    settotalCartItem(cartData.length);
  }, [cartData, settotalCartItem]);

  useEffect(() => {
    if (data) {
      const cartItems = data.filter((d) => d.isAddedToCart === true);
      setCartData(cartItems);


      const initialQuantities = {};
      cartItems.forEach((item) => {
        initialQuantities[item._id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [data]);

  const handleQuantityChange = (id, newQty) => {
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
  };

  const filteredCartData =
    search.trim().length > 0
      ? cartData.filter((item) =>
          item.productName.toLowerCase().includes(search.toLowerCase())
        )
      : cartData;


  let totalPrice = 0,
    totalDiscount = 0,
    totalDelivery = 0;

  filteredCartData.forEach((item) => {
    const quantity = quantities[item._id] || 1;
    const price =
      Number(item.productPrice) +
      Number((item.offOnProduct / 100) * item.productPrice);
    const discount = Number((item.offOnProduct / 100) * item.productPrice);
    const delivery = item.diliveryCharges;

    totalPrice += quantity * price;
    totalDiscount += quantity * discount;
    totalDelivery += quantity * delivery;
  });

  const finalAmount = totalPrice - totalDiscount + totalDelivery;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <Navbar
        noOfCartItem={totalCartItem}
        totalWishlistItem={totalWishlistItem}
      />

      <div className="container" style={{ paddingTop: "5%" }}>
        <h5 className="fw-bold text-center my-4">MY CART ({cartData.length})</h5>

 
        {cartData.length > 0 && (
          <div className="col-md-6 mx-auto mb-4">
            <div
              className="p-3"
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
              }}
            >
              <h6 className="fw-bold mb-3">PRICE DETAILS</h6>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Total Price</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Discount</span>
                <span>-₹{totalDiscount.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Delivery Charges</span>
                <span>₹{totalDelivery.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold mb-2">
                <span>FINAL AMOUNT</span>
                <span>₹{finalAmount.toFixed(2)}</span>
              </div>
              <hr />
              <p className="" style={{ fontSize: "0.85rem" }}>
                You will save ₹{totalDiscount.toFixed(2)} on this order
              </p>

{/* to={`/checkout/${item._id}`} */}

              { 
                    <Link 
                      className="btn w-100 mt-2"
                      style={{ backgroundColor: "#007bff", color: "white" }}
                    >
                      PLACE ORDER
                    </Link>
                   
                    
                    }
            </div>
          </div>
        )}

        {cartData.length === 0 ? (
          <p className="text-center ">No items in cart</p>
        ) : (
          filteredCartData.map((item) => (
            <CartCard
             className="d-flex justify-content-center"
              item={item}
              key={item._id}
              mainUrl={mainUrl}
              setCartData={setCartData}
              quantity={quantities[item._id] || 1}
              onQuantityChange={handleQuantityChange}
            />
          ))
        )}

        {search.length > 0 && filteredCartData.length === 0 && (
          <p className="p-5">no item found</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
