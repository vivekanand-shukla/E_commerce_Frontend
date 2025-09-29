import  { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useFetch } from "../customHooks/useFetch";
import { useMainUrl } from "../customHooks/useMainUrl";
import { allContext } from "../context/context";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const showToast = (t) => {
  toast.success(`${t}`);
};

const showToastError = (t) => {
  toast.error(`${t}`);
};


const ProductDetail = () => {
    const navigate = useNavigate();
  const { mainUrl } = useMainUrl();
  const productsUrl = `/api/products`;
  const { data, loading, error } = useFetch(mainUrl, productsUrl, "GET");
  const { id } = useParams();

  const [selectedProduct, setSelectedProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const { totalCartItem, totalWishlistItem ,settotalWishlistItem, settotalCartItem } = useContext(allContext);
  const [priceInfo, setPriceInfo] = useState({
    totalPrice: 0,
    originalPrice: 0,
    discount: 0,
  });

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const [showSizeSelection, setShowSizeSelection] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const [relatedSelectedSizes, setRelatedSelectedSizes] = useState({});
  const [relatedShowSizeSelection, setRelatedShowSizeSelection] = useState({});

  useEffect(() => {
    if (data && id) {
      const found = data.find((d) => d._id === id);
      if (found) {
        setSelectedProduct({ ...found });
        setSelectedSize("");
        setShowSizeSelection(false);

        const discount = (found.offOnProduct / 100) * found.productPrice;
        const originalPrice = found.productPrice + discount;
        setPriceInfo({
          totalPrice: found.productPrice,
          originalPrice,
          discount,
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

  async function updateSizeInDB(productId, size) {
    try {
      const response = await fetch(`${mainUrl}/api/products/update/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ size }),
      });
      return await response.json();
    } catch (err) {
      console.error("Size update failed:", err);
    }
  }
  async function updateQuantity(productId, quantity) {
    try {
      const response = await fetch(`${mainUrl}/api/products/update/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productQuantity: quantity }),
      });
    const a=   await response.json();
    a &&  navigate(`/checkout`);
    } catch (err) {
      console.error(" update failed:", err);
    }
  }

  const handleSizeSelectAndUpdate = async (size) => {
    const res = await updateSizeInDB(selectedProduct._id, size);
    if (res) {
      setSelectedProduct((prev) => ({
        ...prev,
        size,
      }));
    }
  };

  async function handleAddToCart(productId, isMainProduct = false) {
    const sizeToSend = isMainProduct ? selectedProduct?.size : relatedSelectedSizes[productId];

    if (!sizeToSend) {
      isMainProduct
        ? setShowSizeSelection(true)
        : setRelatedShowSizeSelection((prev) => ({ ...prev, [productId]: true }));
      return;
    }

    try {
      const response = await fetch(mainUrl + `/api/products/update/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isAddedToCart: true,
          size: sizeToSend,
        }),
      });

      const resData = await response.json();
 settotalCartItem(prev=> prev+1)
      if (isMainProduct) {
        setSelectedProduct((prev) =>
          prev?._id === productId ? { ...prev, isAddedToCart: true } : prev
        );
        setShowSizeSelection(false);

        showToast("added to cart")
      } else {
        setRelatedProducts((prev) =>
          prev.map((p) =>
            p._id === productId ? { ...p, isAddedToCart: true } : p
          )
        );
        setRelatedShowSizeSelection((prev) => {
          const newState = { ...prev };
          delete newState[productId];
          return newState;
        });

         showToast("added to cart")
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  async function handleWishList(e, value, isMainProduct = false) {
    try {
      const response = await fetch(mainUrl + `/api/products/update/${e}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAddedToWishList: value }),
      });
     value?  settotalWishlistItem(prev=> prev+1):settotalWishlistItem(prev=> prev-1)
      const resData = await response.json();
         if(resData && value){
           showToast("added to wishlist")
         }else{
          showToastError('removed from wishlist')
         }
      if (isMainProduct) {
        setSelectedProduct((prev) =>
          prev?._id === e ? { ...prev, isAddedToWishList: value } : prev
        );
      } else {
        setRelatedProducts((prev) =>
          prev.map((p) =>
            p._id === e ? { ...p, isAddedToWishList: value } : p
          )
        );
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  }





  return (
    <div>
      <Navbar noOfCartItem={totalCartItem} totalWishlistItem={totalWishlistItem} />
          {loading&& <p className="text-center mt-5">Loading product details...</p>}
          {error&&  <p className="text-danger text-center mt-5">Failed to load product</p>}
          
          {selectedProduct &&

          
      <div className="container  my-5">
        <div className="row g-4 my-5 a">
          {/* IMAGE + BUTTONS */}
          <div className="col-md-5 text-center position-relative">
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
            <button
              className="btn btn-light position-absolute rounded-circle shadow"
              style={{ width: "36px", height: "36px", top: "10px", right: "150px" }}
              onClick={() =>
                handleWishList(
                  selectedProduct._id,
                  !selectedProduct.isAddedToWishList,
                  true
                )
              }
            >
              {selectedProduct.isAddedToWishList ? (
                <span  className="b" style={{ fontSize: "1.6rem", color: "red", position:"relative",   top:"-9px"  , left:"-11px"}}>&#10084;</span>
              ) : (
                <span className="c" style={{ fontSize: "1.6rem", color: "#9c9c9cff", position:"relative",  top:"-9px" , left:"-3px"}}>&#9825;</span>
              )}
            </button>

            <div className="d-flex flex-column my-3 align-items-center">
             {selectedProduct.isAddedToCart? <button onClick={()=>updateQuantity(selectedProduct._id, quantity)}
               
                className="btn my-2   btn-primary"
                style={{ width: "60%", borderRadius: "2px" }}
              >
                 Buy Now
              </button>:  <button onClick={()=>showToastError("first add to cart ")}
                
                className="btn my-2   btn-primary"
                style={{ width: "60%", borderRadius: "2px" }}
              >
                 Buy Now
              </button>}

              {selectedProduct.isAddedToCart ? (
                <Link to="/cart" className="btn btn-primary text-light" style={{ width: "60%" , borderRadius: "2px", }}>
                  Go to Cart
                </Link>
              ) : (
                <>
                  <button
                    className="btn text-light"
                    style={{
                      width: "60%",
                      backgroundColor: "#898b8dff",
                      borderRadius: "2px",
                    }}
                    onClick={() => handleAddToCart(selectedProduct._id, true)}
                  >
                    Add to Cart
                  </button>

                  {showSizeSelection && (
                    <div className="mt-2">
                      <label className="fw-bold me-2">Choose Size:</label>
                      {sizes.map((size) => (
  <button
    key={size}
    onClick={() => handleSizeSelectAndUpdate(size)}
    className={`btn btn-secondary mx-1 ${
      selectedProduct.size === size ? "p-3 fs-5 fw-bold" : "p-2"
    }`}
  >
    {size}
  </button>
))}

                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* DETAILS */}
          <div className="col-md-7">
            <h4 className="fw-bold text-dark">{selectedProduct.productName}</h4>
            <p className="text-muted">{selectedProduct.productDiscription}</p>

                       <div className="mb-2">{selectedProduct.productRating}</div>

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

            {/* Size Display with click to update */}
            <div className="mb-3">
              <label className="fw-bold me-2">Size:</label>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelectAndUpdate(size)}
                  className={`btn btn-sm mx-1 ${
                    selectedProduct.size === size
                      ? "btn-secondary p-2"
                      : "btn-outline-secondary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Delivery Info */}
            <div className="d-flex gap-4 mt-4 ">
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
        <div className="mt-5 mx-4 my-4">
          <h5 className="fw-bold mb-3">
            More items you may like in {selectedProduct.category.productCategory}
          </h5>
          <div className="row g-3 a">
            {relatedProducts?.map((product) => (
              <div className=" col-md-4" key={product._id}>
                <div className="card h-100 shadow-sm position-relative">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <button
                    className="btn btn-light position-absolute rounded-circle shadow"
                    style={{
                      width: "36px",
                      height: "36px",
                      top: "10px",
                      right: "20px",
                    }}
                    onClick={() =>
                      handleWishList(
                        product._id,
                        !product.isAddedToWishList,
                        false
                      )
                    }
                  >
                    {product.isAddedToWishList ? (
                      <span style={{ fontSize: "1.6rem", color: "red", position:"relative", top:"-9px"  , left:"-11px" }}>
                        &#10084;
                      </span>
                    ) : (
                      <span style={{ fontSize: "1.6rem", color: "#9c9c9cff" ,position:"relative",  top:"-9px"  , left:"-3px"}}>
                        &#9825;
                      </span>
                    )}
                  </button>

                  <div className="card-body text-center d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="card-title">{product.productName}</h6>
                      <p className="fw-bold">₹{product.productPrice}</p>
                    </div>

                    {product.isAddedToCart ? (
                      <Link
                        to="/cart"
                        className="btn btn-primary w-100 text-light"
                      >
                        Go to Cart
                      </Link>
                    ) : (
                      <>
                        <button
                          className="btn w-100 text-light"
                          style={{ backgroundColor: "#9c9c9cff" }}
                          onClick={() => handleAddToCart(product._id, false)}
                        >
                          Add to Cart
                        </button>

                        {relatedShowSizeSelection[product._id] && (
                          <div className="mt-2">
                            <label className="fw-bold me-2">Choose Size:</label>
                            {sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() =>
                                  setRelatedSelectedSizes((prev) => ({
                                    ...prev,
                                    [product._id]: size,
                                  }))
                                }
                                className={`btn btn-sm mx-1 ${
                                  relatedSelectedSizes[product._id] === size
                                    ? "btn-dark"
                                    : "btn-outline-secondary"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
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
      </div>}

      <style>{`
        @media (max-width: 360px) {
          .a {
            display: flex;
            flex-direction: column;
            
          }
          .b {

}

.c {



        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
