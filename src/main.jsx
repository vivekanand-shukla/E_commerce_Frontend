import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductListining from "./pages/ProductListining.jsx"
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import WishList from './pages/WishList.jsx';
import UserProfile from './pages/UserProfile.jsx';
import { allContext } from './context/context.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import Navbar from './components/Navbar.jsx';
// Router define karein
const routes = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/products/:cat", element: <ProductListining /> },
  { path: "/Detail/:id", element: <ProductDetail /> },
  { path: "/cart", element: <Cart /> },
  { path: "/wishlist", element: <WishList /> },
  { path: "/user", element: <UserProfile /> },
  { path: "/checkout/:id", element: <CheckoutPage /> },

])

//  Wrapper component banaya
function Root() {
  const [search, setSearch] = useState("")
  const [cart ,setCart] = useState([])
  const [totalCartItem ,settotalCartItem] = useState(0)
  const [totalWishlistItem ,settotalWishlistItem] = useState(0)

  return (
    <allContext.Provider value={{ search, setSearch , cart ,setCart , totalCartItem  ,settotalCartItem ,totalWishlistItem ,settotalWishlistItem}}>
      <RouterProvider router={routes} />
     
    </allContext.Provider>
  )
}
createRoot(document.getElementById('root')).render(
  <Root />
 )
