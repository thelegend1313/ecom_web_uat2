import axios from 'axios'


export const createColor = async (token, form) => {
    // code body
    return axios.post('http://localhost:5001/api/color', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listColor = async () => {
    // code body
    return axios.get('http://localhost:5001/api/color')
}

export const removeColor = async (token, id) => {
    // code body
    return axios.delete('http://localhost:5001/api/color/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}