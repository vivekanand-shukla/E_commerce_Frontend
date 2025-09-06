import {Link} from "react-router-dom"

const CategoryCard = ({ e }) => {
    return (
        <div className='w-100 h-100 py-5'>
            <div  className='w-100 h-100' >
            <img src={e.productImage} alt="" className='w-100 h-100 img-fluid'  />

            </div>
           
            <div className="w-100 text-center fs-4  position-relative bottom-50 text-dark fs-4 bg-light"  
 >{e.category.productCategory}</div>
            <div className="w-100 text-center ">  <Link className="btn btn-secondary text-light" to={`/products/${e.category.productCategory}`}>find more in {e.category.productCategory}</Link>      </div>

        </div>

    )
}

export default CategoryCard

