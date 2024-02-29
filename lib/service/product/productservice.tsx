import { product } from "@/types/type";
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
    rejectUnauthorized: false
  });

export class ProductService {

  static getAllProducts = async (): Promise<product[]> => {
    try {
      const response = await axios.get("https://localhost:5001/api/products", { httpsAgent: agent });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  static getProductById = async (id: number): Promise<product> => {
    try {
      const response = await axios.get(`https://localhost:5001/api/products/${id}`,{ httpsAgent: agent});
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  };

  
  static createProduct = async (productData: product): Promise<any> => {
    try {
      const response = await axios.post("https://localhost:5001/api/products", productData, { httpsAgent: agent });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  static updateProduct = async (productId: number, productData: product): Promise<any> => {
    try {
      const response = await axios.put(`https://localhost:5001/api/products/${productId}`, productData, { httpsAgent: agent });
      return response.data;
    } catch (error) {
      console.error(`Error updating product with ID ${productId}:`, error);
      throw error;
    }
  };
}
