import axios from 'axios'

export const createRole = async (token, form) => {
    // code body
   
    return axios.post('https://ecom-api-uat2.vercel.app/api/role', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const listRole = async () => {
    // code body
    return axios.get('https://ecom-api-uat2.vercel.app/api/role')
}
export const importRole = async (form) => {
    // code body
     console.log("frommmmm",form)
    return axios.post('https://ecom-api-uat2.vercel.app/api/role/import-excel',form)
}

export const removeRole = async (token, id) => {
    // code body
    return axios.delete('https://ecom-api-uat2.vercel.app/api/role/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}