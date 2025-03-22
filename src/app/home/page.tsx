'use client'

import Navbar from "@/components/navbar";
import AppWrapper from "../app-wrapper"
import Sidebar from "@/components/sidebar";
import {  useEffect, useState } from "react";
import useApi from "@/hooks/api";
import { useApp } from "@/hooks/app";
import Button from "@/components/ui/button";
import Link from "next/link";
import DepositModal from "@/components/deposit-modal";
import HomeUserClient from "./client";
import { useRouter } from "next/navigation";

export default function Home (){

    const {get}= useApi();
    const {user}=useApp();

    const [showModalDeposit, setShowModalDeposit] = useState<boolean>(false);
    const router = useRouter();


    return (<AppWrapper>  
            <div className="h-screen w-full flex flex-col">

            <Navbar />
            <div className="flex-1 flex ">
                 <Sidebar page='home'/>
                <div className="px-4 py-6">
                    <div className="flex flex-col gap-2 mb-4">
                        <div>
                            <p className="font-bold text-lg">Saldo</p>
                            <p className="text-sm">{(user?.balance ?? 0).toLocaleString('pt-AO', {
                                style: 'currency',
                                        currency: 'AOA'
                            })}</p>
                        </div>

                        {
                            user && user.type == 'client' && (   <button onClick={()=>{
                                setShowModalDeposit(true);
                            }} className='text-[#5500ff] text-xs w-fit'>+ Adicionar fundo</button>)
                        }
                     
                    </div>
                    {user && user.type =='client'
                    ? <HomeUserClient />: (
                        <div className="mt-6">
        <div className="p-4 bg-[#e6daff] border border-[#a175ff] rounded-lg cursor-pointer
         hover:bg-[#dac8ff] transition" onClick={() => router.push('/services')}>
          <h3 className="text-lg font-semibold text-[#5500ff]">Explorar Serviços</h3>
          <p className="text-sm  text-[#5500ff]">Clique aqui para visualizar e gerenciar todos os serviços disponíveis.</p>
        </div>
      </div>
                    )}
                   
                </div>
            </div>

          {

            showModalDeposit &&
            <DepositModal onClose={()=>{

                setShowModalDeposit(false);
                
                            }} /> 
          }

            </div>
        </AppWrapper>);
}