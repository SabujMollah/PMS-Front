import React, { useState, useEffect } from 'react';

// Define a type or interface for your product object
interface Product {
  productId: number;
  name: string;
  description: string;
  price:number;
  // Add more properties if needed
}

const ProductTable = () => {
  // Set initial state with an empty array of type Product
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:5001/api/Products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Product Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Decription</th>
            <th>Price</th>
            {/* Add more columns if needed */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              {/* Render more columns if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
