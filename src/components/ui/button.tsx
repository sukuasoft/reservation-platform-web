interface ButtonProps {
    children?: React.ReactNode
}

export default function Button ({children=''}:ButtonProps){
    return (<button className=" bg-[#5500ff] text-white rounded-xl text-center w-full px-4 py-2">{children}</button>)
}