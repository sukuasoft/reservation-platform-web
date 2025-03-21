"use client";
import Navbar from "@/components/navbar";
import Image from "next/image";
import il1 from "@/assets/il_1.png";
import Button from "@/components/ui/button";
import Link from "next/link";
import AppWrapper from "./app-wrapper";

export default function Home() {
  return (
    <AppWrapper needAuth={false} noRedirect={true}>
      <div className="flex flex-col h-screen w-full homeGradient">
      <Navbar />
      <div className="flex   w-[900px] max-w-full mx-auto  flex-1 text-white items-center px-10 py-4 gap-10 ">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl mb-2">Crie, e reserve serviços</h1>
          <p className="mb-6 text-xl">
            Uma plataforma que com um clique podes aceder serviços como também
            podes se tornar um provedor de serviço e ganhar dinheiro
          </p>
          <div className="w-fit">
            <Link href="/register" className="hover:shadow-xl  cursor-pointer">
              <Button color="white">Comece agora</Button>
            </Link>
          </div>
        </div>

        <div className=" bg-[#5530ff] rounded-full shadow-xl">
          <Image src={il1} width={400} alt="" />
        </div>
      </div>
    </div>
    </AppWrapper>
  );
}
