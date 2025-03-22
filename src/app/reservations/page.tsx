'use client'
import AppWrapper from "../app-wrapper";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useApp } from "@/hooks/app";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ReservationsClient from "./client";

export default function Reservations() {
const {user}=useApp();

   const router= useRouter();
      useEffect(()=>{
          if(user && user.type == 'service_provider'){
              router.push('/home');
          }
      }, [user]);
  return (
    <AppWrapper>
      <div className="h-screen w-full flex flex-col">
        <Navbar />
        <div className="flex-1 flex max-[600px]:flex-col">
          <Sidebar page="reservations" />
          <div className="px-4 py-6">
        {(user && user.type =='client' ) && <ReservationsClient />}
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}
