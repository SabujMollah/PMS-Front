
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import PatientEntry from "./patientEntry";
import { symptom } from "@/types/type";
import { SymptomService } from "@/lib/service/symptom/symptomservice";


const EditPage = async () => {

  const symptom: symptom[] = await SymptomService.getAllSymptoms();
       return (
         <div>
          
           <PatientEntry
            symptom={symptom}
           
           />
         </div>
       );
   };
   
   export default EditPage;