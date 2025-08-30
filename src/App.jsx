import { useState } from 'react'
import Navbar from './components/Navbar'
import { useFetch } from "./customHooks/useFetch"
import CategoryCard from "./components/categoryCard"

function App() {
  const mainUrl = `http://localhost:3000/api`
  const productsUrl = `/products`
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
      <Navbar />
      <div style={{ backgroundColor: "#f9f9f9" }}>
        <div className="container">

      
          <div className="row my-4">
            {catagoryData &&
              catagoryData.map((i) => (
                <div className="col-6 col-md-4 col-lg-3 mb-3" key={i._id}>
                  <CategoryCard e={i} />
                </div>
              ))}
          </div>

      
          <div className="mb-4">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/002/006/775/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg"
              alt="banner"
              className="img-fluid"
              style={{
                height: "300px",
                objectFit: "cover",
                width: "100%"
              }}
            />
          </div>

 
          <div className="row">
            {newArrivel.map((n) => (
              <div className="col-12 col-md-6 mb-4" key={n._id}>
                <div
                  className="d-flex p-3"
                  style={{
                    backgroundColor: "#d9d9d9",
                    height: "200px", 
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "0px", 
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}
                >
             
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      backgroundColor: "#fff",
                      marginRight: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <img
                      src={n.productImage}
                      alt={n.category.productCategory}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain"
                      }}
                    />
                  </div>

               
                  <div className='mx-2'>
                    <p style={{ fontSize: "0.8rem", margin: 0,  paddingBottom:"70px"}}>NEW ARRIVALS</p>
                    <h5 style={{ fontWeight: "bold", margin: "5px 0" }}>
                      {n.category.productCategory}
                    </h5>
                    <p style={{ fontSize: "0.9rem", margin: 0 }}>
                      {n.productDiscription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default App
