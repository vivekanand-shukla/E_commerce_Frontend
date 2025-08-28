import { useState } from 'react'
import Navbar from './components/Navbar'
import {useFetch } from "./customHooks/useFetch"


function App() {
  const mainUrl = `http://localhost:3000/api`
  const productsUrl = `/products`
  const  {data , loading , error } = useFetch(mainUrl,productsUrl ,"GET")
   if(data) {

     console.log(data)
   }
  
  return (
    <>
      <div>
        <div className='container'>
      <Navbar/>

        </div>


      </div>
    </>
  )
}

export default App
