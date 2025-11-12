// rafce
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import MQuatation from '../pages/MQuatation'
import History from '../pages/user/History'
import Checkout from '../pages/Checkout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layout from '../layouts/Layout'
import Layoutadmin from '../layouts/LayoutAdmin'
import Dashboard from '../pages/admin/Dashboard'
import Category from '../pages/admin/Category'
import Role from '../pages/admin/Role'
import Color from '../pages/admin/Color'
import Branch from '../pages/admin/Branch'
import Product from '../pages/admin/Product'
import Manage from '../pages/admin/Manage'
import Quotation from '../pages/admin/Quotation'
import LoggerMan from '../pages/admin/LoggerMan'
import LayoutUser from '../layouts/LayoutUser'
import HomeUser from '../pages/user/HomeUser'
import ProtectRouteUser from './ProtectRouteUser'
import EditProduct from '../pages/admin/EditProduct'
import Payment from '../pages/user/Payment'
import ManageOrders from '../pages/admin/ManageOrders'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: < Home /> },
            { path: 'shop', element: < Shop /> },
            { path: 'cart', element: < Cart /> },
            { path: 'history', element: < History /> },
            { path: 'checkout', element: < Checkout /> },
            { path: 'MQuatation', element: < MQuatation /> },
            { path: 'login', element: < Login /> },
            { path: 'register', element: < Register /> },

        ]
    },
    {
        path: '/admin',
        element: <Layoutadmin />,
        children: [
            { index: true, element: < Dashboard /> },
            { path: 'Category', element: < Category /> },
            { path: 'Product', element: < Product /> },
            { path: 'Product/:id', element: < EditProduct /> },
            { path: 'Manage', element: < Manage /> },
            { path: 'Role', element: < Role /> },
            { path: 'Color', element: < Color /> },
            { path: 'Branch', element: < Branch /> },
            { path: 'orders', element: < ManageOrders /> },
            { path: 'Quotation', element: < Quotation /> },
            { path: 'LoggerMan', element: < LoggerMan /> },



        ]
    },
    {
        path: '/user',
        element: <LayoutUser />,
        // element: <ProtectRouteUser element={<LayoutUser/>}/>,
        children: [
            { index: true, element: <  HomeUser/> },
            { path: 'Payment', element: < Payment /> },
             { path: 'history', element: < History /> },

        ]
    },



])
const AppRoutes = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default AppRoutes