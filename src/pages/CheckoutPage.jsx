import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { useMainUrl } from "../customHooks/useMainUrl";
import { useFetch } from "../customHooks/useFetch";
import CheckoutCard from "../components/CheckoutCard";
import { allContext } from "../context/context";
import { useParams } from "react-router-dom";

const Checkout = () => {
  const { mainUrl } = useMainUrl();
  const { id } = useParams();
  const { data, loading, error } = useFetch(mainUrl, "/api/products", "GET");
  
  const [productToBuy, setProductToBuy] = useState({});
  const [orderedProducts, setOrderedProducts] = useState([]);
  const { search, totalWishlistItem, totalCartItem } = useContext(allContext);
  const [adress, setSelectedAddress] = useState('')
//


  
        useEffect(() => {
          fetchAddresses();
        }, []);
      
        const fetchAddresses = async () => {
          try {
            const res = await fetch(`${mainUrl}/api/address`);
            const data = await res.json();
          
            if (data.length > 0) {
              setSelectedAddress(data[0].choosedAddressForOrder);
              
            }
          } catch (err) {
            // console.error("Error fetching addresses:", err);
          }
        };
    
//




  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const res = await fetch(`${mainUrl}/api/products`);
        const data = await res.json();
  if (data) {
      setProductToBuy(data.find((d) => d._id === id));
      setOrderedProducts(data.filter((d) => d.isProductOrdered === true));
    }
      } catch (error) {
        // console.error("Error fetching data", error);
      }
    };
    fetchData();
    
  },[orderedProducts]);

  const filteredOrders =
    search.trim().length > 0
      ? orderedProducts.filter((item) =>
          item.productName.toLowerCase().includes(search.toLowerCase())
        )
      : orderedProducts;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <Navbar noOfCartItem={totalCartItem} totalWishlistItem={totalWishlistItem} />
         <h3 className="pt-5 container">your current dilevery Address : {adress}</h3>
      <div className="my-5">
        {productToBuy && <CheckoutCard item={productToBuy} mainUrl={mainUrl} isBuyed={false} />}
      </div>
      <div className="container" style={{ paddingTop: "5%" }}>
        <h5 className="fw-bold text-center my-4">
          Ordered Products ({orderedProducts.length})
        </h5>

        {orderedProducts.length === 0 ? (
          <p className="text-center">No products ordered</p>
        ) : (
          filteredOrders.map((item) => (
            <CheckoutCard key={item._id} item={item} mainUrl={mainUrl}  setOrderedProducts={setOrderedProducts}  isBuyed={true}/>
          ))
        )}
      </div>
    </div>
  );
};

export default Checkout;
