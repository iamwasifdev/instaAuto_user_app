import { useEffect, useRef } from "react";
import { TextInput, View ,type TextInputKeyPressEvent} from "react-native";


interface OtpReceiverType {
  length: number;
  value: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function OtpReceiver({
  length,
  value,
  onChange,
}: OtpReceiverType) {


  const inputsRef = useRef<(TextInput | null)[]>([null]);

  useEffect(()=>{

    onChange(Array.from({length},(_,index)=>""))

  },[])

 function onKeyPress(e:TextInputKeyPressEvent,index:number){

    if(e.nativeEvent.key==="Backspace"){

        if(index===0){return;}

         setTimeout(() => {
        inputsRef.current[index - 1]?.focus()
        console.log("i got here")
      }, 0);
        


    }
}


  function onChangeHandler(text: string, index: number) {
   
    const digitsOnlyRG = /^\d*$/;

    if (!digitsOnlyRG.test(text)) {
      return;
    }
  
    // if(text.length===1){
    //     console.log("i got here")

    //        onChange((prev) => {
    //         let  newState=[...prev]
    //         newState[index+1]=text//changed
    //         return newState

    //      });

    //       inputsRef.current[index + 1]?.focus();
    //        return;

        

    // }




    if (text.length > 1) {

        

        console.log("hit this shit")
        const textArr=text.split("")
        let curIndex=index
        const stateArr=[...value];
        textArr.some(str => {

            

            if(curIndex===length-1){
                stateArr[curIndex]=str

                console.log("am i only called once")

                return true;

                
            }

            else{

                console.log("i am fucking here yoo iam wasif and i am building this shit :"+curIndex + str)


                 stateArr[curIndex]=str

                curIndex++;
            }
        
            
        });

        onChange(stateArr)

         inputsRef.current[curIndex]?.focus();
       
       

        return;



    }

    else{

         onChange((prev) => {
            let  newState=[...prev]
            newState[index]=text//changed
            return newState

         });

    }

    
    

   

    if (index === length - 1) {
      return;
    } else {
      setTimeout(() => {
        if(text.length===0){return;}
        inputsRef.current[index + 1]?.focus();
        console.log("here if")
      }, 0);
    }
  }

  return (
    <View className="flex-row  ">
      {Array.from({ length }, (_, index) => {
        return (
          <TextInput
          onKeyPress={(e)=>{(onKeyPress(e,index))}}
            value={value[index]}
            key={index}
            ref={(ele) => {
           
              inputsRef.current[index] = ele;
            }}
            keyboardType="numeric"
         
            className="
                h-15 w-14 rounded-md justify-center  border-2"
            onChangeText={(e) => {
                console.log(e)
              onChangeHandler(e, index);
            }}
          />
        );
      })}
    </View>
  );
}
