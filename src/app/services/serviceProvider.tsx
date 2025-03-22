import useApi from "@/hooks/api";
import { useState, useEffect } from "react";

import loadGif from "@/assets/load.gif";
import Image from "next/image";
import { useApp } from "@/hooks/app";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { formatKwanza } from "@/utils/currency";
import toast from "react-hot-toast";

export default function ServicesServiceProvider() {
  const [services, setServices] = useState<Service[]>([]);
  const { get, post, put, del } = useApi();
  const { user } = useApp();
  const [isFetchRegister, setIsFetchRegister] = useState(false);
  const [isFetchDelete, setIsFetchDelete] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const [isFetchServices, setIsFetchServices] = useState(false);
  const [serviceSelected, setServiceSelected] = useState<Service | null>(null);

  async function fetchServices() {
    setIsFetchServices(true);
    const _services = await get("/services");
    if (_services.status == 200) {
      setServices(
        _services.data.filter((service: Service) => {
          if (service.owner.nif == user?.nif) {
            return true;
          }
          return false;
        })
      );
    }
    setIsFetchServices(false);
  }
  useEffect(() => {
    fetchServices();
  }, []);

  async function registerService() {
    setIsFetchRegister(true);
    let _service = null;
    if (serviceSelected) {
      _service = await put(`/services/${serviceSelected.id}`, formData);
    } else {
      _service = await post("/services", formData);
    }
    if (_service.status == 200 || _service.status==201) {
      if (serviceSelected) {
        setServices(
          services.map((service) => {
            if (service.id == serviceSelected.id) {
              return {
                ..._service.data,
              };
            }
            return service
          })
        );
        setServiceSelected(null);
        setFormData({
            name: '', 
            description: '', 
            price:0
        })
        toast.success("Serviço atualizado com sucesso!");
      } else {
        setServices([...services, _service.data]);
        toast.success("Serviço criado com sucesso!");
        setFormData({
            name: '', 
            description: '', 
            price:0
        })
      }
    } else {
      toast.error("Houve um problema, tente novamente");
    }
    setIsFetchRegister(false);
  }

  async function deleteService(service: Service) {
    setIsFetchDelete(true);
    const _response = await del(`/services/${service.id}`);
    if (_response.status == 200) {
      setServices(
        services.filter((_service) => {
          if (_service.id == service.id) return false;
          return true;
        })
      );
      toast.success("Serviço deletado com sucesso!");
    } else {
      toast.error("Houve um problema, tente novamente");
    }
    setIsFetchDelete(false);
  }

  return (
    <div>
      <h1 className="font-bold mb-4 flex gap-2 items-center">
        Lista de serviços
        {isFetchServices && <Image src={loadGif} width={14} alt="" />}
      </h1>

      <div className="mb-6 flex gap-2 flex-col">
        <Input
        value={formData.name.toString()}

          onChange={(value) => {
            setFormData({
              ...formData,
              name: value,
            });
          }}
          name="name"
          placeholder="Nome do serviço"
        />
        <Textarea
        value={formData.description.toString()}

          onChange={(value) => {
            setFormData({
              ...formData,
              description: value,
            });
          }}
          name="description"
          placeholder="Descrição"
        />

        <Input
        value={formData.price.toString()}
          type="number"
          onChange={(value) => {
            setFormData({
              ...formData,
              price: parseFloat(value),
            });
          }}
          name="price"
          placeholder="Preço"
        />
        <Button disabled={isFetchRegister} onClick={registerService}>
          {isFetchRegister && <Image src={loadGif} width={14} alt="" />}
          {serviceSelected ? "Atualizar" : "Adicionar"}
        </Button>
      </div>

      <table >
        <thead>
          <tr className="bg-[#eee] text-black text-sm">
            <th className="p-2">Nome</th>
            <th className="p-2">Preço</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-b text-gray-600">
              <td className="p-2">{service.name}</td>
              <td className="p-2">{formatKwanza(service.price)}</td>
              <td className="p-2 flex gap-2">
                <Button
                  onClick={() => {
                    setFormData({
                        ...service
                    })
                    setServiceSelected(service);
                  }}
                >
                  Editar
                </Button>
                <Button
                  disabled={isFetchDelete}
                  onClick={() => {
                    deleteService(service);
                  }}
                  color="red"
                >
                  {isFetchDelete && <Image src={loadGif} width={14} alt="" />}
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
