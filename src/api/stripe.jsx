import axios from 'axios'


export const payment = async (token) => 
    await axios.post('https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/user/create-payment-intent', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})