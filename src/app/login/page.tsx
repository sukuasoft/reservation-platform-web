"use client";

import Navbar from "@/components/navbar";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import SelectOption from "@/components/ui/select/select-option";
import useApi from "@/hooks/api";
import { useEffect, useRef, useState } from "react";
import AppWrapper from "../app-wrapper";
import Link from "next/link";
import loadGif from '@/assets/load.gif';
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useApp } from "@/hooks/app";

interface FormDataLogin {
  email: string;
  password: string;
}

export default function Register() {
  const { post } = useApi();
  const {saveToken} =useApp();

  const router = useRouter();

  const formRef = useRef<HTMLFormElement | null>(null);


  const [formData, setFormData] = useState<FormDataLogin>({
    email: "",    
    password: "",
  });

  const [isFetch, setIsFetch] =useState(false);

  async function register (){

    if (isFetch)return;
    
    if(!formRef.current) return;

    if(!formRef.current.reportValidity()) return;

    setIsFetch(true);


    const data = await post('/auth/login', formData);

    if(data.status == 200 || data.status == 201){
        saveToken(data.data.token);
        toast.success('Login com sucesso!');
        
        router.push('/home')
    }
    else{
        toast.error('Houve um erro, credencias inválidas');
    }

    setIsFetch(false);    

  }

  return (
    <AppWrapper needAuth={false}>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className=" shadow-xl w-[320px] px-4 py-6">
            <h1 className="text-2xl font-bold text-center mb-4">
              Bem vindo de volta, entre em sua conta
            </h1>
            <form ref={formRef} className="flex flex-col gap-4">

          
              <Input
              name="email"
              type="email" 
                onChange={(value) => {
                    setFormData({
                      ...formData,
                      email: value,
                    });
                  }} placeholder="E-mail"  required={true}/>
              
              <Input  name="password"  onChange={(value) => {
                  setFormData({
                    ...formData,
                    password: value,
                  });
                }} type="password" minLength={6} placeholder="Senha" required={true} />
            
             <Button onClick={register} disabled={isFetch} icon={
                isFetch &&   <Image src={loadGif} className="invert" width={14} alt=''/>
             }>Registrar</Button>
            </form>

            <p className="text-sm text-center mt-6">
           Ainda não possui uma conta?{" "}
              <Link className="text-[#5500ff]  underline" href="/register">
              Crie agora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}
