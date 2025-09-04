import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useFetch } from "../customHooks/useFetch";

const ProductDetail = () => {
    const mainUrl = `https://e-commerce-app-backend-seven-sand.vercel.app`;
    const productsUrl = `/api/products`;
    const { data, loading, error } = useFetch(mainUrl, productsUrl, "GET");

    const { id } = useParams();


    const selectedProduct = data?.find((d) => d._id === id);

    const relatedProducts = data?.filter(
        (p) =>
            p.category.productCategory === selectedProduct?.category.productCategory

        //     &&  p._id !== selectedProduct._id
    );

    if (loading) return <p className="text-center mt-5">Loading product details...</p>;
    if (error) return <p className="text-danger text-center mt-5">Failed to load product</p>;
    if (!selectedProduct) return <p className="text-center mt-5">Product not found</p>;

    return (
        <div>
            <Navbar />


            <div className="container my-5">
                <div className="row g-4 my-5">

                    <div className="col-md-5 text-center ">

                        <img
                            src={selectedProduct.productImage}
                            alt={selectedProduct.productName}
                            className="img-fluid shadow "
                            style={{ maxHeight: "450px", objectFit: "contain", borderRadius: "2px", width: "60%", }}
                        />
                        {/* Buttons */}
                        <div className="d-flex flex-column my-3 mt-2 align-items-center" >
                            <button className="btn btn-primary  my-2 " style={{ width: "60%", borderRadius: "2px" }}>Buy Now</button>
                            <button className="btn text-light  " style={{ width: "60%", backgroundColor: "#898b8dff", borderRadius: "2px" }}>Add to Cart</button>
                        </div>
                    </div>


                    <div className="col-md-7">
                        <h4 className="fw-bold text-dark">{selectedProduct.productName}</h4>
                        <p className="text-muted">{selectedProduct.productDiscription}</p>


                        <div className="mb-2">
                            {selectedProduct.productRating}
                        </div>

                        {/* Price */}
                        <h3 className="fw-bold text-dark">
                            ₹{selectedProduct.productPrice}
                            <span className="text-secondary ms-3 fs-5 text-decoration-line-through"> ₹ {(selectedProduct.productPrice + ((selectedProduct.offOnProduct * selectedProduct.productPrice) / 100)).toFixed(2)}</span>
                        </h3>
                        <h5> {selectedProduct.offOnProduct && (
                            <span className="text-secondary ms-3">
                                {selectedProduct.offOnProduct}% off
                            </span>
                        )}</h5>

                        {/* Quantity */}
                        <div className="my-3">
                            <label className="fw-bold me-2">Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                defaultValue="1"
                                className="form-control d-inline-block"
                                style={{ width: "70px" }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="fw-bold me-2">Size:</label>
                            {["S", "M", "L", "XL", "XXL"].map((size) => (
                                <button
                                    key={size}
                                    className="btn btn-secondary btn-sm mx-1"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>



                        {/* Delivery Info Icons */}
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

                {/* More Items Section */}


            </div>
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
                                <div className="card-body text-center">
                                    <h6 className="card-title">{product.productName}</h6>
                                    <p className="fw-bold">₹{product.productPrice}</p>
                                    <button className="btn text-light  btn-sm w-100" style={{ backgroundColor: "#898b8dff", borderRadius: "2px" }}>
                                        Add to Cart
                                    </button>
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
