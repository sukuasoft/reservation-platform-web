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

export default function Home (){

    const {get}= useApi();
    const {user}=useApp();

    const [showModalDeposit, setShowModalDeposit] = useState<boolean>(false);


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
                    &&  <HomeUserClient />}
                   
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