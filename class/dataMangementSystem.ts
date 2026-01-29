


export class dataMangementSystem<T extends Record<string,any> >{
    state: T[];  // ← ADD THIS! Declare the property
    setState: React.Dispatch<React.SetStateAction<T[]>>;  // ← ADD THIS too!
    idName:keyof T   
    constructor(state:T[],setState:React.Dispatch<React.SetStateAction<T[]>>,idName:keyof T) {
       this.state=state
       this.setState=setState
       this.idName=idName
  }

  updataData(data:T){
    let updated=false

    const newState=this.state.map((stateData)=>{
        if(stateData[this.idName]===data[this.idName] ){
           updated=true
           return data
        }

        return stateData
    })
    if(updated){
        this.setState(newState)
    }
    return updated

  }
  addData(data:T){

    this.setState(prev=>[...prev,data])

  

  }
  deleteData(data:T){

    const newState=this.state.filter((stateData)=>{
        return stateData[this.idName] !== data[this.idName]
    })

    this.setState(newState)

  }

  Allow(data:T,id:string|false,arr:string[]){
    let allowed=false

    if(!id){
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