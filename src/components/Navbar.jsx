import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { allContext } from '../context/context';
 
const Navbar = (p) => {
  const {setSearch } = useContext(allContext)
  function handleSearch( value){
       setSearch(value)

   }



  return (
    <div >

    <div className="container py-2 " style={{ position: "fixed", top: "0" , zIndex: "5", backgroundColor:"white", width:"100%"}}>
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        
      <Link className="text-light" to={`/`}>
        <h5 className="text-secondary">MyShoppingSite</h5>
</Link>
      
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍  Search by name and category"
          onChange={(e)=>handleSearch(e.target.value) }
        />

  
        <div className="d-flex align-items-center gap-4">
        
          <button
            className="text-light px-3 py-1"
            style={{ backgroundColor: "gray", border: "none", borderRadius: "2px" }}
          >
            Login
          </button>

   <Link className="text-light" to={`/wishlist`}>
          <div className="position-relative">
            <span style={{ fontSize: "34px", color: "gray" }}>
              &#9825;
            </span>
            <span
              className="badge position-absolute bg-danger rounded-circle"
              style={{ top: "-5px", right: "-10px" }}
            >
              { p.totalWishlistItem} 
            </span>
          </div>
</Link>
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
           <div className='user-profile'>
            <Link to={`/user`}>
               <div className='p-2 px-3 btn btn-secondary text-light' style={{borderRadius:"50%",}}>V</div>
</Link>
           </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Navbar
