import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { allContext } from '../context/context';
//  import "../pages/navber.css"
const Navbar = (p) => {
  const {setSearch } = useContext(allContext)
  function handleSearch( value){
       setSearch(value)

   }



  return (
    <div style={{width:"100%",  height:"90%"}} >

    <div className=" py-2 px-2" style={{ position: "fixed", top: "0" , zIndex: "5", backgroundColor:"white", width:"100%"}}>
      <div className="d-flex  justify-content-between align-items-center w-100">
        
      <Link className="text-light icon" to={`/`} style={{width:"20%"}}>
        <h5 className="text-secondary title">MyShoppingSite</h5>
</Link>
      
        <input
          type="text"
          className="form-control  my-search"
          placeholder="🔍  Search by name and category" style={{width:"40%"}}
          onChange={(e)=>handleSearch(e.target.value) }
        />

  
        <div className="d-flex align-items-center gap-4">
        
          <button
            className="text-light login  px-2"
            style={{ backgroundColor: "gray", border: "none", borderRadius: "2px" ,padding:"3px"  }}
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
             <span className='text-dark' >Cart</span> 
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


   <div style={{ paddingTop: "30px" }}></div>
    </div>
  )
}

export default Navbar
