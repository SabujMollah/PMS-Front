import { patient, product } from "@/types/type";
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
    rejectUnauthorized: false
  });

export class PatientService {

  static getAllPatient = async (): Promise<patient[]> => {
    try {
      const response = await axios.get("https://localhost:5001/api/Patients", { httpsAgent: agent });
      return response.data;
    } catch (error) {
      console.error("Error fetching patient:", error);
      throw error;
    }
  };

  static getPatientById = async (id: number): Promise<patient> => {
    try {
      const response = await axios.get(`https://localhost:5001/api/Patients/${id}`,{ httpsAgent: agent});
      return response.data;
    } catch (error) {
      console.error(`Error fetching patient with ID ${id}:`, error);
      throw error;
    }
  };

  
  static createPatient = async (patientData: patient): Promise<any> => {
    try {
      const response = await axios.post("https://localhost:5001/api/Patients", patientData, { httpsAgent: agent });
      return response.data;
    } catch (error) {
      console.error("Error creating patient:", error);
      throw error;
    }
  };

  static updatePatient = async (patientId: number, patientData: patient): Promise<any> => {
    try {
      const response = await axios.put(`https://localhost:5001/api/Patients/${patientId}`, patientData, { httpsAgent: agent });
      return response.data;
    } catch (error) {
      console.error(`Error updating patient with ID ${patientId}:`, error);
      throw error;
    }
  };
}
