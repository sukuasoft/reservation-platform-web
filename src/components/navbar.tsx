'use client'
import Link from "next/link";
import Image from "next/image";
import icon from "@/assets/icon.png";
import { useApp } from "@/hooks/app";
import Button from "./ui/button";


interface NavbarProps {
showNavbarRight?:boolean
}

export default function Navbar({showNavbarRight=true}) {

    const {user, logout} =useApp();

  return (
    <div
      className=" border-b border-[#eee] px-8 py-4
flex  gap-4 bg-white"
    >
      <div className="font-bold text-xl flex items-center gap-2">
        <Image src={icon} width={20} alt="" />
        <span>ReserveJá</span>
      </div>

     {
      showNavbarRight &&  <div className=" flex gap-2 items-center text-xs ml-auto w-fit">
      {
          user  ? 
          (<>
      <Link  className="max-[600px]:hidden" href={'/home'}>
        <strong>{user.type == 'client'? 'Cliente: ': 'Prestador de serviço: '}</strong>
        {user.name}</Link>
     <div className="active:scale-110">
     <Button color="red"  onClick={logout}>Sair</Button>
     </div>

          </>): (<Link href='/login'><Button>Entrar</Button></Link>)
      }
    </div>
     }
    </div>
  );
}
