'use client'

import Navbar from "@/components/navbar";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import SelectOption from "@/components/ui/select/select-option";

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className=" shadow-xl w-[320px] px-4 py-6">
            <h1 className="text-2xl font-bold text-center mb-4">Cria a sua conta</h1>
            <form className="flex flex-col gap-4">
            <Input type="email" placeholder="E-mail" />
            <Select label="Tipo de conta">
                <SelectOption value="client">Cliente</SelectOption>
                <SelectOption value='service_provider'>Prestador de serviço</SelectOption>
            </Select>
            <Input type='password' placeholder="Senha" />
            <Button>Registrar</Button>
            </form>
        </div>
      </div>
    </div>
  );
}
