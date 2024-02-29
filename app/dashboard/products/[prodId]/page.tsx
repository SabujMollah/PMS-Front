import { ProductService } from '@/lib/service/product/productservice';
import { product } from '@/types/type';
import { assert } from 'console';
import React from 'react';
import SelectForm from '../productForm';

type Props = {
    params: {
      prodId: number;
    };
  };

const EditPage = async ({ params: { prodId } }: Props ) => {

 const product:product = await ProductService.getProductById(prodId);
    return (
      <div>
        <SelectForm  
          title="Edit Product"
          product={product}
        />
      </div>
    );
};

export default EditPage;
