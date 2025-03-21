import Image from "next/image";
import loadGif from '@/assets/load.gif';

export default function SplashScreen (){
    return ( <div className="bg-[#5500ff] w-full h-screen flex text-white items-center justify-center">

        <div className="flex flex-col gap-4 items-center">
            <p className="font-bold text-3xl">Plataforma de Reservas</p>
            <Image src={loadGif} width={20} className="invert" alt=''/>
        </div>
        
        
    </div>)
}