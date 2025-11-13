import axios from 'axios'


export const createPromo = async (token, form) => {
    // code body
    return axios.post('ecom-api-uat2.vercel.app/api/promo', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listPromo = async () => {
    // code body
    return axios.get('ecom-api-uat2.vercel.app/api/promo')
}

export const removePromo = async (token, id) => {
    // code body
    return axios.delete('ecom-api-uat2.vercel.app/api/promo/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}