import { symptom } from "@/types/type";
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
    rejectUnauthorized: false
  });

export class SymptomService {

  static getAllSymptoms = async (): Promise<symptom[]> => {
    try {
      const response = await axios.get("https://localhost:5001/api/symptom", { httpsAgent: agent });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  static getSymptomById = async (id: number): Promise<symptom> => {
    try {
      const response = await axios.get(`https://localhost:5001/api/symptom/${id}`,{ httpsAgent: agent});
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  };

  
  static createSymptom = async (symptomData: symptom): Promise<any> => {
    try {
      const response = await axios.post("https://localhost:5001/api/symptom", symptomData, { httpsAgent: agent });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  static updateSymptom = async (symptomId: number, symptomData: symptom): Promise<any> => {
    try {
      const response = await axios.put(`https://localhost:5001/api/symptom/${symptomId}`, symptomData, { httpsAgent: agent });
      return response.data;
    } catch (error) {
      console.error(`Error updating product with ID ${symptomId}:`, error);
      throw error;
    }
  };
}
