import React, { useState } from "react";

const CheckoutCard = ({ item, mainUrl  ,setOrderedProducts ,isBuyed}) => {
  const [quantity, setQuantity] = useState(1);

  async function handleBuyNow(id, qty, value) {
    try {
    const response=   await fetch(`${mainUrl}/api/products/update/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isProductOrdered: value, productQuantity: qty }),
      });
      const data = await response.json();
      if(data){
        if(value == true){
            setOrderedProducts(prev =>[...prev ,data])
        }else if(value === false){
            
            setOrderedProducts(prev =>prev.filter( p => p._id != data._id))
        }
      }
      alert(value ? "Order Placed ✅" : "Order Cancelled ❌");
    } catch (error) {
      // console.error("Error ordering:", error);
    }
  }

  const price = Number(item.productPrice);
  const discount = (item.offOnProduct / 100) * price;
  const delivery = item.diliveryCharges;
  const finalAmount = quantity * (price - discount + delivery);

  return (
    <div className="row mx-auto mb-4 g-5 a" style={{ maxWidth: "90%", }}>
      <div className="col-md-5 a">
        <div className="bg-white rounded shadow-sm p-3">
          <div className="d-flex a ">
            <img
              src={item.productImage}
              alt={item.productName}
              style={{
                width: "200px",
                height: "340px",
                objectFit: "cover",
                backgroundColor: "#f3f3f3",
              }}
            />
            <div className="ms-4 d-flex flex-column justify-content-between w-100">
              <h5 className="fw-bold">{item.productName}</h5>
              <p className="fw-bold fs-5">
                ₹{price.toFixed(2)}
                <span className="text-muted text-decoration-line-through ms-2">
                  ₹{(price + discount).toFixed(2)}
                </span>
              </p>
              <p className="text-muted">{item.offOnProduct}% off</p>
            {  !isBuyed?
              <div className="d-flex align-items-center my-3">
                <span className="me-2 fw-semibold">Quantity:</span>
                <button
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
                  className="btn btn-outline-secondary btn-sm rounded-circle"
                >
                  -
                </button>
                <span className="mx-3 fw-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="btn btn-outline-secondary btn-sm rounded-circle"
                >
                  +
                </button>
              </div>:<p></p>}

              {!item.isProductOrdered ? (
                <button
                  className="btn btn-primary w-75"
                  onClick={() => handleBuyNow(item._id, quantity, true)}
                >
                  BUY NOW
                </button>
              ) : (
                <button
                  className="btn btn-danger w-75"
                  onClick={() => handleBuyNow(item._id, 1, false)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE PRICE */}
      <div className="col-md-5">
  <div className="bg-white rounded shadow-sm p-3">
    <h6 className="fw-bold mb-3">PRICE DETAILS</h6>
    <hr />
    {/* Price */}
    <div className="d-flex justify-content-between">
      <span>
        Price {!isBuyed ? <span>({quantity})</span> : <span>({item.productQuantity})</span>} item
      </span>
      <span>
        ₹{!isBuyed
          ? (quantity * price).toFixed(2)
          : (item.productQuantity * price).toFixed(2)}
      </span>
    </div>

    {/* Discount (only show, no subtraction) */}
    <div className="d-flex justify-content-between">
      <span>Discount</span>
      <span>
        {!isBuyed
          ? `₹${(quantity * discount).toFixed(2)}`
          : `₹${(item.productQuantity * discount).toFixed(2)}`}
      </span>
    </div>

    {/* Delivery Charges */}
    <div className="d-flex justify-content-between">
      <span>Delivery Charges</span>
      <span>
        ₹{!isBuyed
          ? (quantity * delivery).toFixed(2)
          : (item.productQuantity * delivery).toFixed(2)}
      </span>
    </div>

    <hr />

    {/* TOTAL AMOUNT (no discount subtraction) */}
    <div className="d-flex justify-content-between fw-bold">
      <span>TOTAL AMOUNT</span>
      <span>
        ₹{!isBuyed
          ? (quantity * price + quantity * delivery).toFixed(2)
          : (item.productQuantity * price + item.productQuantity * delivery).toFixed(2)}
      </span>
    </div>

    <hr />

    {/* Saving Info (optional) */}
    <p className="small">
      You will save ₹
      {!isBuyed
        ? (discount * quantity).toFixed(2)
        : (discount * item.productQuantity).toFixed(2)}{" "}
      on this order
    </p>
  </div>
</div>
     <style>{`
          @media (max-width: 1024px) {
              .a{
           display: flex;
      flex-direction: column;
          }
          @media (max-width: 360px) {
           .a{
           display: flex;
      flex-direction: column;
         
           }


          }

`}
      </style>

    </div>
  );
};

export default CheckoutCard;
