import React, { useState, useEffect } from 'react'
import { createBranch, listBranch, removeBranch } from '../../api/branch'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
const initialState = {
    name: "",
    namet: "",
    code: "",
    br_address: "",
    status: ""
};
const FormBranch = () => {
    // Javascript
    const token = useEcomStore((state) => state.token)
    //const [categories, setCategories] = useState([])
    const branch = useEcomStore((state) => state.branch)
    const getBranch = useEcomStore((state) => state.getBranch)

    const [form, setForm] = useState({
        name: "",
        namet: "",
        code: "",
        br_address: "",
        status: ""
    });

    useEffect(() => {
        getBranch(token)
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
            const res = await createBranch(token, form);
            console.log(res);
            setForm(initialState);
            getBranch();
            toast.success(`เพิ่มข้อมูล ${res.data.name} สำเร็จ`);
        } catch (err) {
            console.log(err);
        }
    };
    const handleRemove = async (id) => {
        console.log(id)
        try {
            const res = await removeBranch(token, id)
            console.log(res)
            toast.success(`Deleted ${res.data.name} success`)
            getBranch(token)
        } catch (err) {
            console.log(err)
        }
    }
    const data = branch
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

            <h1>Branch Management</h1>
            <form onSubmit={handleSubmit}>
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
                            value={form.br_address}
                            onChange={handleOnChange}
                            placeholder="br_address"
                            name="br_address" />
                    </div>
                    <div class="col-sm-3 mb-3 mb-sm-0">
                        <input type="text"
                            class="form-control form-control-user"
                            value={form.Status}
                            onChange={handleOnChange}
                            placeholder="Status"
                            name="Status" />
                    </div>

                </div>
                <button type="submit" class="btn btn-success">Add Branch</button>



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
                        branch.map((item, index) =>
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

export default FormBranch