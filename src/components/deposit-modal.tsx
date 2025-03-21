"use client";

import { useState } from "react";
import Button from "./ui/button";
import Input from "./ui/input";

import loadGif from "@/assets/load.gif";
import Image from "next/image";
import useApi from "@/hooks/api";
import toast from "react-hot-toast";
import { useApp } from "@/hooks/app";

interface DepositModalProps {
  onClose: () => void;
}
export default function DepositModal({ onClose }: DepositModalProps) {
  const [isFetch, setIsFetch] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const { patch } = useApi();

  const { user, setUser } = useApp();

  async function deposit() {
    setIsFetch(true);
    const data = await patch("/deposit", {
        amount,
    });

    if (data.status == 200) {
      if (user) {
        setUser({
          ...user,
          balance: user.balance + amount,
        });
      }

      toast.success("Depósito com sucesso");

    } else {
      toast.error("Houve um problema, tente novamente");

    }

    setIsFetch(false);
    onClose();
  }

  return (
    <div onClick={(ev)=>{
        if(!isFetch){
            onClose();
        }
    }} className="h-screen w-screen fixed top-0 left-0 bg-[#0008] items-center justify-center flex">
      <div onClick={(ev)=>{
        ev.stopPropagation();
      }} className="bg-white px-4 py-4 rounded-xl w-[320px]">
        <h1 className="font-bold text-xl mb-4 text-center">
          Depósito de saldo
        </h1>
        <Input
          onChange={(value) => {
            setAmount(parseFloat(value));
          }}
          type="number"
          placeholder="Montante (em Kz)"
        />
        <div className="mx-auto w-fit mt-4">
          {" "}
          <Button onClick={deposit} disabled={isFetch}>
            {isFetch && (
              <Image className="invert" src={loadGif} width={20} alt="" />
            )}
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
