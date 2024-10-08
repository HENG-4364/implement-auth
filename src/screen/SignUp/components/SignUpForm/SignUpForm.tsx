"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";
import { z } from "zod";
import { registerSchema } from "../zod/zod";
import { ArrowBigLeftDash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { signup } from "@/actions/sign-up";

// Define the form data type
type FormData = z.infer<typeof registerSchema>;

const SignUpForm: React.FC = () => {
  const [pending, startTrasition] = useTransition()
  const router = useRouter()
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };
  const onSubmit: SubmitHandler<FormData> = async (input) => {
    startTrasition(async () => {
      const { data, error } = await signup(input)

      if (error) {
        toast.error(error, {
          position: "top-right",
          style: {
            fontSize: "11pt"
          }
        })
      } else if (data) {
        toast.success('Signin successfully', {
          position: "top-right",
          style: {
            fontSize: "11pt"
          }
        })
        router.push('/sign-in')
      }
    })

  };

  return (
    <section className="relative lg:pt-36 pt-16 bg-slate-50 h-[100vh]">
      <div className="container relative">
        <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
          <div className="lg:col-span-7 md:col-span-6">
            <Image
              src="/Sign up-amico.png"
              width={1000}
              height={1000}
              sizes="100vw"
              style={{ width: "90%", height: "auto" }}
              alt=""
            />
          </div>

          <div className="lg:col-span-5 md:col-span-6">
            <div className="lg:ms-5">
              <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="absolute bg-red-400 py-[1px] px-3 rounded-sm cursor-pointer" onClick={() => router.back()}>
                    <ArrowBigLeftDash color="white" />
                  </div>
                  <div className="col-start-1 col-end-2 flex items-center justify-center cursor-pointer" onClick={() => router.push("/")}>
                    <Image alt="" src={"/logo.jpg"} width={100} height={100} className="h-14 w-14" />
                  </div>
                  <div className="grid grid-cols-1 text-center">
                    <h3 className="font-semibold text-2xl leading-normal mb-4">
                      Sign Up
                    </h3>
                  </div>

                  <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
                    <div className="lg:col-span-6">
                      <label htmlFor="firstName" className="font-semibold">
                        First Name:
                      </label>
                      <input
                        {...register("firstName")}
                        className={` mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border focus:ring-0 ${errors.firstName &&
                          "border-1 border-red-500 "
                          }`}
                        placeholder="First Name :"
                      />
                      {errors.firstName && (
                        <p className="text-red-500">{`${errors.firstName.message}`}</p>
                      )}
                    </div>
                    <div className="lg:col-span-6">
                      <label htmlFor="lastName" className="font-semibold">
                        Last Name:
                      </label>
                      <input
                        {...register("lastName")}
                        className={` mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border focus:ring-0 ${errors.lastName &&
                          "border-1 border-red-500 "
                          }`}
                        placeholder="Last Name :"
                      />
                      {errors.lastName && (
                        <p className="text-red-500">{`${errors.lastName.message}`}</p>
                      )}
                    </div>

                    <div className="lg:col-span-12">
                      <label htmlFor="email" className="font-semibold">
                        Your Email:
                      </label>
                      <input
                        {...register("email")}
                        className={`  mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border focus:ring-0 ${errors.email &&
                          "border-1 border-red-500 "
                          }`}
                        placeholder="Email :"
                      />
                      {errors.email && (
                        <p className="text-red-500">{`${errors.email.message}`}</p>
                      )}
                    </div>

                    <div className="lg:col-span-12">
                      <label htmlFor="password" className="font-semibold">
                        Password:
                      </label>
                      <input
                        type={isChecked ? "" : "password"}
                        {...register("password")}
                        className={`  mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border focus:ring-0 ${errors.password &&
                          "border-1 border-red-500 "
                          }`}
                        placeholder="Password :"
                      />
                      {errors.password && (
                        <p className="text-red-500 ">{`${errors.password.message}`}</p>
                      )}
                    </div>
                    <div className="lg:col-span-12">
                      <label htmlFor="ComfirmPassword" className="font-semibold">
                        Comfirm Password:
                      </label>
                      <input
                        type={isChecked ? "" : "password"}
                        {...register("confirmPassword")}
                        className={`  mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border focus:ring-0 ${errors.confirmPassword &&
                          "border-1 border-red-500 "
                          }`}
                        placeholder=" Comfirm Password :"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 ">{`${errors.confirmPassword.message}`}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full mt-3 " >
                    <Checkbox id="terms" onClick={handleCheckboxClick} />
                    <label htmlFor="terms" className="ml-2 text-base" >
                      Show Password
                    </label>
                  </div>
                  <div className="mt-5">
                    <button
                      type="submit"
                      disabled={pending}
                      className="w-full h-10  px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-red-400 text-white"
                    >
                      {pending ? (
                        <>
                          <ClipLoader color="white" className="mr-1" size={20} />
                          Loading...
                        </>
                      ) : (
                        "Sign Up"
                      )}
                    </button>
                    <div className="mt-5 flex justify-center">
                      <div>
                        Already Sign Up?
                      </div>
                      <div className="cursor-pointer text-blue-400 ml-1" onClick={() => router.push("/sign-in")}>
                        Sign In
                      </div>
                    </div>

                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    </section >
  );
}

export default SignUpForm;
