export function formatKwanza(value:number){
    return value.toLocaleString('pt-AO', {
        currency: 'AOA', 
        style: 'currency'
    })
}