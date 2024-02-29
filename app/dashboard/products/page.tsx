import React from 'react'
import { ProductService } from "@/lib/service/product/productservice";
import { product } from "@/types/type";
import { DataTable } from '@/app/components/custom/DataTable';
import { Columns } from './Columns';

export default async function Employee() {
  const searchParam = "name";
  

  const button = {
    btnName: "Create",
    url: "/dashboard/products/create",
  };

    const data: product[] = await ProductService.getAllProducts();
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

