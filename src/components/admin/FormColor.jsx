import React, { useState, useEffect } from 'react'
import { createColor, listColor, removeColor } from '../../api/color'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
const initialState = {
    name: "",
    namet: "",
    code: "",
    status: "",
    des: "",
    image: "",
    short_code: "",
    type: ""
};
const FormColor = () => {
    // Javascript
    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    //const [categories, setCategories] = useState([])
    const color = useEcomStore((state) => state.color)
    const getColor = useEcomStore((state) => state.getColor)

    const [form, setForm] = useState({
        name: "",
        namet: "",
        code: "",
        status: "",
        des: "",
        image: "",
        short_code: "",
        type: ""
    });
    useEffect(() => {
        getColor(token)
    }, [])
    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value);
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createColor(token, form);
            console.log(res);
            setForm(initialState);
            getColor();
            toast.success(`เพิ่มข้อมูล ${res.data.name} สำเร็จ`);
        } catch (err) {
            console.log(err);
        }
    };
    const handleRemove = async (id) => {
        console.log(id)
        try {
            const res = await removeColor(token, id)
            console.log(res)
            toast.success(`Deleted ${res.data.name} success`)
            getColor(token)
        } catch (err) {
            console.log(err)
        }
    }
    const data = color
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


    console.log('data', data)
    console.log('test array data', Array.isArray(data))
    const records = data.slice(firstIndex, lastIndex);

    const npage = Math.ceil(data.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    console.log('currentPage', currentPage)
    console.log('firstIndex', firstIndex)
    console.log('lastIndex', lastIndex)
    console.log('npage', npage)

    console.log('test array', Array.isArray(records))
    console.log('records', records)


    return (



        <div className='container mx-auto p-4 bg-white shadow-md'>

            <h1>Color Management</h1>
            <form className='my-4' onSubmit={handleSubmit}>
                <div class="form-group row">
                    <div class="col-sm-3 mb-3 mb-sm-0">
                        <input type="text"
                            class="form-control form-control-user"
                            value={form.name}
                            onChange={handleOnChange}
                            placeholder="name"
                            name="name" />
                    </div>
                    <div class="col-sm-3 mb-3 mb-sm-0">
                        <input type="text"
                            class="form-control form-control-user"
                            value={form.namet}
                            onChange={handleOnChange}
                            placeholder="namet"
                            name="namet" />
                    </div>
                    <div class="col-sm-3 mb-3 mb-sm-0">
                        <input type="number"
                            class="form-control form-control-user"
                            value={form.code}
                            onChange={handleOnChange}
                            placeholder="code"
                            name="code" />
                    </div>
                </div>



                <div class="form-group row">
                    <div class="col-sm-3 mb-3 mb-sm-0">
                        <input type="text"
                            class="form-control form-control-user"
                            value={form.status}
                            onChange={handleOnChange}
                            placeholder="status"
                            name="status" />
                    </div>
                    <div class="col-sm-3 mb-3 mb-sm-0">
                        <input type="text"
                            class="form-control form-control-user"
                            value={form.des}
                            onChange={handleOnChange}
                            placeholder="des"
                            name="des" />
                    </div>
                    <div class="col-sm-3 mb-3 mb-sm-0">
                        <input type="number"
                            class="form-control form-control-user"
                            value={form.image}
                            onChange={handleOnChange}
                            placeholder="image"
                            name="image" />
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-3 mb-3 mb-sm-0">
                        <input type="text"
                            class="form-control form-control-user"
                            value={form.short_code}
                            onChange={handleOnChange}
                            placeholder="short_code"
                            name="short_code" />
                    </div>
                    <div class="col-sm-3 mb-3 mb-sm-0">
                        <input type="text"
                            class="form-control form-control-user"
                            value={form.type}
                            onChange={handleOnChange}
                            placeholder="type"
                            name="type" />
                    </div>

                </div>
                <button type="submit" class="btn btn-success">Add Color</button>


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
                        color.map((item, index) =>
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

export default FormColor