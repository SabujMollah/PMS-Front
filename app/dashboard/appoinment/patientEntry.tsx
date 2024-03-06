"use client"
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { patient } from "@/types/type";
import { PatientService } from "@/lib/service/patient/patientservice";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Select, { ActionMeta, MultiValue } from 'react-select';

interface OptionType {
    value: string;
    label: string;
}

interface FormData {
    name: string;
    patientId: number;
    email: string;
}

const patienttype: patient = {
    name: '',
    email: '',
};


export default function PatientEntry() {

    const router = useRouter();
    const [errors, setError] = useState<any>([]);
    const [disabled, setDisabled] = useState<boolean>(false);

    let defaultValues: FormData = {
        patientId: 0,
        name: "",
        email: "",
    };


    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        email: z.string().email()
    })
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Values", values);
        try {
            // if (!patienttype) {
            const patientData: patient = {
                name: values.name,
                email: values.email
            };
            const data = await PatientService.createPatient(patientData);

            if (data.code === 201) {
                //form.reset();
                toast.success(data.message, {
                    position: "bottom-right"
                });
            }
            router.refresh();
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 422) {
                    setError(error.response.data.errors);
                }
            }
        }
    }

    const options: OptionType[] = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
        { value: '4', label: 'Option 4' },
        { value: '5', label: 'Option 5' }
    ];


    const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

    // Handle onChange event
    const handleChange = (newValue: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
      setSelectedOptions(newValue as OptionType[]);
    };



    return (
        <div className='mt-3'>
            <div className="mt-1">
                <Card>
                    <CardContent className="mt-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                <div className="grid grid-rows-1 md:grid-cols-4 gap-4 sm:grid-cols-3">
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Name" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Email" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>


                                    <div>
                                        <Button type="submit" className="mt-8 ml-5">Submit</Button>
                                    </div>

                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>


            <div className="mt-2">
                <Card>
                    <CardContent className="mt-2">
                        <Tabs defaultValue="account" className="w-[400px]">
                            <TabsList>
                                <TabsTrigger value="account">Account</TabsTrigger>
                                <TabsTrigger value="password">Password</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">

                                <Select
                                    options={options}
                                    isMulti
                                    value={selectedOptions}
                                    onChange={handleChange}
                                />




                            </TabsContent>
                            <TabsContent value="password">Change your password here.</TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>


        </div>
    )
}





