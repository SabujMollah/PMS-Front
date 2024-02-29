"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
//import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import React, { useEffect, useState } from "react";
import { product } from "@/types/type";
import axios from "axios";
import Link from "next/link";
import { ProductService } from "@/lib/service/product/productservice";
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";

interface FormData {
  name: string;
  productId: number;
  price: string;
  description: string;
}

interface Props {
  title: string;
  product?: product;
}

function SelectForm({
  product,
  title,
}: Props) {
  const router = useRouter();
  const [errors, setError] = useState<any>([]);
  const [disabled, setDisabled] = useState<boolean>(false);


  let defaultValues: FormData = {
    productId: 0,
    name: "",
    price: "",
    description: ""
  };

  if (product) {
    defaultValues = {
      name: product.name,
      price: product.price?.toString() ?? 0,
      description: product.description,
      productId: product.productId ?? 0
    };
  }
  const FormSchema = z
    .object({
      name: z.string({
        required_error: "Name is required.",
      }),
      price: z.string({
        required_error: "price Number is required.",
      }),
      description: z.string({
        required_error: "Status is required.",
      }),

    })
  const FormEditSchema = z.object({
    name: z.string({
      required_error: "Name is required.",
    }),
    price: z.string({
      required_error: "price Number is required.",
    }),
    description: z.string({
      required_error: "Status is required.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: !product ? zodResolver(FormSchema) : zodResolver(FormEditSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    setDisabled(false);
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log("Values", values);
    try {
      if (!product) {
        const productData: product = {
          name: values.name,
          price: parseFloat(values.price),
          description: values.description
        };
        const data = await ProductService.createProduct(productData);

        console.log(data.code);
        if (data.code === 201) {
          //router.push("/dashboard/products");
          toast.success(data.message, {
            position: "bottom-right"
          });
        }
      } else {
        const productData: product = {
          productId: product.productId || undefined, // Ensure productId is provided for update
          name: values.name,
          price: parseFloat(values.price),
          description: values.description
        };
        const data = await ProductService.updateProduct(product.productId || 0, productData);
        if (data.code === 201) {
          router.back();
          toast.success(data.message, {
            position: "bottom-right"
          });
        }
      }
      router.refresh();
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 422) {
          setError(error.response.data.errors);
        }
      }
    }
  };
  

  // const onSubmit = async (values: z.infer<typeof FormSchema>) => {
  //   console.log("Values", values);
  //   if (!product) {
  //     try {
  //       const { data } = await axios.post("https://localhost:5001/api/products", values, {
  //         // headers: {
  //         //   "Content-Type": "multipart/form-data",
  //         // },
  //       });

  //       if (data.statusCode == 201) {
  //         router.push("/dashboard/products")
  //         toast.success(data.message, {
  //           position: "top-right",
  //           autoClose: 1000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       }
  //       router.refresh();
  //     } catch (error: any) {
  //       if (error.response) {
  //         if (error.response.status == 422) {
  //           setError(error.response.data.errors);
  //         }
  //       }
  //     }
  //   }

  //   // single user
  //   if (product) {
  //     try {
  //       const { data } = await axios.put(
  //         `https://localhost:5001/api/products/${product?.productId}`,
  //         { ...values, _method: "PUT" }
  //       );

  //       if (data.statusCode == 201) {

  //         const { product } = data.data;

  //         router.back();
  //         toast.success(data.message, {
  //           position: "top-right",
  //           autoClose: 1000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       }
  //       router.refresh();
  //     } catch (error: any) {
  //       if (error.response) {
  //         if (error.response.status == 422) {
  //           setError(error.response.data.errors);
  //         }
  //       }
  //     }
  //   }
  // };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
  };

  return (
    <Card className="p-4 shadow-xl sm:rounded-lg mt-5">
      <Form {...form}>
        <div className="mb-5 bg-gray-500 py-2 text-white px-2 rounded-md">
          {title}
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 px-2"
          encType="multipart/form-data"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-950">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} id="name" />
                </FormControl>
                <FormMessage />
                <div className="text-red-500">
                  {errors.name && <div>{errors.name[0]}</div>}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-950">Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="price"
                    id="price"
                    autoComplete="off"
                    {...field}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
                <div className="text-red-500">
                  {errors.price && <div>{errors.price[0]}</div>}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-950">description</FormLabel>
                <FormControl>
                  <Input placeholder="description" id="description" {...field} />
                </FormControl>
                <FormMessage />
                <div className="text-red-500">
                  {errors.description && <div>{errors.description[0]}</div>}
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" id="submit">
            Submit
          </Button>

          <Link href="/dashboard/products">
          <Button className="mt-4 ml-5 bg-cyan-500" type="button">
            Go to list
          </Button>
        </Link>


        </form>
      </Form>

    </Card>

  );
}

export default SelectForm;
