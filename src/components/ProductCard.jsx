import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useMainUrl } from "../customHooks/useMainUrl";
import { toast } from 'react-toastify';
import { allContext } from '../context/context'
import { useContext  } from "react";

const ProductCard = ({ product, setProducts  }) => {
  

    const {  settotalWishlistItem, settotalCartItem } = useContext(allContext)
    const { mainUrl } = useMainUrl();
    const [size, setSize] = useState('');

    const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const addedToCart = () => {
    toast.success("product added to cart");
  };
  const addedToWishListToast = () => {
    toast.success("product added to wishlist");
  };


const removeToWishListToast = () => {
  toast.error("Product removed from wishlist");
};

  async function handleAddToCart(e) {
  if (!size) {
   
    setShowSizeDropdown(true);
    alert("Please select a size first");
    return;
  }
   

    try {
      const response = await fetch(mainUrl + `/api/products/update/${e}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAddedToCart: true ,size }),
      });
      const resData = await response.json();
     
      settotalCartItem(prev=> prev+1)

     setProducts(prevProducts =>
        prevProducts.map(p =>
          p._id === e ? { ...p, isAddedToCart: true } : p
        )
      );

setShowSizeDropdown(false);
if(resData){

  addedToCart()
}

    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }
    



  async function handleWishList(e, value) {
    try {
      const response = await fetch(mainUrl + `/api/products/update/${e}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAddedToWishList: value }),
      });

      const resData = await response.json();
   
      value? settotalWishlistItem(prev => prev +1):settotalWishlistItem(prev => prev -1)
      if(resData && value){

        addedToWishListToast()
      }else if(resData && !value){
        removeToWishListToast()

      }


      setProducts(prevProducts =>
        prevProducts.map(p =>
          p._id === e ? { ...p, isAddedToWishList: value } : p
        )
      );

    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }


  return (
    <div className="col-md-4 col-lg-3">

      {/* <button onClick={notify}>hi</button> */}



      <div className="card h-100 border-0 shadow-sm">
        <div className="position-relative">
          <img
            src={product.productImage}
            alt={product.productName}
            className="card-img-top"
            style={{ height: "250px", objectFit: "cover", borderRadius: "5px" }}
          />

         

          <button
            className="btn btn-light position-absolute rounded-circle d-flex justify-content-center align-items-center shadow"
            style={{
              width: "36px",
              height: "36px",
              top: "10px",
              right: "20px",
            }}
            onClick={() => product?.isAddedToWishList ? handleWishList(product?._id, false) : handleWishList(product?._id, true)}
          >
            {product?.isAddedToWishList ? (
              <span style={{ fontSize: "1.6rem", color: "red" }}>
                &#10084;
              </span>
            ) : (
              <span style={{ fontSize: "1.6rem", color: "#9c9c9cff" }}>
                &#9825;
              </span>
            )}
          </button>
        </div>

        <div className="card-body text-center">
          <h6 className="card-title">{product.productName}</h6>
          <p className="fw-bold">₹ {product.productPrice}</p>
          <p className="fw-bold">rating : {product.productRating}</p>

          <Link style={{ textDecoration: "none" }} to={`/Detail/${product._id}`}>Details</Link>

          {product.isAddedToCart ? (
            <Link
              to="/cart"
              className="btn btn-primary w-100 text-light"
              style={{ textDecoration: "none" }}
            >
              Go to Cart
            </Link>

          ) : (
            <button
              className="btn w-100 text-light"
              style={{ backgroundColor: "#9c9c9cff" }}
              onClick={() => handleAddToCart(product._id)}
            >
              Add to Cart
            </button>
          )}
        </div>

        
    {!product.isAddedToCart && showSizeDropdown  && <p>
      <label htmlFor="size" className="form-label">Select Size:</label>
      <select
        id="size"
        value={size}
        onChange={(e) => setSize(e.target.value)} className="form-select"
      >
       
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select> </p>}
      </div>

   
    </div>
  );
};

export default ProductCard;
