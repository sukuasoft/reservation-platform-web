import useApi from "@/hooks/api";
import { useState, useEffect } from "react";

import loadGif from "@/assets/load.gif";
import Image from "next/image";
import ReservationCard from "@/components/reservation-card";

export default function ReservationsClient() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { get } = useApi();
  
  const [isFetchReservations, setIsFetchReservations] = useState(false);

  async function fetchReservations() {
    setIsFetchReservations(true);
    const _reservations = await get("/reservations");
    if (_reservations.status == 200) {
        setReservations(_reservations.data);
    }
    setIsFetchReservations(false);
  }
  useEffect(() => {
    fetchReservations();
  }, []);

  function cancelReservation (id:string){
    const _reservations = reservations.map((reservation)=>{
        if(reservation.id == id){
            return {
                ...reservation, 
                status: 'canceled'
            };
        }
        return {...reservation};
    });

    setReservations(_reservations);
  }

  return (
    <div>
      <h1 className="font-bold mb-4 flex gap-2 items-center">
        Lista de reservas
        {isFetchReservations && <Image src={loadGif} width={14} alt="" />}
      </h1>
      <div className="flex gap-4 flex-wrap">
        {reservations.map((reservation, index) => {
          return <ReservationCard cancelReservationCallback={cancelReservation}  order={index+1} key={reservation.id} reservation={reservation} />
        })}
      </div>
     
    </div>
  );
}
