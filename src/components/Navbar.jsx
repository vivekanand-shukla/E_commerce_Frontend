import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { allContext } from '../context/context'

const Navbar = (p) => {
  const { setSearch ,totalWishlistItem ,totalCartItem } = useContext(allContext)

  function handleSearch(value) {
    setSearch(value)
  }

  return (
    <div className=""  style={{ zIndex: 100, backgroundColor: "white", position: "relative" }}>
      <div className="py-2 px-2 position-fixed top-0 w-100 bg-white z-3">
        <div className="container d-flex justify-content-between align-items-center w-100 flex-nowrap">
          {/* Brand */}
          <Link className="text-decoration-none" to={`/`}>
            <h5 className="text-secondary brand-text">MyShoppingSite</h5>
          </Link>

          {/* Search */}
          <input
            type="text"
            className="form-control search-input"
            placeholder="🔍 Search"
            onChange={(e) => handleSearch(e.target.value)}
          />

          {/* Right Side */}
          <div className="d-flex align-items-center right-section">
            <button className="btn btn-secondary btn-sm login-btn">Login</button>

            {/* Wishlist */}
            <Link className="text-decoration-none" to={`/wishlist`}>
              <div className="position-relative">
                <span className="wishlist-icon text-secondary" style={{ fontSize:"35px"}}>&#9825;</span>
                 {totalWishlistItem>0 ? 
                <span className="badge position-absolute bg-danger rounded-circle top-0 start-100 translate-middle">
                  {totalWishlistItem}
                </span>
                 :""} 
              </div>
            </Link>

            {/* Cart */}
            <Link className="text-decoration-none" to={`/cart`}>
              <div className="position-relative d-flex align-items-center cart-section">
                <span className="cart-icon text-secondary">&#128722;</span>
               {totalCartItem>0? 
                 <span className="badge position-absolute bg-danger rounded-circle top-0 start-100 translate-middle">
                  {totalCartItem}
                </span>
                  :""} 
                <span className="text-dark ms-1 cart-text">Cart</span>
              </div>
            </Link>

            {/* User */}
            <Link to={`/user`} className="text-decoration-none">
              <div className="btn btn-secondary rounded-circle text-light d-flex justify-content-center align-items-center p-2 user-btn">
                V
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-5"></div>

      <style>
        {`
         
          .brand-text {
            font-size: 0.9rem;
            max-width: 90px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .search-input {
            width: 40%;
            min-width: 100px;
            max-width: 180px;
            font-size: 0.8rem;
            padding: 0.3rem 0.5rem;
          }
          .login-btn {
            font-size: 0.3rem;
            padding: 0.1rem 0.1rem;
          }
          .right-section {
            gap: 6px;
          }
          .wishlist-icon {
            font-size: 1.2rem; /* chhoti screen me chhota */
          }
          .cart-icon {
            font-size: 1.1rem;
          }
          .cart-text {
            font-size: 0.75rem;
          }
          .user-btn {
            width: 28px;
            height: 28px;
            font-size: 0.75rem;
          }
          .badge {
            font-size: 0.55rem;
            padding: 0.2rem 0.3rem;
          }

         @media (max-width: 360px) {
  .brand-text {
    font-size: 0.7rem;
    max-width: 70px;
  }
  .search-input {
    width: 35%;
    min-width: 90px;
    max-width: 140px;
    font-size: 0.7rem;
  }
  .login-btn {
    font-size: 0.65rem;
    padding: 0.15rem 0.3rem;
  }
  .cart-text {
    display: none; 
  }
  .user-btn {
    width: 24px;
    height: 24px;
    font-size: 0.7rem;
  }

 
  .wishlist-icon {
    font-size: 1.45rem !important;  
  }
}

       
          @media (min-width: 700px) {
            .brand-text {
              font-size: 1.2rem;
              max-width: none;
            }
            .search-input {
              width: 50%;
              min-width: 200px;
              max-width: 400px;
              font-size: 1rem;
              padding: 0.4rem 0.6rem;
            }
            .login-btn {
              font-size: 0.9rem;
              padding: 0.3rem 0.6rem;
            }
            .right-section {
              gap: 20px;
            }
            .wishlist-icon {
              font-size: 1.6rem;
            }
            .cart-icon {
              font-size: 1.4rem;
            }
            .cart-text {
              font-size: 0.9rem;
              display: inline;
            }
            .user-btn {
              width: 36px;
              height: 36px;
              font-size: 1rem;
            }
            .badge {
              font-size: 0.7rem;
              padding: 0.3rem 0.4rem;
            }
          }
        `}
      </style>
    </div>
  )
}

export default Navbar
