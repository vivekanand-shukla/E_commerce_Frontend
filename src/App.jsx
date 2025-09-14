
import Navbar from './components/Navbar'
import { useFetch  } from "./customHooks/useFetch"
import CategoryCard from "./components/CategoryCard"
import { useState ,useEffect ,useContext } from 'react'
import {useMainUrl} from './customHooks/useMainUrl'
import { allContext } from './context/context'
 
function App() {
  const { mainUrl } = useMainUrl()

 
  const productsUrl = `/api/products`
  const { data, loading, error } = useFetch(mainUrl, productsUrl, "GET")
  // if(mainUrl){

  //   console.log(mainUrl)
  // }

  if (data) {
    console.log(data)
  }

const {search ,totalCartItem, totalWishlistItem}= useContext(allContext)
  
  
  
  
  // console.log(catagoryData)

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
 console.log(selectedSearch)
}
const renderData = search.length >0 ?selectedSearch:catagoryData
  return (
    <>
    <div className='w-100'>

        <Navbar  noOfCartItem ={totalCartItem}  totalWishlistItem={totalWishlistItem}/>  
    </div>
 
       <div  style={{ backgroundColor: "#f9f9f9" }}>
        <div  className='container' >
          <div className="row container my-5" >
            { 
              renderData.length>0&& renderData.map((i) => (
                <div className="col-md-3 my-4" key={i._id}>
                 <CategoryCard e={i} />
                </div>
              ))}

            {selectedSearch.length ==0 && search.length>0 && <p className='my-5'>no category found</p>}

              
          </div>
      
          <div className="my-4  container">
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
                <div
                  className="py-5 h-100 w-100 d-flex container"
                  style={{
                    backgroundColor: "#d9d9d9"}}>
             
                  <div className='h-75 w-25 ' 
                                     > 
                    <img 
                      src={n?.productImage}
                      alt={n?.category.productCategory}
                   style={{ width: "100px",  height: "115px", objectFit: "cover"  }} 
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
