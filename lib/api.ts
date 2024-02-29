// utils/api.ts

import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
    rejectUnauthorized: false
  });

const API_URL = 'http://localhost:5000/api'; // Replace with your API URL

export const  getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`,{ httpsAgent: agent });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
