import Image, { StaticImageData } from "next/image"
import Link from "next/link"

interface SidebarItemProps {
    image:StaticImageData|string, 
    href:string, 
    title:string, 
    current?:boolean
}

export default function SidebarItem ({image, href, title, current=false}:SidebarItemProps){
    return (
     <div className={
    (current ? `  bg-[#5500ff] text-white  `: `` )+ ` px-4 py-1 rounded-xl flex gap-4 text-black items-center `}>
        <Image className={current ? ` invert `: ``} src={image} width={20} alt=''/>
        <Link href={href}>{title}</Link>
     </div>
    )
}