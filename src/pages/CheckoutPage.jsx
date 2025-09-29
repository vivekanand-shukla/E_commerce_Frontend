import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { useMainUrl } from "../customHooks/useMainUrl";
import { useFetch } from "../customHooks/useFetch";
import CheckoutCard from "../components/CheckoutCard";
import { allContext } from "../context/context";

  import {  toast } from 'react-toastify';
const Checkout = () => {
  const { mainUrl } = useMainUrl();

  const { data, loading, error } = useFetch(mainUrl, "/api/products", "GET");
  

  const [isAdressSelect ,setISAdressSelected]= useState(false)
  const { search, totalWishlistItem, totalCartItem } = useContext(allContext);
  const [adress, setSelectedAddress] = useState('')
//

  const adressAlert = () => {
    toast.success("address changed");
  };



const [addresses, setAddresses] = useState([]);
const [selectedOption, setSelectedOption] = useState('')

useEffect(() => {
  fetchAllAddresses();
}, []);

const fetchAllAddresses = async () => {
  try {
    const res = await fetch(`${mainUrl}/api/address`);
    const data = await res.json();
    setAddresses(data);
  if (data.length > 0) {
  const defaultAddr = data.find(a => a.choosedAddressForOrder) || data[0];
  setSelectedOption(defaultAddr.address);
  setSelectedAddress(defaultAddr.address);
}
  } catch (err) {
    // console.error(err);
  }
};

const handleChangeDeliveryAddress = async () => {
  if (!selectedOption) return;
  try {
    await fetch(`${mainUrl}/api/choosedAdress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newChoosedAddress: selectedOption }),
    });
    setSelectedAddress(selectedOption); // update UI
    setISAdressSelected(true); // mark as selected
    adressAlert()
  } catch (err) {
    // console.error(err);
  }
};



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
           
          }
        };
    

  return (
    <div style={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <Navbar noOfCartItem={totalCartItem} totalWishlistItem={totalWishlistItem} />
         <h3 className="pt-5 container
         ">         Your Current Delivery Address : {adress || "No address selected"}
</h3>
         {addresses.length > 0 && (
  <div className="d-flex container align-items-center  mt-3">
    <select
      className="form-select  w-50 me-2 me-2"
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
    >
      {addresses.map((addr) => (
        <option key={addr._id} value={addr.address}>
          {addr.address}
        </option>
      ))}
    </select>
    <button className="btn btn-primary btn-sm" onClick={handleChangeDeliveryAddress}>
      Change Address
    </button>
  </div>
)}
      

       <div className="container" style={{ paddingTop: "5%" }}>

         {loading && <div className="text-center">Loading...</div>}
          {error &&   <div>Error: {error.message}</div>}

        <h5 className="fw-bold text-center my-4">
        
        </h5>

      
            <CheckoutCard  mainUrl={mainUrl}  isAdressSelect={isAdressSelect}  />
        
      </div>
    </div>
  );
};

export default Checkout;
