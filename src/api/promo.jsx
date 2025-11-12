import axios from 'axios'


export const createPromo = async (token, form) => {
    // code body
    return axios.post('https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/promo', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listPromo = async () => {
    // code body
    return axios.get('https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/promo')
}

export const removePromo = async (token, id) => {
    // code body
    return axios.delete('https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/promo/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}