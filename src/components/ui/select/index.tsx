interface SelectProps {
    children:React.ReactNode, 
    label:string, 
    onChange:(value:string)=>void;
    name?:string|undefined
}
export default function Select ({children, onChange, name, label}:SelectProps){
    return (
        <div>
            <p className="mb-1  text-xs">{label}</p>
            <select name={name} onChange={(ev)=>{
                onChange(ev.target.value);
            }} className="text-black w-full border-none outline-none text-xs 
        bg-[#eee] rounded-xl px-4 py-2 "  >
                {children}
        </select>
        </div>
    )
}