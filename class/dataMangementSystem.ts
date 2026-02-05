


export class dataMangementSystem<T extends Record<string,any> >{
   
    setState: React.Dispatch<React.SetStateAction<T[]>>;  // ← ADD THIS too!
    idName:keyof T   
    constructor(setState:React.Dispatch<React.SetStateAction<T[]>>,idName:keyof T) {
       this.setState=setState
       this.idName=idName
  }

 async updataData(data:T){
    let updated=false

  await new Promise((resolve)=>{
     this.setState(currentState=>{
        const newState=  currentState.map((stateData)=>{
          console.log(stateData)
        if(stateData[this.idName]===data[this.idName] ){
           updated=true
          
           return  data
           
        }

        return stateData
    })


    resolve(updated)
    return newState

        })
   })

   return updated
    

  }
  addData(data:T){

    this.setState(prev=>[...prev,data])

  

  }
  deleteData(data:T){

  
    this.setState(currentState=>{

     return currentState.filter((stateData)=>{
        return stateData[this.idName] !== data[this.idName]
    })

    })

  }

  Allow(data:T,id:string,arr:string[]|undefined){
    let allowed=false

    if(!arr){
        allowed=true
        return allowed;
    }

    arr.forEach((ele)=>{
        if(data[id]===ele){
            allowed=true
           return  allowed
        }
    })

    return allowed





  }
 
}