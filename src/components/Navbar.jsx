import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
const Navbar = (p) => {
  return (
    <div >
    <div className="container py-2 " style={{ position: "fixed", top: "0" , zIndex: "5", backgroundColor:"white", width:"100%"}}>
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        
   
        <h5 className="text-secondary">MyShoppingSite</h5>

      
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍  Search"
        />

  
        <div className="d-flex align-items-center gap-4">
        
          <button
            className="text-light px-3 py-1"
            style={{ backgroundColor: "gray", border: "none", borderRadius: "2px" }}
          >
            Login
          </button>

  
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

       <Link className="text-light" to={`/cart`}>
          <div className="position-relative d-flex align-items-center" >
            <span style={{ fontSize: "23px", color: "gray" }}>
              &#128722;
            </span>
            <span 
              className="badge position-absolute bg-danger rounded-circle"
              style={{ top: "-12px", right: "-10px" }}
            >
              {p.noOfCartItem}
            </span>
             <span >Cart</span> 
          </div>
           </Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Navbar
