interface InputProps {
    type?:string,
    placeholder?:string, 
    required?:boolean, 
    onChange?: (value:string)=>void, 
    minLength?:number | undefined,
    maxLength?:number | undefined, 
    name?:string|undefined, 
    value?:string|undefined
}
export default function Input ({type='text', onChange,name, value, placeholder, minLength, maxLength, required=false}:InputProps){
    return (<input value={value} name={name} onChange={(ev)=>{
        if(onChange){
            onChange(ev.target.value);
        }
    }} 
    minLength={minLength}
    maxLength={maxLength}
    className="text-black w-full border-none outline-none text-xs
        bg-[#eee] rounded-xl px-4 py-2" type={type} placeholder={placeholder} required={required}></input>)
}