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
  const { mainUrl } = useMainUrl(); // tumhari custom hook jo base URL de raha hai
  const { totalCartItem, totalWishlistItem } = useContext(allContext);

  // Backend se aane wale addresses
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(""); 
  const [selectedOption, setSelectedOption] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [editId, setEditId] = useState(null); // address id for update

  // Fetch all addresses on mount
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

  // Add or Update Address


  
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
      // console.error("Error deleting address:", err);
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
    // console.log("Updated choosedAddressForOrder:", data);

    setSelectedAddress(selectedOption); // UI update karo
    if(data){

         showToast("address changed")
    }
  } catch (err) {
    // console.error("Error updating choosed address:", err);
  }
};


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
          <p className="overflow-scroll w-75"><strong>Delivery Address:</strong   > <span className="overflow-scroll w-75">{selectedAddress || "No address selected"}</span></p>

          {/* Address List */}
          <h6 className="fw-bold mt-4">Addresses</h6>
          <ul className="list-group mb-3">
            {addresses.length === 0 ? (
              <p className="text-muted">No addresses added yet.</p>
            ) : (
              addresses.map((addr) => (
                <li
                  key={addr._id}
                  className="list-group-item d-flex justify-content-between align-items-center  w-100"
                >
                  <div className="overflow-scroll w-75">

                  {addr.address}
                  </div>
                  <div>
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
            <div className="mb-3 d-flex align-items-center">
              <label className="fw-semibold me-2">Change Delivery Address:</label>
              <select
                className="form-select w-auto me-2 "  size={3}
                // value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {addresses.map((addr) => (
                  <option key={addr._id} value={addr.address}  >
                    

                    {addr.address}
              
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleChangeDeliveryAddress}
              >
                Set as Delivery Address
              </button>
            </div>
          )}

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
      </div>
    </div>
  );
};

export default UserProfile;
