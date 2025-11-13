import axios from 'axios'


export const createBranch = async (token, form) => {
    // code body
    return axios.post('https://ecom-api-uat2.vercel.app/api/branch', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listBranch = async () => {
    // code body
    return axios.get('https://ecom-api-uat2.vercel.app/api/branch')
}

export const removeBranch = async (token, id) => {
    // code body
    return axios.delete('https://ecom-api-uat2.vercel.app/api/branch/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}