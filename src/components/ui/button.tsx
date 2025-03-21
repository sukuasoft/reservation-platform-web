interface ButtonProps {
    children?: React.ReactNode, 
    onClick?: ()=>void;
    disabled?:boolean, 
    color?: 'primary' | 'white' | 'red'
}

export default function Button ({children='',color='primary',  disabled=false, onClick}:ButtonProps){
    return (<button disabled={disabled} onClick={()=>{
        if(onClick){
            onClick();
        }
    }} className={ 
        (disabled ? `bg-[#aaa] text-white `: 
            (color == 'primary' ?
            ` bg-[#5500ff] text-white `:  
        (color == 'white' ? '  bg-[#ffffff] text-black ': '  bg-[#ff0000] text-white ')))
        + `  rounded-xl text-center  px-4 py-2 flex items-center  justify-center gap-2`}>
           
            {children}</button>)
}