// rafce
import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../components/MainNav'

const Layout = () => {
  return (
    <div>
    <MainNav />
   <main className='hfull'>
    <Outlet/> 
   </main>
    
    {/* Outletมีเพื่อสร้าง template ส่วนกลาง */}
    </div>
  )
}

export default Layout