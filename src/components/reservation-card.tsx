import { formatKwanza } from "@/utils/currency";
import Button from "./ui/button";
import toast from "react-hot-toast";
import { useState
 } from "react";
import useApi from "@/hooks/api";
import { useApp } from "@/hooks/app";

interface ReservationCardProps {
  reservation: Reservation;
  order?: number | undefined;
  cancelReservationCallback: (id:string)=>void;
}

export default function ReservationCard({
  reservation,
  order,
  cancelReservationCallback
}: ReservationCardProps) {

    const [isFetch, setIsFetch] = useState(false);
    const { patch } = useApi();
  
  
    async function cancelReservation() {
      setIsFetch(true);
      const data = await patch(`/reservations/${reservation.id}/cancel`, {
          
      });
  
      if (data.status == 200) {
      
  
        toast.success("Serviço cancelado com sucesso");
        cancelReservationCallback(reservation.id);
  
      } else {
        toast.error("Houve um problema, tente novamente");
  
      }
  
      setIsFetch(false);

    }
    

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-md border border-gray-200">
      <div className="flex gap-4 items-baseline">
        <h3 className="text-lg font-semibold text-gray-800">
          Reserva #{order}
        </h3>

        <p
          className={`text-sm font-medium mt-2 p-1 rounded text-white w-fit ml-auto ${
            reservation.status === "active" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {reservation.status === "active" ? "Ativo" : "Cancelado"}
        </p>
      </div>
      <p className="text-sm text-gray-500">
        Criado em: {new Date(reservation.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-4 text-xs">
        <p className="text-gray-700">
          <strong>Serviço:</strong> {reservation.service.name}
        </p>
        <p className="text-gray-700">
          <strong>Preço:</strong> {formatKwanza(reservation.service.price)}
        </p>
        <p className="text-gray-700">
          <strong>Quantidade:</strong> {reservation.quantity}
        </p>
      </div>
    {  reservation.status  == 'active' && 
     <button onClick={cancelReservation}
     className={`text-sm font-medium mt-2 p-1 rounded text-white w-fit  bg-red-500`}
   >
     Cancelar
   </button>}
    </div>
  );
}
