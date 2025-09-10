import {React , useContext } from "react";
import { Link } from "react-router-dom";
import { useMainUrl } from "../customHooks/useMainUrl";
import { allContext } from '../context/context'
const ProductCard = ({ product }) => {
  const { mainUrl } = useMainUrl();
 const {setCart}= useContext(allContext)
  async function handleAddToCart(e) {
    try {
      const response = await fetch(mainUrl + `/api/products/update/${e}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAddedToCart: true }),
      });

      const resData = await response.json();
      console.log("API Response:", resData);
      console.log("hii");

 

    setCart(prev =>[...prev , resData]) 






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
            console.log("API Response:", resData);
            console.log("hii");
                setCart(prev =>[...prev , resData]) 

        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }


  return (
    <div className="col-md-4 col-lg-3">
      <div className="card h-100 border-0 shadow-sm">
        <div className="position-relative">
          <img
            src={product.productImage}
            alt={product.productName}
            className="card-img-top"
            style={{ height: "250px", objectFit: "cover", borderRadius: "5px" }}
          />

          {/* <button
            className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: "36px", height: "36px" }}
            onClick={() => console.log("Add to wishlist", product._id)}
          >
            <span style={{ fontSize: "1.6rem", color: "#9c9c9cff" }}>
              &#9825;
            </span>
          </button> */}


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

          <Link to={`/Detail/${product._id}`}>more detail</Link>

          {product.isAddedToCart ? (
            <button
              className="btn btn-primary w-100 text-light"
              
            >
              <Link className="text-light" to={`/cart`}> go to Cart</Link>
              
            </button>
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
      </div>
    </div>
  );
};

export default ProductCard;
