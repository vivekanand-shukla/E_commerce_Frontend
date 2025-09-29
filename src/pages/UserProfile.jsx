import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { allContext } from "../context/context";
import { useMainUrl } from "../customHooks/useMainUrl";

import { toast } from 'react-toastify';


const showToast = (t) => {
  toast.success(`${t}`);
};

const showToastError = (t) => {
  toast.error(`${t}`);
};



const UserProfile = () => {




  const { mainUrl } = useMainUrl(); 
  const { totalCartItem, totalWishlistItem  ,quan} = useContext(allContext);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(""); 
  const [selectedOption, setSelectedOption] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [editId, setEditId] = useState(null); 

    const q = JSON.parse(localStorage.getItem("quan"));

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await fetch(`${mainUrl}/api/address`);
      const data = await res.json();
      setAddresses(data);
      if (data.length > 0) {
        setSelectedAddress(data[0].choosedAddressForOrder);
        setSelectedOption(data[0].address);
      }
    } catch (err) {
      // console.error("Error fetching addresses:", err);
    }
  };
const [orderedData ,setOrderedData]= useState([])
   useEffect(() => {
    async function fetchCartData() {
      try {
        const response = await fetch(`${mainUrl}/api/products`);
        const result = await response.json();

        if (result) {
          const cartItems = result.filter((d) => d.isProductOrdered === true);

          setOrderedData((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(cartItems)) {
              return cartItems;
            }
            return prev;
          });
        
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }

    fetchCartData();
  }, [mainUrl]);



  
  const handleAddOrUpdateAddress = async () => {
    if (!newAddress.trim()) return;

    try {
      if (editId) {
        // UPDATE request
        const res = await fetch(`${mainUrl}/address/${editId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: newAddress }),
        });
        await res.json();
        setEditId(null);
        showToast("address updated")
      } else {
        // CREATE request
        await fetch(`${mainUrl}/api/address`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: newAddress }),


        });
        showToast("address added")
      }

      setNewAddress("");
      fetchAddresses(); // Refresh list
    } catch (err) {
      // console.error("Error adding/updating address:", err);
    }
  };

  // Delete Address
  const handleDeleteAddress = async (id) => {
    try {
      await fetch(`${mainUrl}/api/address/${id}`, {
        method: "DELETE",
      });
     

      showToastError('address deleted')
      fetchAddresses();
    } catch (err) {
   
    }
  };

  // Edit Address
  const handleEditAddress = (addr) => {
    setNewAddress(addr.address);
    setEditId(addr._id);
  };




  // Change delivery address 
const handleChangeDeliveryAddress = async () => {
  if (!selectedOption) return;

  try {
    const res = await fetch(`${mainUrl}/api/choosedAdress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newChoosedAddress: selectedOption }),
    });

    const data = await res.json();
   

    setSelectedAddress(selectedOption); 
    if(data){

         showToast("address changed")
    }
  } catch (err) {
  
  }
};


  async function deleteHistory(productId) {
    try {
      const response = await fetch(`${mainUrl}/api/products/update/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isProductOrdered:false }),
      });
    setOrderedData(prev => prev.filter(item => item._id !== productId));
    } catch (err) {
      console.error(" update failed:", err);
    }
  }

  return (
    <div style={{ backgroundColor: "#f8f8f8", minHeight: "130vh" }}>
      <Navbar noOfCartItem={totalCartItem} totalWishlistItem={totalWishlistItem} />
      <div className="container" style={{ paddingTop: "6%" }}>
        <h3 className="fw-bold text-center mb-4">My Profile</h3>

        <div className="p-4 mb-4" style={{ backgroundColor: "#fff" }}>
          <h5 className="fw-bold mb-3">Personal Details</h5>
          <p><strong>Name:</strong> Vivek Kumar</p>
          <p><strong>Email:</strong> vivek@example.com</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
          <p className="text-wrap break-text w-75"><strong>Delivery Address:</strong   > <span className="text-wrap break-text w-75">{selectedAddress || "No address selected"}</span></p>

          {/* Address List */}
          <h6 className="fw-bold mt-4">Addresses</h6>
          <ul className="list-group mb-3">
            {addresses.length === 0 ? (
              <p className="text-muted">No addresses added yet.</p>
            ) : (
              addresses.map((addr) => (
              <li
  key={addr._id}
  className="list-group-item d-flex justify-content-between align-items-center w-100"
>
  <div className="text-wrap break-text me-2">
    {addr.address}
  </div>
  <div className="d-flex align-items-center">
    <button
      className="btn btn-sm btn-outline-secondary me-2"
      onClick={() => handleEditAddress(addr)}
    >
      ✏️
    </button>
    <button
      className="btn btn-sm btn-outline-danger"
      onClick={() => handleDeleteAddress(addr._id)}
    >
      🗑️
    </button>
  </div>
</li>

              ))
            )}
          </ul>

          {/* Dropdown to select address */}
          {addresses.length > 0 && (
            <div>
              <label className="fw-semibold me-2">Change Delivery Address:</label>
            <div className="mb-3 d-flex align-items-center">
               <select
    className="form-select  w-50 me-2   text-nowrap"
    
    onChange={(e) => setSelectedOption(e.target.value)}
  >
    {addresses.map((addr) => (
      <option key={addr._id} value={addr.address} className="text-truncate">
        {addr.address}
      </option>
    ))}
  </select>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleChangeDeliveryAddress}
              >
                Set   address
              </button>
            </div>
       </div>   )}

          {/* Add/Edit Address */}
          <div className="d-flex">
            <input
              type="text"
              placeholder="Enter new address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="form-control me-2"
            />
            <button className="btn btn-primary" onClick={handleAddOrUpdateAddress}>
              {editId ? "Update" : "Add"}
            </button>
          </div>
       
            
                  
            
            
            

        </div>

<div className="text-center">

  <h2>Ordered history </h2>
</div>
  {/* // */}
  <div className=" text-center d-flex align-items-center   flex-wrap w-100">
   {orderedData.map(item => <div key={item._id} className=" ">
                    <div className="  mb-4 p-3 rounded bg-white" style={{ maxWidth: "300px" }}>
 
  <div className="d-flex flex-column lex-lg-row">
    <img
      src={item.productImage}
      alt={item.productName}
      className="img-fluid rounded bg-light"
      style={{ width: "100%",  height: "300px", objectFit: "cover" }}
    />

    <div className="m-3 d-flex flex-column justify-content-between w-100">
      <div>
        <h5 className="fw-bold">{item.productName}</h5>

        <p className="fw-bold mb-1 fs-5">₹{item.productPrice}</p>
       

      </div>

      
    </div>
  </div>

 

</div> 



                    {/* // */}
            
  </div>)}
</div>
<style>
  {
    `
    .break-text {
  white-space: normal !important;
  word-break: break-word;
  overflow-wrap: break-word;
}

    
    
    `
  }
</style>
      </div>
    </div>
  );
};

export default UserProfile;
