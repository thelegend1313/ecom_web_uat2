import axios from 'axios'


export const createBranch = async (token, form) => {
    // code body
    return axios.post('ecom-api-uat2.vercel.app/api/branch', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listBranch = async () => {
    // code body
    return axios.get('ecom-api-uat2.vercel.app/api/branch')
}

export const removeBranch = async (token, id) => {
    // code body
    return axios.delete('ecom-api-uat2.vercel.app/api/branch/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}