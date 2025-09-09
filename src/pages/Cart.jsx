import React, { useState, useEffect ,useContext} from "react";
import Navbar from "../components/Navbar";
import { useMainUrl } from "../customHooks/useMainUrl";
import { useFetch } from "../customHooks/useFetch";
import CartCard from "../components/CartCard";
import { allContext } from "../context/context";

const Cart = () => {
  const { mainUrl } = useMainUrl();
  const productsUrl = `/api/products`;
  const { data, loading, error } = useFetch(mainUrl, productsUrl, "GET");

  const [cartData, setCartData] = useState([]);

  const {search}= useContext(allContext)


















  useEffect(() => {
    if (data) {
      setCartData(data.filter((d) => d.isAddedToCart === true));
    }
  }, [data]);
const filteredCartData =
  search.trim().length > 0
    ? cartData.filter((item) =>
        item.productName.toLowerCase().includes(search.toLowerCase())
      )
    : cartData;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <Navbar  noOfCartItem ={cartData.length}/>
      <div className="container " style={{ paddingTop: "5%" }}>
        <h5 className="fw-bold text-center my-4">
          MY CART ({cartData.length})
        </h5>

        {cartData.length === 0 ? (
          <p className="text-center">No items in cart</p>
        ) : (
          filteredCartData.map((item) => {
          return  <CartCard item={item}  key={item._id} mainUrl={mainUrl}/>
          
          })
        )}
            {search.length>0  &&filteredCartData.length==0 && <p className='p-5'>no item found</p> }
      </div>
    </div>
  );
};

export default Cart;
