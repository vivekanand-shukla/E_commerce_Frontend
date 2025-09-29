import './ProductListining.css'
import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import { useFetch } from "../customHooks/useFetch"
import { Link, useParams } from "react-router-dom"
import { useMainUrl } from '../customHooks/useMainUrl'
import ProductCard from '../components/ProductCard'
import { allContext } from '../context/context'
import {  toast } from 'react-toastify';
function filterAll(priceFilter, category, rating, data) {
  return data.filter(d => {
    const priceMatch = priceFilter ? d.productPrice <= Number(priceFilter) : true;
    const categoryMatch = category.length > 0 ? category.includes(d.category.productCategory) : true;
    const ratingMatch = rating ? d.productRating >= Number(rating) : true;
    return priceMatch && categoryMatch && ratingMatch;
  });
}
 
  const addedToCart = () => {
    toast.success("product added to cart");
  };

function searchFilter(data, search) {
  return data.filter(d => d.productName.toLowerCase().includes(search.toLowerCase()) || d.category.productCategory.toLowerCase().includes(search.toLowerCase()))
}
const ProductListining = () => {
  const { mainUrl } = useMainUrl()
  const { search , cart , setCart ,totalCartItem , totalWishlistItem} = useContext(allContext)
 

  const productsUrl = `/api/products`
  const { data, loading, error } = useFetch(mainUrl, productsUrl, "GET")
  const paramsCategory = useParams()
  const newParams = paramsCategory.cat
  const [isOpen, setIsOpen] = useState(true);
  const [priceFilter, setPriceFilter] = useState(0)
  const [category, setCategory] = useState(newParams ? [newParams] : [])
  const [rating, setRating] = useState(0)
  const [priceShort, setPriceShort] = useState('')




  function handleClear() {
    setPriceFilter(0);
    setCategory([])
    setRating(0)
    setPriceShort('')
  }

  const catagoryData = data?.filter(
    (item, index, self) =>
      index === self.findIndex(
        (t) => t.category.productCategory === item.category.productCategory
      )
  );

  function handleCategory(e) {
    const { checked, value } = e.target
    if (checked) {
      setCategory(c => [...c, value])
    } else {
      setCategory(c => c.filter(e => e != value))
    }
  }

  const [products, setProducts] = useState([]);

useEffect(() => {
  if (data) setProducts(data); 
}, [data]);

  const [filter, setFilter] = useState([])
  useEffect(() => {

    if (products) {

      const a = filterAll(priceFilter, category, rating, products)
      let b = [...a]
      if (priceShort == "lowToHigh") {
        b = b.sort((c, d) => c.productPrice - d.productPrice);

      } else if (priceShort == "highToLow") {
        b = b.sort((c, d) => d.productPrice - c.productPrice);
      }
      setFilter(b)
    }
 }, [priceFilter, category, rating, data, priceShort , products])




  let selectedSearch = []
  if (search.length > 0 && data) {
    selectedSearch = searchFilter(products , search)

  }
  useEffect(()=>{

    setCart(search.length > 0 ?selectedSearch && selectedSearch: filter) 
  }, [search,  filter, ])




  return (
    <div>
      < Navbar className="w-100" products={filter} noOfCartItem ={totalCartItem}  totalWishlistItem={totalWishlistItem}/>

      <div className='container mainContainer w-100 d-flex py-2 d-flex flex-wrap' >

        <div style={{ width: "18%", height: "50%", background: "#f8f9fa", zIndex: 7 }}>
          <div className={`sidebar ${isOpen ? "open" : "closed"}`} >


            <div className='container' >

              <div className='d-flex  justify-content-between'>
                <p className='fw-bold ' >Filter</p>
                <p onClick={handleClear} className=' text-decoration-underline'>clear
                </p>
              </div>
              <div><p className=''></p></div>


              <label htmlFor="priceRange" className="form-label  fw-bold d-flex w-90 justify-content-between" ><span> Price</span>  {priceFilter && <small style={{ color: "#9c9c9cff" }} >  below:₹ {priceFilter} </small>}</label>
              <div className='w-100 d-flex justify-content-between' style={{ color: "#9c9c9cff" }}><span>0</span> <span>50k</span> <span>100k</span></div>
              <input
                type="range"
                className="form-range custom-range"
                min="0"
                max="100000"
                id="priceRange" onChange={(e) => setPriceFilter(e.target.value)}
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

                <div>
    <input
      type="checkbox"
      id="all-category"
      checked={category.length === 0}  
      onChange={() => setCategory([])}
       className="me-2"
    />
    <label htmlFor="all-category ">All</label>
  </div>

                <div>{catagoryData?.map(n => <div key={n?._id}><input type="checkbox" checked={category.includes(n?.category.productCategory)} onChange={handleCategory} name="Category" id={n?._id} value={n?.category.productCategory} /> <label htmlFor={n?._id}>{n?.category.productCategory}</label></div>)}</div>

              </div>


              <div className="p-3">

                <p className="fw-bold">Rating</p>
                <div className="d-flex flex-column gap-2" >
                  <div>
                    <input type="radio" name="rating" id="rating4" value="4" onChange={(e) => setRating(e.target.value)} />
                    <label htmlFor="rating4" className="ms-2">4 Stars & above</label>
                  </div>
                  <div>
                    <input type="radio" name="rating" id="rating3" value="3" onChange={(e) => setRating(e.target.value)} />
                    <label htmlFor="rating3" className="ms-2">3 Stars & above</label>
                  </div>
                  <div>
                    <input type="radio" name="rating" id="rating2" value="2" onChange={(e) => setRating(e.target.value)} />
                    <label htmlFor="rating2" className="ms-2">2 Stars & above</label>
                  </div>
                  <div>
                    <input type="radio" name="rating" id="rating1" value="1" onChange={(e) => setRating(e.target.value)} />
                    <label htmlFor="rating1" className="ms-2">1 Star & above</label>
                  </div>
                </div>

                {/* Sort by Section */}
                <p className="fw-bold mt-4">Sort by</p>
                <div className="d-flex flex-column gap-2">
                  <div>
                    <input type="radio" name="sort" id="lowToHigh" value="lowToHigh" onChange={(e) => setPriceShort(e.target.value)} defaultChecked />
                    <label htmlFor="lowToHigh" className="ms-2">Price - Low to High</label>
                  </div>
                  <div>
                    <input type="radio" name="sort" id="highToLow" value="highToLow" onChange={(e) => setPriceShort(e.target.value)} />
                    <label htmlFor="highToLow" className="ms-2">Price - High to Low</label>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className='h-25 toggle-btn w-100' style={{zIndex:100}}><button className="btn    toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen?<p>X</p> :<p>Show filter</p>}
          </button></div>
        </div>
        <div className='w-75  px-0 mx-0 mt-4' style={{ width: "85%" }}>
          {/* //card section   */}

          <div className="container-fluid"   >

            <div className="d-flex  px-3 py-2"  >

              <h5 className="fw-bold mb-2">
                Showing All Products
              </h5>
              <small className="text-muted ps-2">
                (Showing {cart?.length || 0} products)
              </small>
            </div>

            {/* Products */}
            <div className="row g-3 px-3" >
              {loading && <p>Loading products...</p>}
              {error && <p className="text-danger">Failed to load products</p>}
              {!loading && data?.length === 0 && <p>No products found</p>}

              { cart?.map((product) => (
                <ProductCard product={product} key={product._id}  setProducts={setProducts}  products={products} addedToCart={addedToCart} data={data}/>
              )

              )}
            
              {search.length > 0 && selectedSearch.length == 0 && <p className='p-5'>no item found</p>}
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
