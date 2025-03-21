interface InputProps {
    type?:string,
    placeholder?:string
}
export default function Input ({type='text', placeholder}:InputProps){
    return (<input className="text-black w-full border-none outline-none text-sm 
        bg-[#eee] rounded-xl px-4 py-2" type={type} placeholder={placeholder}></input>)
}