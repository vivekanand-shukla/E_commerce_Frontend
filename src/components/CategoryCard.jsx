import { Link } from "react-router-dom"

const CategoryCard = ({ e }) => {
    return (
        <Link className="text-decoration-none" to={`/products/${e.category.productCategory}`}>
            <div className='w-100 h-75 py-5'>
                <div className='w-100 h-100' >
                    <img src={e.productImage} alt="" className='w-100 h-100 img-fluid' />

                </div>
                <div className="w-100 text-center fs-4  position-relative bottom-50 text-dark fs-4 bg-light"
                >{e.category.productCategory}</div>
                <div className="w-100 text-center ">       </div>

            </div>
        </Link>

    )
}

export default CategoryCard

