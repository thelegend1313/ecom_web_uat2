import axios from "axios";

// https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/admin/orders

export const getOrdersAdmin = async (token) => {
  // code body
  return axios.get("https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const changeOrderStatus = async (token, orderId, orderStatus) => {
  // code body
  return axios.put(
    "https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/admin/order-status",
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const getListAllUsers = async (token) => {
  // code body
  return axios.get("https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserStatus = async (token,value) => {
  // code body
  return axios.post("https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/change-status",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserRole = async (token,value) => {
  // code body
  return axios.post("https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/change-role",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
