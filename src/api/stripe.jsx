import axios from 'axios'


export const payment = async (token) => 
    await axios.post('ecom-api-uat2.vercel.app/api/user/create-payment-intent', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})