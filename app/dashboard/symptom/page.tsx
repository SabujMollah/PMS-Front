import React from 'react'
import { SymptomService } from '@/lib/service/symptom/symptomservice';
import {symptom } from "@/types/type";
import { DataTable } from '@/app/components/custom/DataTable';
import { Columns } from './Columns';

export default async function Symptom() {
  const searchParam = "name";
  

  const button = {
    btnName: "Create",
    url: "/dashboard/symptom/create",
  };
    const data: symptom[] = await SymptomService.getAllSymptoms();
    return (
      <div className="mx-auto mt-5">
        <DataTable
          columns={Columns}
          data={data}
          button={button}
          searchParam={searchParam}
        />
      </div>
    );

}

