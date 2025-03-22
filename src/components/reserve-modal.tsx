"use client";

import { useState } from "react";
import Button from "./ui/button";
import Input from "./ui/input";

import loadGif from "@/assets/load.gif";
import Image from "next/image";
import useApi from "@/hooks/api";
import toast from "react-hot-toast";
import { useApp } from "@/hooks/app";
import ServiceCard from "./service-card";
import { formatKwanza } from "@/utils/currency";
import { useRouter } from "next/navigation";

interface ReserveModalProps {
  onClose: () => void;
  service:Service|undefined;
}
export default function ReserveModal({ onClose , service}: ReserveModalProps) {
  const [isFetch, setIsFetch] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const { post } = useApi();
  const {user, setUser}=useApp();
const router =useRouter();

  async function reserve() {
    if(!service) return;
    setIsFetch(true);
    const data = await post("/reservations", {
      quantity,
      serviceId:service.id
    });

    if (data.status == 200 || data.status == 201) {
     
      toast.success("Reserva criada com sucesso!");
      if(user){
        setUser({
          ...user, 
          balance: user.balance - (service.price * quantity)
        })
      }
      
      router.push('/reservations')
      
    

    } else {
      toast.error("Consulte o saldo na conta, tente novamente");

    }

    setIsFetch(false);
    onClose();
  }

  return service && <div onClick={(ev)=>{
        if(!isFetch){
            onClose();
        }
    }} className="h-screen w-screen fixed top-0 left-0 bg-[#0008] items-center justify-center flex">
      <div onClick={(ev)=>{
        ev.stopPropagation();
      }} className="bg-white px-4 py-4 rounded-xl w-[320px]">
        <h1 className="font-bold text-xl mb-4 text-center">
        Criar reserva
        </h1>

  <div className="text-xs mb-4">
    <strong>{service.name}</strong>
    <p>{service.owner.name}</p>
    <p className="text-[#aaa]">{formatKwanza(service.price)}</p>
    </div>
        <Input
        required={true}
          onChange={(value) => {
            setQuantity(parseFloat(value));
          }}
          type="number"
          placeholder="Quantidade"
        />

          <div className="flex gap-2 text-xs mt-4">
            <strong>Total:</strong>
    <p >{formatKwanza(service.price * quantity)}</p>

          </div>

        <div className="mx-auto w-fit mt-4">

          <Button onClick={reserve} disabled={isFetch}>
            {isFetch && (
              <Image className="invert" src={loadGif} width={20} alt="" />
            )}
            Reservar
          </Button>
        </div>
      </div>
    </div>
  ;
}
