interface InputProps {
    type?:string,
    placeholder?:string, 
    required?:boolean, 
    onChange?: (value:string)=>void, 
    minLength?:number | undefined,
    maxLength?:number | undefined, 
    name?:string|undefined
}
export default function Input ({type='text', onChange,name,  placeholder, minLength, maxLength, required=false}:InputProps){
    return (<input name={name} onChange={(ev)=>{
        if(onChange){
            onChange(ev.target.value);
        }
    }} 
    minLength={minLength}
    maxLength={maxLength}
    className="text-black w-full border-none outline-none text-xs
        bg-[#eee] rounded-xl px-4 py-2" type={type} placeholder={placeholder} required={required}></input>)
}