import {io, Socket} from "socket.io-client"



class WebSocketService{
    Socket:null|Socket=null
    url:string

    constructor(url:string){
        this.url=url
    }

 async   connect(disconnect?:(()=>void),error?:(error:any)=>void){
     await  new Promise<void>((resolve)=>{
           const newSocket=io(this.url)
           newSocket.emit("join")
           newSocket.on("driver_moved",()=>{
            console.log("driver  moved")
           })
        this.Socket=newSocket

        this.Socket.on("connect",()=>{

            console.log("Connected to the WebSocket Server , Socket:",this.Socket?.id)

        })

        if(!disconnect){
            this.Socket.on("disconnect",()=>{
                console.log("webSocekt disconnect")
            })
        }
        else{
            this.Socket.on("disconnect",disconnect)
        }
         if(!error){
            this.Socket.on("connect_error",()=>{
                console.log("webSocekt disconnect")
            })
        }
        else{
            this.Socket.on("connect_error",error)
        }
        resolve()
       })
     
    }
//ghjkl
    on<K>(event:string,func:(data:K)=>void){

       if(!this.Socket){
        console.log("First you have to use connect")

        return
       }


       this.Socket.on(event,func)
        console.log("set the on event listener , Socket:",this.Socket?.id)

    }
    emit<K>(event:string,data:K){

       if(!this.Socket){
        console.log("First you have to use connect")
        return
       }

       this.Socket.emit(event,data)

    }

      default(){

        
       if(!this.Socket){
        console.log("First you have to use connect")
        return
       }
         this.Socket.on("driver_moved",(data)=>{
        console.log("from default",data)
      })
    }

   async retryEmit<K>(emitObj:{eventName:string,data:K},successIdentify:{key:string,value:any},tries:number,onFailure:()=>void,onSuccess:(data:any)=>void){

        if(!this.Socket){
        console.log("First you have to use connect")
        return
       }

       let success=false

     
       for (let i = 0; i < tries; i++) {

        if(success){
       return;
       }
    
       

       
     


    //   await this.Socket.emit(emitObj.eventName,emitObj.data,(response:any)=>{

    //     if(!response[successIdentify.key] || !response[successIdentify.key]===successIdentify.value){

    //        return;

    //     }else{
    //         onSuccess(response)
    //         success=true
    //     }
    //    })


    await new Promise<void>((resolve) => {
  this.Socket!.emit(emitObj.eventName, emitObj.data, (response: any) => {
    if (response[successIdentify.key] === successIdentify.value) {
      onSuccess(response);
      success = true;
    }
    resolve(); // Always resolve to continue loop
  });
});
        

 if(i>tries-1){
    console.log("fck")
        onFailure()
        return;
       }
       }

     

       
//fasdfdadfdaf
    }
    closeAll(){
        if(!this.Socket?.on){
        console.log("First you have to use connect")
        return
       }
        this.Socket.disconnect()
        this.Socket.removeAllListeners();
    }
}


export default new WebSocketService("http://192.168.29.251:5000")