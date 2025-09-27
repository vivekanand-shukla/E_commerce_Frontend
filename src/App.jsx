import Navbar from './components/Navbar'
import { useFetch  } from "./customHooks/useFetch"
import CategoryCard from "./components/CategoryCard"
import { useState ,useEffect ,useContext } from 'react'
import {useMainUrl} from './customHooks/useMainUrl'
import { allContext } from './context/context'
 import { Link } from 'react-router-dom'
 import 'bootstrap/dist/css/bootstrap.min.css';
 import { ToastContainer, toast } from 'react-toastify';
function App() {
  const { mainUrl } = useMainUrl()

 
  const productsUrl = `/api/products`
  const { data, loading, error } = useFetch(mainUrl, productsUrl, "GET")



const {search ,totalCartItem, totalWishlistItem}= useContext(allContext)
  
  
  
  


const [catagoryData, setCatagoryData] = useState([]);
const [newArrivel, setNewArrivel] = useState([]);

useEffect(() => {
  if (data) {
    const uniqueCategories = data.filter(
      (item, index, self) =>
        index === self.findIndex(
          (t) => t.category.productCategory === item.category.productCategory
        )
    );
    setCatagoryData(uniqueCategories);
    setNewArrivel(uniqueCategories.slice(0, 2));
  }
}, [data]);


function searchFilter(data ,search){
  return data.filter( d=>   d.category.productCategory.toLowerCase().includes(search.toLowerCase()))
}

let selectedSearch=[]
if(search.length > 0 && data){
 selectedSearch=  searchFilter(catagoryData ,search)

}
const renderData = search.length >0 ?selectedSearch:catagoryData
  return (
    <>
   

        <Navbar  />  

 
       <div  style={{ backgroundColor: "#ffff" }}>
        <div  className='container' >
          <div className="row container mt-5 mb-0" >
            { 
              renderData.length>0&& renderData.map((i) => (
                <div className="col-md-3 mt-4" key={i._id}>
                 <CategoryCard e={i} />
                </div>
              ))}

            {selectedSearch.length ==0 && search.length>0 && <p className='mt-5'>no category found</p>}

              
          </div>
      
          <div className="my-0  container">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/002/006/775/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg"
              alt="banner"
              className="img-fluid w-100"
             
            />
          </div>  


   <div className='container  my-5'>
          <div className=" row   ">
            {newArrivel?.map((n) => (
              <div className="col-md-6  p-4 " key={n?._id}>
                <Link  className="text-decoration-none text-reset " to={`/products/${n.category.productCategory}`}>
                <div
                  className="py-5 h-100 w-100 d-flex container"
                  style={{
                    backgroundColor: "#d9d9d9"}}>
             
                  <div className='h-75 w-25  ms-3' 
                                     > 
                    <img 
                      src={n?.productImage}
                      alt={n?.category.productCategory}
                   style={{ width: "115px",  height: "150px", objectFit: "cover"  }} 
                    className='img-fluid' />
                  </div> 

               
                  <div className='px-2'>
                    <p  className='mb-5'>NEW ARRIVALS</p>
                    <h5 >
                      {n?.category.productCategory}
                    </h5>
                    <p>
                      {n?.productDiscription}
                    </p>
                  </div>
                </div>
            </Link>
              </div>
          ))}  
           </div>  
             </div> 

         </div> 
       </div> 
    </>
  )
}

export default App  
