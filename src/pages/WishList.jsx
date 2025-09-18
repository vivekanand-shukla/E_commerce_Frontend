import React, { useContext, useState, useEffect } from 'react';
import { useFetch } from "../customHooks/useFetch";
import { useMainUrl } from '../customHooks/useMainUrl';
import Navbar from '../components/Navbar';
import { allContext } from '../context/context';

const WishList = () => {
  const [wishlistProducts, setwishlistProducts] = useState([]);
  const { mainUrl } = useMainUrl();
  const productsUrl = `/api/products`;
  const { data, loading, error } = useFetch(mainUrl, productsUrl, "GET");

  const {
    search,
    totalCartItem,
    totalWishlistItem,
    settotalWishlistItem,
  } = useContext(allContext);

  const [sizeSelections, setSizeSelections] = useState({});
  const [showSizeDropdownFor, setShowSizeDropdownFor] = useState(null);

  useEffect(() => {
    if (data) {
      setwishlistProducts(data.filter((product) => product.isAddedToWishList));
    }
  }, [data]);

  async function handleWishList(e, value) {
    try {
      const response = await fetch(mainUrl + `/api/products/update/${e}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAddedToWishList: value }),
      });

      const resData = await response.json();

      setwishlistProducts((prev) =>
        value ? [...prev, resData] : prev.filter((product) => product._id !== e)
      );
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  }

  async function handleMoveToCart(productId) {
    const selectedSize = sizeSelections[productId];

    if (!selectedSize) {
      setShowSizeDropdownFor(productId);
      alert("Please select a size first");
      return;
    }

    try {
      const response = await fetch(mainUrl + `/api/products/update/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isAddedToWishList: false,
          isAddedToCart: true,
          size: selectedSize,
        }),
      });

      const resData = await response.json();

      setwishlistProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );

      setShowSizeDropdownFor(null);
    } catch (error) {
      console.error("Error moving to cart:", error);
    }
  }

  const filteredWishlist = wishlistProducts.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    settotalWishlistItem(filteredWishlist.length);
  }, [filteredWishlist, settotalWishlistItem]);

  if (loading) return <div className="text-center mt-5">Loading Wishlist...</div>;
  if (error) return <div className="text-center text-danger mt-5">Failed to load wishlist</div>;

  return (
    <div>
      <Navbar noOfCartItem={totalCartItem} totalWishlistItem={totalWishlistItem} />
      <div className="container" style={{ paddingTop: "5%" }}>
        <h4 className="fw-bold mb-4">My Wishlist</h4>

        <div className="row g-4">
          {filteredWishlist.length > 0 ? (
            filteredWishlist.map((product) => (
              <div key={product._id} className="col-md-3">
                <div
                  className="card shadow-sm position-relative"
                  style={{ borderRadius: "2px", overflow: "hidden" }}
                >
                  <img
                    src={product.productImage}
                    className="card-img-top"
                    alt={product.productName}
                    style={{ objectFit: "cover", height: "280px" }}
                  />

                  <button
                    className="btn btn-light position-absolute rounded-circle d-flex justify-content-center align-items-center shadow"
                    style={{
                      width: "36px",
                      height: "36px",
                      top: "10px",
                      right: "20px",
                    }}
                    onClick={() =>
                      product?.isAddedToWishList
                        ? handleWishList(product?._id, false)
                        : handleWishList(product?._id, true)
                    }
                  >
                    {product?.isAddedToWishList ? (
                      <span style={{ fontSize: "1.6rem", color: "red" }}>&#10084;</span>
                    ) : (
                      <span style={{ fontSize: "1.6rem", color: "#9c9c9cff" }}>&#9825;</span>
                    )}
                  </button>

                  <div className="card-body text-center">
                    <h6 className="card-title">{product.productName}</h6>
                    <p className="fw-bold mb-2">₹{product.productPrice}</p>

                    <button
                      className="btn text-light w-100"
                      style={{ backgroundColor: "#999696ff" }}
                      onClick={() => handleMoveToCart(product._id)}
                    >
                      Move to Cart
                    </button>

                    {showSizeDropdownFor === product._id && (
                      <div className="mt-3">
                        <label htmlFor={`size-${product._id}`} className="form-label">
                          Select Size:
                        </label>
                        <select
                          id={`size-${product._id}`}
                          className="form-select"
                          value={sizeSelections[product._id] || ""}
                          onChange={(e) =>
                            setSizeSelections((prev) => ({
                              ...prev,
                              [product._id]: e.target.value,
                            }))
                          }
                        >
                          <option value="">--Select--</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">No items in wishlist</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;
