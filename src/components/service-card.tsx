import Button from "./ui/button"
interface ServiceCardProps {
    service:Service, 
    onClick:()=>void;
}


export default function ServiceCard ({service, onClick}:ServiceCardProps){
    return (
        <div  className="text-xs shadow-xs w-[200px] px-4 py-2 rounded-xl">
             <p className="font-bold mb-1">{service.name}</p>
             <div className="justify-between flex mb-4">
                {service.owner.name}
               <span className="text-[#aaa]"> {service.price.toLocaleString('pt-AO', {
                style:'currency',
                currency: 'AOA'
               })}</span>
             </div>

           <div className="w-fit ml-auto">
           <Button onClick={onClick} color="white">Reservar</Button>
           </div>

        </div>
    )
}