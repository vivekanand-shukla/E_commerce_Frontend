import './ProductListining.css'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useFetch } from "../customHooks/useFetch"
const ProductListining = () => {
  const mainUrl = `https://e-commerce-app-backend-seven-sand.vercel.app`
  const productsUrl = `/api/products`
  const { data, loading, error } = useFetch(mainUrl, productsUrl, "GET")

  const [isOpen, setIsOpen] = useState(true);
  if (data) {
    // console.log(data)
  }
  const catagoryData = data?.filter(
    (item, index, self) =>
      index === self.findIndex(
        (t) => t.category.productCategory === item.category.productCategory
      )
  );
  // console.log()

  return (
    <div>
      < Navbar  />

      <div className='mainContainer w-100 d-flex py-2 d-flex flex-wrap' >
       
         
        <div  className={`sidebar ${isOpen ? "open" : "closed"}`}  style={{ width: "15%", background: "#f8f9fa" }} >  
          
          
          <div className='container' >
           
            <div className='d-flex  justify-content-between'>
              <p className='fw-bold ' >filter</p>
              <p className=' text-decoration-underline'>clear
              </p>
            </div>
            <div><p className=''></p></div>


            <label for="priceRange" className="form-label  fw-bold" >Price</label>
            <div className='w-100 d-flex justify-content-between' style={{ color: "#9c9c9cff" }}><span>50</span> <span>150</span> <span>200</span></div>
            <input
              type="range"
              className="form-range custom-range"
              min="50"
              max="200"
              id="priceRange"
            />

            <style>
              {`
.custom-range::-webkit-slider-runnable-track {
  background: #9c9c9cff;
  height: 6px;
  border-radius: 5px;
}
.custom-range::-webkit-slider-thumb {
  background: #9c9c9cff;
  border: none;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  margin-top: -5px;
  cursor: pointer;
  -webkit-appearance: none;
}
.custom-range::-moz-range-track {
  background: #9c9c9cff;
  height: 6px;
  border-radius: 5px;
}
.custom-range::-moz-range-thumb {
  background: #9c9c9cff;
  border: none;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  cursor: pointer;
}
`}
            </style>
            <div>

              <label htmlFor="" className='fw-bold'>category</label>
              <div>{catagoryData?.map(n => <div><input type="checkbox" name="" id={n?._id} value={n?.category.productCategory} /> <label htmlFor={n?._id}>{n?.category.productCategory}</label></div>)}</div>

            </div>


            <div className="p-3">

              <p className="fw-bold">Rating</p>
              <div className="d-flex flex-column gap-2">
                <div>
                  <input type="radio" name="rating" id="rating4" value="4" defaultChecked />
                  <label htmlFor="rating4" className="ms-2">4 Stars & above</label>
                </div>
                <div>
                  <input type="radio" name="rating" id="rating3" value="3" />
                  <label htmlFor="rating3" className="ms-2">3 Stars & above</label>
                </div>
                <div>
                  <input type="radio" name="rating" id="rating2" value="2" />
                  <label htmlFor="rating2" className="ms-2">2 Stars & above</label>
                </div>
                <div>
                  <input type="radio" name="rating" id="rating1" value="1" />
                  <label htmlFor="rating1" className="ms-2">1 Star & above</label>
                </div>
              </div>

              {/* Sort by Section */}
              <p className="fw-bold mt-4">Sort by</p>
              <div className="d-flex flex-column gap-2">
                <div>
                  <input type="radio" name="sort" id="lowToHigh" value="lowToHigh" defaultChecked />
                  <label htmlFor="lowToHigh" className="ms-2">Price - Low to High</label>
                </div>
                <div>
                  <input type="radio" name="sort" id="highToLow" value="highToLow" />
                  <label htmlFor="highToLow" className="ms-2">Price - High to Low</label>
                </div>
              </div>
            </div>

          </div>
        </div>
         <div><button className="btn my-btn btn-outline-secondary d-none" onClick={() => setIsOpen(!isOpen)}>
          ☰  
        </button></div>
        <div className='w-75  px-0 mx-0' style={{ width: "85%" }}>
          {/* //card section   */}

          <div className="container-fluid">

            <div className="d-flex  px-3 py-2">

              <h5 className="fw-bold mb-2">
                Showing All Products
              </h5>
              <small className="text-muted ps-2">
                (Showing {data?.length || 0} products)
              </small>
            </div>

            {/* Products */}
            <div className="row g-3 px-3">
              {loading && <p>Loading products...</p>}
              {error && <p className="text-danger">Failed to load products</p>}
              {!loading && data?.length === 0 && <p>No products found</p>}

              {data?.map((product) => (
                <div className="col-md-4 col-lg-3" key={product._id}>
                  <div className="card h-100 border-0 shadow-sm">
                    {/* Product Image */}
                    <div className="position-relative">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="card-img-top"
                        style={{ height: "250px", objectFit: "cover", borderRadius: "5px" }}
                      />
                      {/* Wishlist Button (Heart Icon) */}
                      <button
                        className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: "36px", height: "36px" }}
                        onClick={() => console.log("Add to wishlist", product._id)}
                      >
                        <span style={{ fontSize: "1.6rem", color: "#9c9c9cff" }}>&#9825;</span>
                      </button>

                    </div>

                    {/* Product Details */}
                    <div className="card-body text-center">
                      <h6 className="card-title">{product.productName}</h6>
                      <p className="fw-bold">₹ {product.productPrice}</p>

                      <button
                        className="btn  w-100 text-light" style={{ backgroundColor: "#9c9c9cff" }}
                        onClick={() => console.log("Add to Cart", product._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>




          {/* // */}
        </div>
        <div></div>
      </div>
    </div>

  )
}

export default ProductListining
