import React, { useState  , useContext} from "react";
import Navbar from "../components/Navbar";
import { allContext } from "../context/context";
const UserProfile = () => {
  // Static user details
  const user = {
    name: "Vivek Kumar",
    email: "vivek@example.com",
    phone: "+91 9876543210",
  };

  // Address state (array)
  const [addresses, setAddresses] = useState([
    "123, MG Road, New Delhi",
    "Flat 402, Green Valley, Mumbai",
  ]);

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]); // delivery address
  const [selectedOption, setSelectedOption] = useState(addresses[0]); // dropdown temporary value
  const [newAddress, setNewAddress] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Order History (Static)
  const orderHistory = [
    { id: "ORD123", date: "2025-09-01", items: 3, total: 2999, status: "Delivered" },
    { id: "ORD124", date: "2025-08-20", items: 1, total: 1299, status: "Shipped" },
  ];

  // Add or Update Address
  const handleAddOrUpdateAddress = () => {
    if (!newAddress.trim()) return;

    if (editIndex !== null) {
      const updated = [...addresses];
      updated[editIndex] = newAddress;
      setAddresses(updated);
      setEditIndex(null);
    } else {
      setAddresses([...addresses, newAddress]);
    }
    setNewAddress("");
  };

  // Delete Address
  const handleDeleteAddress = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    if (selectedAddress === addresses[index]) {
      setSelectedAddress(updated[0] || "");
    }
  };

  // Edit Address
  const handleEditAddress = (index) => {
    setNewAddress(addresses[index]);
    setEditIndex(index);
  };

  // Change delivery address (button click)
  const handleChangeDeliveryAddress = () => {
    setSelectedAddress(selectedOption);
  };
  const{totalCartItem , totalWishlistItem} = useContext(allContext)

  return (
    <div style={{ backgroundColor: "#f8f8f8", minHeight: "130vh" }}>
      <Navbar  noOfCartItem ={totalCartItem} totalWishlistItem={totalWishlistItem}/>
      <div className="container" style={{ paddingTop: "6%" }}>
        <h3 className="fw-bold text-center mb-4">My Profile</h3>

        {/* User Info Card */}
        <div
          className="p-4 mb-4"
          style={{ backgroundColor: "#fff" }}
        >
          <h5 className="fw-bold mb-3">Personal Details</h5>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Delivery Address:</strong> {selectedAddress}</p>

          {/* Address Section */}
          <h6 className="fw-bold mt-4">Addresses</h6>
          <ul className="list-group mb-3">
            {addresses.length === 0 ? (
              <p className="text-muted">No addresses added yet.</p>
            ) : (
              addresses.map((addr, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {addr}
                  <div>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => handleEditAddress(index)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteAddress(index)}
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
                className="form-select w-auto me-2"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {addresses.map((addr, i) => (
                  <option key={i} value={addr}>
                    {addr}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary btn-sm" onClick={handleChangeDeliveryAddress}>
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
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>

        {/* Order History Card */}
        {/* <div
          className="p-4 "
          style={{ backgroundColor: "#fff",  marginBottom:"40%" }}
        >
          <h5 className="fw-bold mb-3">Order History</h5>
          {orderHistory.length === 0 ? (
            <p className="text-muted">No orders placed yet.</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.items}</td>
                    <td>₹{order.total}</td>
                    <td>
                      <span
                        className={`badge ${
                          order.status === "Delivered"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default UserProfile;
