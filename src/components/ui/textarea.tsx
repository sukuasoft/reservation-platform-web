interface TextareaProps {
    placeholder?:string, 
    required?:boolean, 
    onChange?: (value:string)=>void, 
    minLength?:number | undefined,
    maxLength?:number | undefined, 
    name?:string|undefined,
    value?:string|undefined
}
export default function Textarea ({ onChange,name, value,  placeholder, minLength, maxLength, required=false}:TextareaProps){
    return (<textarea value={value} name={name} onChange={(ev)=>{
        if(onChange){
            onChange(ev.target.value);
        }
    }} 
    minLength={minLength}
    maxLength={maxLength}
    className="text-black w-full border-none outline-none text-xs
        bg-[#eee] rounded-xl px-4 py-2" placeholder={placeholder} required={required}></textarea>)
}