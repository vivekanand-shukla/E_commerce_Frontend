import React from 'react'

const CategoryCard = ({ e }) => {
    return (
        <div className=' m-4' >
            <img src={e.productImage} alt="" height="280px" width="280px" />
            <div className='text-center py-1' style={{ position: "relative", bottom: "150px", color: "black", fontSize: "110%", width: "17.5vw",  backgroundColor: "white" }}>{e.category.productCategory}</div>

             
        </div>

    )
}

export default CategoryCard


