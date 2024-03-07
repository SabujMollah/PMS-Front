import { SymptomService } from '@/lib/service/symptom/symptomservice'
import React from 'react'
import { symptom } from '@/types/type';
import SelectForm from '../selectForm';

type Props = {
    params: {
        symptomId: number;
    };
};

const page = async ({ params: { symptomId } }: Props) => {

    const symptom: symptom = await SymptomService.getSymptomById(symptomId);
    console.log(symptom)

    return (
        <>
            <SelectForm
                title='Edit Symptom'
                symptom={symptom}

            />
        </>
    )
}

export default page