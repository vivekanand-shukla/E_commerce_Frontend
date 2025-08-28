import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = () => {
  return (
    <div className="container py-2">
      <div className="d-flex justify-content-between align-items-center">
        
        {/* Logo */}
        <h5 className="text-secondary">MyShoppingSite</h5>

        {/* Search Bar */}
        <input
          type="text"
          className="form-control w-25"
          placeholder="🔍  Search"
        />

        {/* Right Side */}
        <div className="d-flex align-items-center gap-4">
          
          {/* Login Button */}
          <button
            className="text-light px-3 py-1"
            style={{ backgroundColor: "gray", border: "none", borderRadius: "2px" }}
          >
            Login
          </button>

          {/* Like with badge */}
          <div className="position-relative">
            <span style={{ fontSize: "34px", color: "gray" }}>
              &#9825;
            </span>
            <span
              className="badge position-absolute bg-danger rounded-circle"
              style={{ top: "-5px", right: "-10px" }}
            >
              2
            </span>
          </div>

          {/* Cart with badge + text */}
          <div className="position-relative d-flex align-items-center">
            <span style={{ fontSize: "23px", color: "gray" }}>
              &#128722;
            </span>
            <span
              className="badge position-absolute bg-danger rounded-circle"
              style={{ top: "-12px", right: "-10px" }}
            >
              2
            </span>
            <span className="">Cart</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
