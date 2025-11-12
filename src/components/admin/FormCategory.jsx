// rafce
import React, { useState, useEffect } from 'react'
import { createCategory, listCategory, removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'



const FormCategory = () => {
    // Javascript
    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    //const [categories, setCategories] = useState([])
    const categories = useEcomStore((state) => state.categories)
    const getCategory = useEcomStore((state) => state.getCategory)
    useEffect(() => {
        getCategory(token)
    }, [])

    const handleSubmit = async (e) => {
        // code
        e.preventDefault()
        if (!name) {
            return toast.warning('Please fill data')
        }
        try {
            console.log(name)
            console.log('ccccccccccccccccccccccccccccc')
            const res = await createCategory(token, { name })
            console.log(res.data.name)
            toast.success(`Add Category ${res.data.name} success!!!`)
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }
    const handleRemove = async (id) => {
        console.log(id)
        try {
            const res = await removeCategory(token, id)
            console.log(res)
            toast.success(`Deleted ${res.data.name} success`)
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }
 const data = categories
   //console.log(role)
   //const myObjStr = JSON.stringify(role);
   // console.log(data) 
    const columns = [
        {
            name: 'name',
            selector: row => row.name,
        },
        {
            name: 'id',
            selector: row => row.id,
        },
        {
            name: 'id',
            button: true,
            selector: row => row.id,
            cell: () => <button type="button"
                class="btn btn-success"
                onClick={() => handleRemove()}>
                {/* ปัญหาคือตรงนรี้ */}
                Delete</button>,
        },

    ];

    const [currentPage, setCurrentPage] = useState(1)

    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;


    console.log('data',data) 
    console.log('test array data',Array.isArray(data))
    const records = data.slice(firstIndex, lastIndex);
 
    const npage = Math.ceil(data.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)
    
    console.log('currentPage',currentPage)   
    console.log('firstIndex',firstIndex)     
    console.log('lastIndex',lastIndex)        
    console.log('npage',npage)       

    console.log('test array',Array.isArray(records))
    console.log('records',records) 



    return (



        <div className='container mx-auto p-4 bg-white shadow-md'>

            <h1>Category Management</h1>
            <form className='my-4' onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setName(e.target.value)}
                    className='border'
                    type='text'
                />
                {/* <button className='bg-blue-500'>Add Category</button> */}
                 <button type="submit" class="btn btn-success">Add Category</button>
            </form>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((item, index) =>
                            <tr

                                key={index}>
                                {/* ถ้าไม่เพิ่ม key คือ index เเต่ละ tag li มีจะขึ้น error  */}

                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    <button type="button"
                                        class="btn btn-danger"
                                        onClick={() => handleRemove(item.id)}>
                                        Delete</button>
                                </td>


                            </tr>
                        )
                    }

                </tbody>
            </table>
        <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href='#!' className='page-link'
                            onClick={prePage}>Prev</a>
                    </li>
                    {
                        numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href='#!' className='page-link'
                                    onClick={() => changeCPage(n)}>{n}</a>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <a href='#!' className='page-link'
                            onClick={nextPage}>Next</a>
                    </li>

                </ul>
            </nav>
        </div>
    )
     function prePage() {
        if (currentPage != firstIndex) {
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }
    function nextPage() {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }
}

export default FormCategory