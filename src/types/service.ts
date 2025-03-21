interface Service {
    id:string, 
    name:string, 
    description:string, 
    price:number, 
    owner: {
        name:string, 
        nif:string
    }
}