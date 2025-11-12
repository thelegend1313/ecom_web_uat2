import axios from 'axios'


export const currentUser = async (token) => await axios.post('ecom-api-uat2.vercel.app/api/current-user', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const currentAdmin = async (token) => {
    return await axios.post('ecom-api-uat2.vercel.app/api/current-admin', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}