interface ButtonProps {
    children?: React.ReactNode, 
    onClick?: ()=>void;
    disabled?:boolean, 
    icon?:React.ReactNode | undefined,
}

export default function Button ({children='', icon, disabled=false, onClick}:ButtonProps){
    return (<button disabled={disabled} onClick={()=>{
        if(onClick){
            onClick();
        }
    }} className={ 
        (disabled ? `bg-[#aaa]`: ` bg-[#5500ff] `)
        + ` text-white rounded-xl text-center w-full px-4 py-2 flex items-center  justify-center gap-2`}>
            {icon&&icon}
            {children}</button>)
}