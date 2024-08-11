import axios from 'axios';
const BASE_URL = "http://localhost:5000";

export const fetchItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/item`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchUserDetails = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await axios.get(`${BASE_URL}/api/auth/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};


export const addToCart = async (userId, itemId) => {
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  const response = await axios.post(
    `${BASE_URL}/api/cart/add`,
    { userId, itemId }, // Pass both userId and itemId
    {
      headers: {
        Authorization: `Bearer ${token}` // Include token in request headers
      }
    }
  );
  return response.data;
};


export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const fetchCartItems = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCartItem = async (itemId, token) => {
  try {
    await axios.delete(`${BASE_URL}/api/cart/remove/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};


export const submitFormData = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/item`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const submitPropertyForm = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/property`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProperties = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/properties`);
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

