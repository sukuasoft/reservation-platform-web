interface SelectProps {
    children:React.ReactNode, 
    label:string
}
export default function Select ({children, label}:SelectProps){
    return (
        <div>
            <p className="mb-1  text-xs">{label}</p>
            <select className="text-black w-full border-none outline-none text-sm 
        bg-[#eee] rounded-xl px-4 py-2 "  >
                {children}
        </select>
        </div>
    )
}