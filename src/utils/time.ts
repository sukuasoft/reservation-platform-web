//tempo em segundos

export async function delayTime (time:number){
    return new Promise<void>((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        }, 1000 * time);
    })
}