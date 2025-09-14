import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useFetch } from "../customHooks/useFetch";
import { useMainUrl } from "../customHooks/useMainUrl";
import { allContext } from "../context/context";

const ProductDetail = () => {
  const { mainUrl } = useMainUrl();
  const productsUrl = `/api/products`;
  const { data, loading, error } = useFetch(mainUrl, productsUrl, "GET");
  const { id } = useParams();

  const [selectedProduct, setSelectedProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);

  // 🟢 Quantity state
  const [quantity, setQuantity] = useState(1);

  // 🟢 Derived price states
  const [priceInfo, setPriceInfo] = useState({
    totalPrice: 0,
    originalPrice: 0,
    discount: 0,
  });

  useEffect(() => {
    if (data && id) {
      const found = data.find((d) => d._id === id);
      if (found) {
        setSelectedProduct({ ...found });

        // Initial Price Calculation
        const discount = (found.offOnProduct / 100) * found.productPrice;
        const originalPrice = found.productPrice + discount;
        setPriceInfo({
          totalPrice: found.productPrice,
          originalPrice: originalPrice,
          discount: discount,
        });

        setRelatedProducts(
          data.filter(
            (p) =>
              p?._id !== id &&
              p?.category?.productCategory === found?.category?.productCategory
          )
        );
      }
    }
  }, [data, id]);

  // 🟢 Recalculate price when quantity changes
  useEffect(() => {
    if (selectedProduct) {
      const discountPerItem =
        (selectedProduct.offOnProduct / 100) * selectedProduct.productPrice;
      const originalPricePerItem =
        selectedProduct.productPrice + discountPerItem;

      setPriceInfo({
        totalPrice: selectedProduct.productPrice * quantity,
        originalPrice: originalPricePerItem * quantity,
        discount: discountPerItem * quantity,
      });
    }
  }, [quantity, selectedProduct]);

  async function handleAddToCart(e, a = 0) {
    try {
      const response = await fetch(mainUrl + `/api/products/update/${e}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAddedToCart: true }),
      });

      const resData = await response.json();
      console.log("API Response:", resData);

      if (a == 1) {
        setSelectedProduct((prev) =>
          prev?._id === e ? { ...prev, isAddedToCart: true } : prev
        );
      } else if (a == 0) {
        setRelatedProducts((prev) =>
          prev?.map((p) =>
            p?._id === e ? { ...p, isAddedToCart: true } : p
          )
        );
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  async function handleWishList(e, value, a = 0) {
    try {
      const response = await fetch(mainUrl + `/api/products/update/${e}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAddedToWishList: value }),
      });

      const resData = await response.json();
      console.log("API Response:", resData);

      if (a == 1) {
        setSelectedProduct((prev) =>
          prev?._id === e ? { ...prev, isAddedToWishList: value } : prev
        );
      } else if (a == 0) {
        setRelatedProducts((prev) =>
          prev?.map((p) =>
            p?._id === e ? { ...p, isAddedToWishList: value } : p
          )
        );
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  }

  const { totalCartItem, totalWishlistItem } = useContext(allContext);

  if (loading) return <p className="text-center mt-5">Loading product details...</p>;
  if (error) return <p className="text-danger text-center mt-5">Failed to load product</p>;
  if (!selectedProduct) return <p className="text-center mt-5">Product not found</p>;

  return (
    <div>
      <Navbar
        noOfCartItem={totalCartItem}
        totalWishlistItem={totalWishlistItem}
      />

      <div className="container my-5">
        <div className="row g-4 my-5">
          {/* LEFT IMAGE SECTION */}
          <div className="col-md-5 text-center position-relative ">
            <img
              src={selectedProduct.productImage}
              alt={selectedProduct.productName}
              className="img-fluid shadow"
              style={{
                maxHeight: "450px",
                objectFit: "contain",
                borderRadius: "2px",
                width: "60%",
              }}
            />
            {/* Wishlist Button */}
            <button
              className="btn btn-light position-absolute rounded-circle d-flex justify-content-center align-items-center shadow"
              style={{
                width: "36px",
                height: "36px",
                top: "10px",
                right: "140px",
              }}
              onClick={() =>
                selectedProduct.isAddedToWishList
                  ? handleWishList(selectedProduct._id, false, 1)
                  : handleWishList(selectedProduct._id, true, 1)
              }
            >
              {selectedProduct.isAddedToWishList ? (
                <span style={{ fontSize: "1.6rem", color: "red" }}>&#10084;</span>
              ) : (
                <span style={{ fontSize: "1.6rem", color: "#9c9c9cff" }}>&#9825;</span>
              )}
            </button>

            {/* Buttons */}
            <div className="d-flex flex-column my-3 mt-2 align-items-center">
              {!selectedProduct.isProductOrdered? <Link to={`/checkout/${selectedProduct._id}`}
                className="btn btn-primary my-2"
                style={{ width: "60%", borderRadius: "2px" }}
              >
                Buy Now
              </Link>
              :         <Link to={`/checkout/${selectedProduct._id}`}
                className="btn btn-danger my-2"
                style={{ width: "60%", borderRadius: "2px" }}
              >
                Cancel Order
              </Link>}
              {selectedProduct?.isAddedToCart ? (
                <Link
                  to="/cart"
                  className="btn btn-primary text-light"
                  style={{
                    width: "60%",
                    borderRadius: "2px",
                    textDecoration: "none",
                  }}
                >
                  Go to Cart
                </Link>
              ) : (
                <button
                  className="btn text-light"
                  style={{
                    width: "60%",
                    backgroundColor: "#898b8dff",
                    borderRadius: "2px",
                  }}
                  onClick={() => handleAddToCart(selectedProduct._id, 1)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>

          {/* RIGHT DETAILS SECTION */}
          <div className="col-md-7">
            <h4 className="fw-bold text-dark">{selectedProduct?.productName}</h4>
            <p className="text-muted">{selectedProduct?.productDiscription}</p>

            {/* Ratings */}
            <div className="mb-2">{selectedProduct?.productRating}</div>

            {/* Price Section */}
            <h3 className="fw-bold text-dark">
              ₹{priceInfo.totalPrice.toFixed(2)}
              <span className="text-secondary ms-3 fs-5 text-decoration-line-through">
                ₹{priceInfo.originalPrice.toFixed(2)}
              </span>
            </h3>
            <h5>
              {selectedProduct?.offOnProduct && (
                <span className="text-secondary ms-3">
                  {selectedProduct.offOnProduct}% off
                </span>
              )}
            </h5>

            {/* Quantity */}
            <div className="my-3">
              <label className="fw-bold me-2">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="form-control d-inline-block"
                style={{ width: "70px" }}
              />
            </div>

            {/* Size */}
            <div className="mb-3">
              <label className="fw-bold me-2">Size:</label>
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button key={size} className="btn btn-secondary btn-sm mx-1">
                  {size}
                </button>
              ))}
            </div>

            {/* Delivery Info */}
            <div className="d-flex gap-4 mt-4">
              <div className="text-center">
                <span>🚚</span>
                <p className="small">Free Delivery</p>
              </div>
              <div className="text-center">
                <span>🔄</span>
                <p className="small">7 Day Return</p>
              </div>
              <div className="text-center">
                <span>🔒</span>
                <p className="small">Secure Payment</p>
              </div>
            </div>

            {/* Long Description */}
            <div className="mt-4">
              <h6 className="fw-bold">Description:</h6>
              <ul>
                {selectedProduct.longDiscription?.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
      </div>

      {/* More Items Section */}
      <div className="mt-5 mx-4 my-4">
        <h5 className="fw-bold mb-3">
          More items you may like in {selectedProduct.category.productCategory}
        </h5>
        <div className="row g-3">
          {relatedProducts?.map((product) => (
            <div className="col-6 col-md-3" key={product._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                {/* Wishlist Button */}
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
                    <span style={{ fontSize: "1.6rem", color: "red" }}>
                      &#10084;
                    </span>
                  ) : (
                    <span style={{ fontSize: "1.6rem", color: "#9c9c9cff" }}>
                      &#9825;
                    </span>
                  )}
                </button>

                <div className="card-body text-center">
                  <h6 className="card-title">{product.productName}</h6>
                  <p className="fw-bold">₹{product.productPrice}</p>

                  {product?.isAddedToCart ? (
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
              </div>
            </div>
          ))}
          {relatedProducts?.length === 0 && (
            <p className="text-muted">No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
