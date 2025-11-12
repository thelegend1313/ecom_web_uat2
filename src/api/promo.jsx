import axios from 'axios'


export const createPromo = async (token, form) => {
    // code body
    return axios.post('http://localhost:5001/api/promo', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listPromo = async () => {
    // code body
    return axios.get('http://localhost:5001/api/promo')
}

export const removePromo = async (token, id) => {
    // code body
    return axios.delete('http://localhost:5001/api/promo/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}