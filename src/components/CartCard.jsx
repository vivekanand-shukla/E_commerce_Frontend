
import React from 'react'
import { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom';
const CartCard = ({item ,mainUrl ,setCartData ,cardOf}) => {
const [quantity, setQuantity] = useState(1);


//
 const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(""); 
   const [ isClicked , setIsClicked] = useState(false)
   const [isDileverySet , setIsDileverySet] = useState(false)


  
        useEffect(() => {
          fetchAddresses();
        }, []);
      
        const fetchAddresses = async () => {
          try {
            const res = await fetch(`${mainUrl}/api/address`);
            const data = await res.json();
            setAddresses(data);
            if (data.length > 0) {
              setSelectedAddress(data[0].choosedAddressForOrder);
              
            }
          } catch (err) {
            // console.error("Error fetching addresses:", err);
          }
        };
    

         
  const handleSetAddress = async (addr) => {
     try {
        // UPDATE request
         const res = await fetch(`${mainUrl}/api/choosedAdress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newChoosedAddress: addr }),
        });
     const a=    await res.json();
     console.log(a)
       
setIsClicked(false)
setIsDileverySet(true)
    
      fetchAddresses(); 
    } catch (err) {
    
    }
  };





//

 async function handleRemoveToCart(e) {
    try {
      const response = await fetch(mainUrl + `/api/products/update/${e}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAddedToCart: false }),
      });

      const resData = await response.json();
      // console.log("API Response:", resData);
      // console.log("hii");
      
   setCartData(prev => prev.filter(p => p._id !== e));
    } catch (error) {
      // console.error("Error removing to cart:", error);
    }
  }


  
     async function handleMoveToWishList(e) {
        try {
            const response = await fetch(mainUrl + `/api/products/update/${e}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isAddedToWishList: true ,isAddedToCart: false   }),
            });

            const resData = await response.json();
            // console.log("API Response:", resData);
            // console.log("hii");

            setCartData(prev => prev.filter(p => p._id !== e));


        } catch (error) {
            // console.error("Error adding to cart:", error);
        }
    }
    function handeBuyClicked(){
        setIsClicked(true)
        alert("enter adreess first")
    }




    //  console.log(item)
             const price =(Number(item.productPrice) + Number((item.offOnProduct / 100) * item.productPrice))
            const discount = Number((item.offOnProduct / 100) * item.productPrice)
            const delivery = item.diliveryCharges;
          
           const  finalAmount = quantity *(price - discount + delivery)
  return (
      <div
               
                className="row mx-auto mb-4 g-5 a"
                style={{ maxWidth: "90%" }}
              >


                {  isClicked &&  addresses.length > 0 && (
                            <div className="mb-3 d-flex align-items-center">
                              <label className="fw-semibold me-2">Change Delivery Address:</label>
                              <select
                                className="form-select w-auto me-2 "  size={3}
                                // value={selectedOption}
                                onChange={(e) => setSelectedAddress(e.target.value)}
                              >
                                {addresses.map((addr) => (
                                  <option key={addr._id} value={addr.address}  >
                                    
                
                                    {addr.address}
                              
                                  </option>
                                ))}
                              </select>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleSetAddress(selectedAddress)} 
                              >
                                Set as Delivery Address
                              </button>
                            </div>
                          )}
                {/* LEFT BLOCK - Product Details */}
                <div className=" col-md-6 ">
                  <div
                    className=" h-100 w-100 "
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "3px",
                     

                    }}
                  >
                    <div className="d-flex  a">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="img-fluid"
                        style={{
                          width: "200px",
                          height: "340px",
                          objectFit: "cover",
                          borderRadius: "2px",
                          backgroundColor: "#f3f3f3",
                        }}
                      />
                      <div className="m-5 d-flex flex-column justify-content-between w-100 ">
                        <div>
                          <h5 className="fw-bold">{item.productName}</h5>

                          <p className="fw-bold mb-1" style={{ fontSize: "1.3rem" }}>
                            ₹{item.productPrice}
                            <span
                              className="text-muted text-decoration-line-through ms-2"
                              style={{ fontSize: "1rem" }}
                            >
                              ₹{price.toFixed(1)}
                            </span>
                          </p>
                          <p className="mb-2 text-muted" style={{ fontSize: "0.9rem" }}>
                            {item.offOnProduct}% off
                          </p>
                          {/* QUANTITY COUNTER */}
                          <div className=" align-items-center my-3 a">
                            <span className="me-2">Quantity:</span>
                            <div>

                            <button  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
                              className="btn  btn-sm"
                              style={{ borderRadius: "50%", width: "30px", height: "30px", border: "0.2px solid gray" }}
                              >
                              -
                            </button>
                            <span className="mx-3 fw-bold  " style={{ border: "0.2px solid gray", borderRadius: "2px", padding: "2px" }}
                            >{quantity}</span>
                            <button  onClick={() => setQuantity((prev) => prev + 1)}
                              className="btn  btn-sm"
                              style={{ borderRadius: "50%", width: "30px", height: "30px", border: "0.2px solid gray" }}
                              >
                              +
                            </button>
                              </div>
                          </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className=''>
                          
                          <button
                            className="btn btn-secondary mb-2  w-75"
                            style={{ borderRadius: "2px",  }} onClick={()=>{handleRemoveToCart(item._id)}}
                          >
                            Remove From Cart
                          </button>
                          <button
                            className="btn btn-secondary w-75"
                            style={{ borderRadius: "2px" , }} onClick={()=>handleMoveToWishList(item._id)}
                          >
                            Move to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT BLOCK - Price Details */}
                <div className="col-md-5">
                  <div
                    className="p-3 h-100"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                     
                     
                    }}
                  >
                    <h6 className="fw-bold mb-3">PRICE DETAILS</h6>     <hr />
                    <div className="d-flex justify-content-between mb-2">
                      <span>Price ({quantity.toFixed(2)} item)</span>
                      <span> ₹{( quantity*price).toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Discount</span>
                      <span>-₹ {( quantity*discount).toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Delivery Charges</span>
                      <span>₹{( quantity*delivery).toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold mb-2">
                      <span>TOTAL AMOUNT</span>
                      <span>₹{( quantity*finalAmount).toFixed(2) }</span>
                    </div>
                    <hr />
                    <p className="" style={{ fontSize: "0.85rem" }}>
                      You will save ₹{(discount*quantity).toFixed(2)} on this order
                    </p>
                    {/* { item.isProductOrdered?<Link to={`/checkout/${item._id}`}
                      className="btn btn-danger w-100 mt-2"
                      style={{  color: "white" }}
                    >
                      Cancel Order
                    </Link> : */}
                    { isDileverySet ?
                    <Link to={`/checkout/${item._id}`}
                      className="btn w-100 mt-2"
                      style={{ backgroundColor: "#007bff", color: "white" }}
                    >
                      PLACE ORDER
                    </Link>:
                    <button 
                    onClick={  ()=>{handeBuyClicked() }}
                      className="btn w-100 mt-2"
                      style={{ backgroundColor: "#007bff", color: "white" }}
                    >
                      PLACE ORDER
                    </button>
                    
                    }
                  </div>
                </div>

                <style>{`
  @media (max-width: 1024px) {
    .a {
      display: flex;
      flex-direction: column; 
      gap: 1rem; 
    }
    /* Buttons ko chhota karo */
    .a button {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
    }
    /* Quantity display chhota karo */
    .a span {
      font-size: 0.8rem;
    }
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      margin-bottom: 1rem;
    }
      .b{
      width:50%
      }
      .d{
       width:50%
      }
  }

  @media (max-width: 360px) {
    .a {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .a button {
      font-size: 0.65rem;
      padding: 0.2rem 0.4rem;
    }
    .a span {
      font-size: 0.75rem;
    }
    img {
      width: 100%;
      height: auto;
    }
      
     
  }
`}</style>

              </div>
  )
}

export default CartCard