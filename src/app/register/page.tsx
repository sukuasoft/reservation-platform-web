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

interface FormDataRegister {
  name: string;
  email: string;
  type: string;
  nif: string;
  password: string;
}

export default function Register() {
  const { post } = useApi();
  const {saveToken} =useApp();

  const router = useRouter();

  const formRef = useRef<HTMLFormElement | null>(null);


  const [formData, setFormData] = useState<FormDataRegister>({
    name: "",
    email: "",
    type: "client",
    nif: "",
    password: "",
  });

  const [isFetch, setIsFetch] =useState(false);

  async function register (){

    if (isFetch)return;
    
    if(!formRef.current) return;

    if(!formRef.current.reportValidity()) return;

    setIsFetch(true);
    
    const requestData:any = {...formData};

    if (formData.type == 'client'){
       delete requestData.nif;
    }

    const data = await post('/auth/register', requestData);

    if(data.status == 200 || data.status == 201){
        saveToken(data.data.token);

        
        toast.success('Conta criada com sucesso!');
        router.push('/home')
    }
    else{
        toast.error('Houve um erro, este pode já ter sido cadastrado');
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
              Cria a sua conta
            </h1>
            <form ref={formRef} className="flex flex-col gap-4">

            <Input
            name="name"
                onChange={(value) => {
                    setFormData({
                      ...formData,
                      name: value,
                    });
                  }} placeholder="Nome"  required={true}/>
              <Input
              name="email"
              type="email" 
                onChange={(value) => {
                    setFormData({
                      ...formData,
                      email: value,
                    });
                  }} placeholder="E-mail"  required={true}/>
              <Select
              name="type"
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    type: value,
                  });
                }}
                label="Tipo de conta"
              >
                <SelectOption value="client">Cliente</SelectOption>
                <SelectOption value="service_provider">
                  Prestador de serviço
                </SelectOption>
              </Select>

              {formData.type == "service_provider" && (
                <Input name="nif" placeholder="NIF"   onChange={(value) => {
                    setFormData({
                      ...formData,
                      nif: value,
                    });
                  }}  required={true}/>
              )}
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
              Já tem conta?{" "}
              <Link className="text-[#5500ff]  underline" href="/login">
                Entre agora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}
