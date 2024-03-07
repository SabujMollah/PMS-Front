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
} from "@/components/ui/select"

import { Card,CardHeader,CardTitle,CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { symptom } from "@/types/type";
import axios from "axios";
import Link from "next/link";
import { SymptomService } from "@/lib/service/symptom/symptomservice";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface FormData {
    name: string;
    symptomId: number;
    status: string;
}

interface Props {
    title: string;
    symptom?: symptom;
}

function SelectForm({
    symptom,
    title,
}: Props) {
    const router = useRouter();
    const [errors, setError] = useState<any>([]);
    const [disabled, setDisabled] = useState<boolean>(false);


    let defaultValues: FormData = {
        symptomId: 0,
        name: "",
        status: "1"
    };

    if (symptom) {
        console.log(symptom.status);
        defaultValues = {
            name: symptom.name,
            symptomId: symptom.symptomId ?? 0,
            status: symptom.status,
        };
    }
    const FormSchema = z
        .object({
            name: z.string({
                required_error: "Name is required.",
            }),
            status: z.string({
                required_error: "Status is required.",
            }),

        })
    const FormEditSchema = z.object({
        name: z.string({
            required_error: "Name is required.",
        }),
        status: z.string({
            required_error: "Status is required.",
        }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: !symptom ? zodResolver(FormSchema) : zodResolver(FormEditSchema),
        defaultValues: defaultValues,
    });

    useEffect(() => {
        setDisabled(false);
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        console.log("Values", values);
        try {
            if (!symptom) {
                const symptomData: symptom = {
                    name: values.name,
                    status: values.status
                };
                const data = await SymptomService.createSymptom(symptomData);

                if (data.code === 201) {
                    // router.push("/dashboard/products/create");
                    form.reset();
                    toast.success(data.message, {
                        position: "bottom-right"
                    });
                }
            } else {
                const symptomData: symptom = {
                    symptomId: symptom.symptomId || undefined, // Ensure productId is provided for update
                    name: values.name,
                    status: values.status
                };
                const data = await SymptomService.updateSymptom(symptom.symptomId || 0, symptomData);
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

                    <div className="grid grid-rows-1 grid-cols-4 space-x-2">
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
                            name="status"
                            render={({ field }) => (
                                <FormItem id="select-role-id">
                                    <FormLabel className="text-slate-950">Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={
                                            field.value !== undefined
                                                ? field.value.toString()
                                                : undefined
                                        }
                                        disabled={disabled}
                                    >
                                        <FormControl>
                                            <SelectTrigger id="status">
                                                <SelectValue
                                                    placeholder={"Please select a status to display"}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">Active</SelectItem>
                                            <SelectItem value="0">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    <div className="text-red-500">
                                        {errors.status && <div>{errors.status}</div>}
                                    </div>
                                </FormItem>
                            )}
                        />



                    </div>
                    <Button type="submit" id="submit">
                        Submit
                    </Button>

                    <Link href="/dashboard/symptom">
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
