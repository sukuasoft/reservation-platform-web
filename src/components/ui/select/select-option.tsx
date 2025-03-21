interface SelectOptionProps {
    children: React.ReactNode, 
    value?:string | undefined
}

export default function SelectOption ({children, value}:SelectOptionProps){
    return (
        <option value={value}>
            {children}
        </option>
    )
}