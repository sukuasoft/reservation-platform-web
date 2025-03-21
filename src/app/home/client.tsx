import ServiceCard from "@/components/service-card";
import useApi from "@/hooks/api";
import { useState, useEffect } from "react";

import loadGif from "@/assets/load.gif";
import Image from "next/image";
import ReserveModal from "@/components/reserve-modal";

export default function HomeUserClient() {
  const [services, setServices] = useState<Service[]>([]);
  const { get } = useApi();
  const [showModalReserve, setShowModalReserve]=useState(false);
  
  const [isFetchServices, setIsFetchServices] = useState(false);
  const [serviceSelected, setServiceSelected]=useState<Service |undefined>();

  async function fetchServices() {
    setIsFetchServices(true);
    const _services = await get("/services");
    if (_services.status == 200) {
      setServices(_services.data);
    }
    setIsFetchServices(false);
  }
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <h1 className="font-bold mb-4 flex gap-2 items-center">
        Serviços disponíveis
        {isFetchServices && <Image src={loadGif} width={14} alt="" />}
      </h1>
      <div className="flex gap-4 flex-wrap">
        {services.map((service) => {
          return <ServiceCard  onClick={()=>{
            setServiceSelected(service);
            setShowModalReserve(true);

          }} key={service.id} service={service} />
        })}
      </div>
      {
        showModalReserve && <ReserveModal service={serviceSelected} onClose={()=>{
            setShowModalReserve(false);
          } }/>
      }
    </div>
  );
}
