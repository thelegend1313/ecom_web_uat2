//rafce

import axios from 'axios'
 import { toast } from 'react-toastify';
 import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
  
const Register = () => {
// Javascriptz
const getRole = useEcomStore((state) => state.getRole);
const role = useEcomStore((state) => state.role);
const [form,setForm] = useState({
  email:"",
  password:"",
  roleId: "",
  confirmPassword:""
})
  useEffect(() => {
    // code
    getRole();
  
  }, []);
const handleOnChange = (e)=>{
  //code
  console.log(e.target.name,e.target.value)
  setForm({
    ...form,
    [e.target.name]:e.target.value
  })
}

const handleSubmit = async(e)=>{
e.preventDefault()
if (form.password !== form.confirmPassword){
  return alert('Confirm password is not macth')
}
  console.log(form)
  
//send to back
try {
  //ccode
  const res = await axios.post('http://localhost:5001/api/register',form)
  console.log(res.data)
  toast.success(res.data)
} catch (err) {
  const errMsg = err.response?.data?.message
  toast.error(errMsg) 
  console.log(err)
}
}
  return (
    <div>
      Register
      <form onSubmit={handleSubmit}>  
      Email
      <input className='border' 
      onChange={handleOnChange} 
        name='email' 
        type='email'
      />

      Password
      <input className='border'
       onChange={handleOnChange}
        name='password'
        type='text'
      />
        <select
          className="border"
          name="roleId"
          onChange={handleOnChange}
          required
          value={form.roleId}
        >
          <option value="" disabled>
            Please Select
          </option>
          {role.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      Confirm Password
      
      <input className='border'
      onChange={handleOnChange}
        name='confirmPassword'
        type='text'
      />
          birthday
      <input className='border'
      onChange={handleOnChange}
        name='birthday'
        type='integer'
      />
           birthmonth
      <input className='border'
      onChange={handleOnChange}
        name='birthmonth'
        type='integer'
      />
      birthyear
      <input className='border'
      onChange={handleOnChange}
        name='birthyear'
        type='integer'
      />
      age
      <input className='border'
      onChange={handleOnChange}
        name='age'
        type='integer'
      />
      sex
            <input className='border'
      onChange={handleOnChange}
        name='sex'
        type='text'
      />
      address
            <input className='border'
      onChange={handleOnChange}
        name='address'
        type='text'
      />
      country
                  <input className='border'
      onChange={handleOnChange}
        name='country'
        type='text'
      />
      zipcode
                  <input className='border'
      onChange={handleOnChange}
        name='zipcode'
        type='text'
      />
      <button className='bg-blue-500 rounded-md'>
      Register
      </button>
      </form>
    </div>
  )
}

export default Register