import axios from 'axios'

export const createRole = async (token, form) => {
    // code body
   
    return axios.post('http://localhost:5001/api/role', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const listRole = async () => {
    // code body
    return axios.get('http://localhost:5001/api/role')
}
export const importRole = async (form) => {
    // code body
     console.log("frommmmm",form)
    return axios.post('http://localhost:5001/api/role/import-excel',form)
}

export const removeRole = async (token, id) => {
    // code body
    return axios.delete('http://localhost:5001/api/role/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}