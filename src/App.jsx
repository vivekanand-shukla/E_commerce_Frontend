import { useState } from 'react'
import Navbar from './components/Navbar'
import { useFetch } from "./customHooks/useFetch"
import CategoryCard from "./components/CategoryCard"
import {Link} from "react-router-dom"

function App() {
  const mainUrl = `https://e-commerce-app-backend-seven-sand.vercel.app`
  const productsUrl = `/api/products`
  const { data, loading, error } = useFetch(mainUrl, productsUrl, "GET")

  if (data) {
    console.log(data)
  }

  const catagoryData = data?.filter(
    (item, index, self) =>
      index === self.findIndex(
        (t) => t.category.productCategory === item.category.productCategory
      )
  );
  console.log(catagoryData)

  const newArrivel = []
  if (catagoryData) {
    newArrivel.push(catagoryData[0])
    newArrivel.push(catagoryData[1])
  }

  return (
    <>
     <Link to={"/products"}>to product page</Link> 
        <Navbar />  
       <div  style={{ backgroundColor: "#f9f9f9" }}>
        <div  className='container' >
          <div className="row container my-5" >
            {catagoryData &&
              catagoryData.map((i) => (
                <div className="col-md-3 my-4" key={i._id}>
                  <CategoryCard e={i} />
                </div>
              ))}
          </div>
      
          <div className="my-4  container">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/002/006/775/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg"
              alt="banner"
              className="img-fluid w-100"
             
            />
          </div>  


   <div className='container  my-5'>
          <div className=" row   ">
            {newArrivel.map((n) => (
              <div className="col-md-6  p-4 " key={n._id}>
                <div
                  className="py-5 h-100 w-100 d-flex container"
                  style={{
                    backgroundColor: "#d9d9d9"}}>
             
                  <div className='h-75 w-25 ' 
                                     > 
                    <img 
                      src={n.productImage}
                      alt={n.category.productCategory}
                   style={{ width: "100px",  height: "115px", objectFit: "cover"  }} 
                    className='img-fluid' />
                  </div> 

               
                  <div className='px-2'>
                    <p  className='mb-5'>NEW ARRIVALS</p>
                    <h5 >
                      {n.category.productCategory}
                    </h5>
                    <p>
                      {n.productDiscription}
                    </p>
                  </div>
                </div>
              </div>
            ))}  
           </div>  
             </div> 

         </div> 
       </div> 
    </>
  )
}

export default App  //style 1
