import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { allContext } from "../context/context";
const showToast = (t) => {
  toast.error(`${t}`);
};

const CartCard = ({ item, mainUrl, setCartData, quantity, onQuantityChange }) => {

     const {  settotalWishlistItem } =
    useContext(allContext);






  async function handleRemoveToCart(e) {
    try {
      const response = await fetch(mainUrl + `/api/products/update/${e}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAddedToCart: false }),
      });

      const resData = await response.json();
      if (resData) {
        showToast("removed from cart");
      }

      setCartData((prev) => prev.filter((p) => p._id !== e));
    } catch (error) {}
  }

  async function handleMoveToWishList(e) {
    try {
      const response = await fetch(mainUrl + `/api/products/update/${e}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isAddedToWishList: true,
          isAddedToCart: false,
        }),
      });
settotalWishlistItem(prev => prev+1)
      const resData = await response.json();

      if (resData) {
        showToast("moved to wishlist");
      }

      setCartData((prev) => prev.filter((p) => p._id !== e));
    } catch (error) {}
  }



  return (
    <div className="mx-auto mb-4 p-3 rounded bg-white" style={{ maxWidth: "600px" }}>
  {/* LEFT BLOCK - Product Details */}
  <div className="d-flex flex-column flex-md-row">
    <img
      src={item.productImage}
      alt={item.productName}
      className="img-fluid rounded bg-light"
      style={{ width: "300px", height: "300px", objectFit: "cover" }}
    />

    <div className="m-3 d-flex flex-column justify-content-between w-100">
      <div>
        <h5 className="fw-bold">{item.productName}</h5>

        <p className="fw-bold mb-1 fs-5">₹{item.productPrice}</p>
        <p className="mb-2 text-muted small">{item.offOnProduct}% off</p>
         <button className="btn btn-secondary">
               {item.size}
          </button>
        {/* QUANTITY COUNTER */}
        <div className="d-flex align-items-center my-3">
          <span className="me-2">Quantity:</span>
          <button
            onClick={() =>
              onQuantityChange(item._id, Math.max(1, quantity - 1))
            }
            className="btn btn-sm btn-outline-secondary rounded-circle"
            style={{ width: "32px", height: "32px" }}
          >
            -
          </button>
          <span className="mx-3 fw-bold border rounded px-3 py-1">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(item._id, quantity + 1)}
            className="btn btn-sm btn-outline-secondary rounded-circle"
            style={{ width: "32px", height: "32px" }}
          >
            +
          </button>
 
        </div>
        

       
        
      </div>

      {/* ACTION BUTTONS */}
      <div>
        <button
          className="btn btn-secondary mb-2 w-100 "
          onClick={() => handleRemoveToCart(item._id)} style={{width:"50%"}}
        >
          Remove From Cart
        </button>
        <button
          className="btn btn-secondary w-100 "
          onClick={() => handleMoveToWishList(item._id)} style={{width:"50%"}}
        >
          Move to Wishlist
        </button>
      </div>
    </div>
  </div>

 
</div>

  );
};

export default CartCard;
