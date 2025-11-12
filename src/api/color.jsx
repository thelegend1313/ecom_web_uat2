import axios from 'axios'


export const createColor = async (token, form) => {
    // code body
    return axios.post('https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/color', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listColor = async () => {
    // code body
    return axios.get('https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/color')
}

export const removeColor = async (token, id) => {
    // code body
    return axios.delete('https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/color/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}