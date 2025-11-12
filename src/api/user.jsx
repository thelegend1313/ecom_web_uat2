import axios from "axios";

export const createUserCart = async (token, cart) => {
  // code body
  return axios.post("https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/user/cart", cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listUserCart = async (token) => {
  // code body
  return axios.get("https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveAddress = async (token, address) => {
  // code body
  return axios.post(
    "https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/user/address",
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const saveOrder = async (token, payload) => {
  // code body
  return axios.post("https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/user/order", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const importUser = async (form) => {
    // code body
     console.log("frommmmm",form)
    return axios.post('https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/user/import-excel',form)
}

export const getOrders = async (token) => {
  // code body
  return axios.get("https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/user/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
