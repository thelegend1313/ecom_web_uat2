// rafce
import React, { useState, useEffect } from "react";
import { getListAllUsers } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { changeUserStatus, changeUserRole } from "../../api/admin";
import { importUser } from "../../api/user";
import { toast } from "react-toastify";
const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // code body
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    console.log("before");
    console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("Update Status Success!!");
      })
      .catch((err) => console.log(err));
  };
  const handleImport = async (e) => {
        // code
        e.preventDefault()


        try {
               const files = e.target.myFile.files
                console.log("e.target.files",files)
           
            const res = await importUser(files)

            toast.success(`Import Role success!!!`)

        } catch (err) {
            console.log(err)
        }
    }
  const handleChangeUserRole = (userId, userRole) => {
    // console.log(userId, userStatus);
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("Update Role Success!!");
      })
      .catch((err) => console.log(err));
  };

  console.log(users);
  const data = users
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
      name: 'email',
      selector: row => row.email,
    },
    {
      name: 'roleId',
      selector: row => row.roleId,
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
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form className='my-1' onSubmit={handleImport} enctype="multipart/form-data"  >
        <input type="file" name="myFile"  class="form-control-file border" />
        <button type="submit" class="btn btn-warning" value="Upload">Imported User</button>
      </form>
      <table class="table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>Email</th>
            <th>สิทธิ์</th>
            {/* <th>วันที่แก้ไขล่าสุด</th> */}
            <th>เปลี่ยนสิทธิ์</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((el, i) => (
            <tr key={el.id}>
              <td>{i + 1}</td>
              <td>{el.email}</td>
              <td>{el.roleId}</td>
              {/* <td>{el.updatedAt}</td> */}

              <td>
                <select
                  onChange={(e) => handleChangeUserRole(el.id, e.target.value)}

                  value={el.role}
                >
                  <option>user</option>
                  <option>admin</option>
                </select>
              </td>

              <td>{el.enabled ? "Active" : "Inactive"}</td>
              <td>

                <button type="button" class="btn btn-success"
                  onClick={() => handleChangeUserStatus(el.id, el.enabled)}
                >
                  {el.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
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
  );
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
};

export default TableUsers;
