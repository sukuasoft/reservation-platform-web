import SidebarItem from "./item"
import dashboard from '@/assets/dashboard.png';
import tool from '@/assets/tool.png';
import reservation from '@/assets/reservation.png';


interface SidebarProps {
    page:string
}

export default function Sidebar({page}:SidebarProps){
    return (<aside className="border-[#eee] border-solid border-r pr-2 h-full ">

        <div className="flex flex-col justify-center px-8 py-2  gap-4">
            <SidebarItem current={page =='home'} title="Início" image={dashboard} href='/home'/>
            
            <SidebarItem  current={page =='services'}  title="Serviços" image={tool} href='/servicos'/>
            <SidebarItem   current={page =='reservations'} title="Reservas" image={reservation} href='/reservas'/>
        </div>

    </aside>)
}