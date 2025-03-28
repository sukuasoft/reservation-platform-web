'use client'
import SidebarItem from "./item"
import dashboard from '@/assets/dashboard.png';
import tool from '@/assets/tool.png';
import reservation from '@/assets/reservation.png';
import { useApp } from "@/hooks/app";
import { useState } from "react";


interface SidebarProps {
    page:string
}

export default function Sidebar({page}:SidebarProps){

    const {user}=useApp();

    return (
    
    <aside className="border-[#eee] border-solid border-r pr-2   ">

        <div className="flex flex-col justify-center px-4 py-2  gap-4  max-[600px]:flex-row max-[600px]:flex-wrap">
            <SidebarItem current={page =='home'} title="Início" image={dashboard} href='/home'/>
            

            {
( user && user.type == 'service_provider' )&&
            <SidebarItem  current={page =='services'}  title="Serviços" image={tool} href='/services'/>
}
            {
( user && user.type == 'client' )&&
<SidebarItem   current={page =='reservations'} title="Reservas" image={reservation} href='/reservations'/>
            }
            
        </div>

    </aside>
 )
}