import  { useState, useEffect } from "react";
import {  toast } from 'react-toastify';
import { useContext  } from "react";
import { allContext } from '../context/context'

const CheckoutCard = ({ mainUrl ,isAdressSelect }) => {
  const [cartData, setCartData] = useState([]);
    const alertMessage = (m) => {
    toast.success(`${m}`);
  };
    const alertMessageerror = (m) => {
    toast.error(`${m}`);
  };
      const {   settotalCartItem } = useContext(allContext)
  useEffect(() => {
    async function fetchCartData() {
      try {
        const response = await fetch(`${mainUrl}/api/products`);
        const result = await response.json();

        if (result) {
          const cartItems = result.filter((d) => d.isAddedToCart === true);

          setCartData((prev) => {
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


  async function handleBuyNow(id) {
    try {
      const response = await fetch(`${mainUrl}/api/products/update/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isProductOrdered: true ,isAddedToCart:false  }),
      });

      const data = await response.json();
 setIsBuyed(0);
    


    } catch (error) {
      console.error("Error ordering:", error);
    }
  }
async function buyAll(){
  const arr =[]
    for (const p of cartData) {
        await handleBuyNow(p._id);
    
        arr.push({ [p._id]: p.productQuantity || 1 });
      }
  alertMessage("Ordered Placed successfully")
    settotalCartItem(0)

    localStorage.setItem("quan", JSON.stringify(arr));


}




  // Totals calculation
  let price1 = 0;
  let discount1 = 0;
  let delivery1 = 0;
const [isBuyed ,setIsBuyed] = useState(0)
  cartData.forEach((item) => {
    price1 += item.productPrice * item.productQuantity;
    discount1 += (item.offOnProduct / 100) * item.productPrice * item.productQuantity;
    delivery1 += item.diliveryCharges * item.productQuantity;
  
  });


useEffect(() => {
  let count = 0;
  cartData.forEach((item) => {
    if (item.isAddedToCart) count++;
  });
  setIsBuyed(count);
}, [cartData]);



  // ✅ Correct total for UI (Price - Discount + Delivery)
  const displayTotal = price1 - discount1 + delivery1;

  return (
    <div className="mx-auto mb-4" style={{ maxWidth: "90%" }}>
     {isBuyed >0 ? <div className="bg-white rounded shadow-sm p-3">
        <h6 className="fw-bold mb-3">PRICE DETAILS</h6>
        <hr />
        <div>
          {cartData.map((p) => (
            <p key={p._id}>
              <span className="d-flex justify-content-between">
                <span>
                  <span>{p.productName}</span>
                  <span> quantity({p.productQuantity})</span>
                </span>
                <span className="text-center ">
                  price : ₹ {(p.productPrice * p.productQuantity).toFixed(2)}
                </span>
              </span>
            </p>
          ))}
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <span>price</span>
          <span>₹{price1.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Discount</span>
          <span>- ₹{discount1.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Delivery Charges</span>
          <span>₹{delivery1.toFixed(2)}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span>TOTAL AMOUNT</span>
          <span>₹{displayTotal.toFixed(2)}</span>
        </div>
        <hr />
        <p className="small">
          You will save ₹{discount1.toFixed(2)} on this order
        </p>

        <div className="text-center">
         {isAdressSelect ? <button className="btn btn-primary w-75" onClick={()=>buyAll()}> 
            checkout
          </button>:<button className="btn btn-primary w-75" onClick={()=>alertMessageerror("first select adress")}> 
            checkout
          </button>}
        </div>
      </div>:
        <div>no products in cart yet ...</div>
      }
    </div>
  );
};

export default CheckoutCard;
