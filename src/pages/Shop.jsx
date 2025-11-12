// rafce
import React, { useEffect } from 'react'
import ProductCard from './card/ProductCard'
import useEcomStore from '../store/ecom-store'
import SearchCard from './card/SearchCard'
import CartCard from './card/CartCard'

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)
  useEffect(() => {
    getProduct(10)
  }, [])

  return (
    <div className='flex'>

      {/* SearchBar */}
      <div className='w-1/4 p-4 bg-gray-100 h-screen'>
        <SearchCard />
      </div>

      {/* Product */}
      <div className='w-1/2 p-4 h-screen overflow-auto'>
        <p className='text-2xl font-bold mb-4'>สินค้าทั้งหมด</p>
        <div className='flex flex-wrap gap-4'>
          {/* Product card*/}
          {
            products.map((item, index)=>
              <ProductCard key={index} item={item}/>
            )

          }


          {/* Product card*/}
        </div>
      </div>


      {/* Cart */}
      <div className='w-1/4 bg-gray-100 h-screen overflow-y-auto'>
        <CartCard/>
      </div>
    </div>
  )
}

export default Shop