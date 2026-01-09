import { Text, TextInput, View, type TextInputProps } from 'react-native'
import { TextInputChangeEvent } from 'react-native'



interface InputType extends TextInputProps{
    label:string,
    placeholder:string,
    size:"sm"|"md"|"lg",
    error:string,
    onChange:(e:TextInputChangeEvent)=>void


}


const sizeStyle={
    sm:"w-[50%] ",
    md:"w-[85%]",
    lg:"w-[90%]"

}



export default function PhoneInput({size,error,onChange,label,...props}:InputType){


    return <View className={`${sizeStyle[size]} `}>

        <Text className='text-lg text-secondry-600'>{label}</Text>

        <View className='relative'>

            <View className=' p-1 absolute flex left-0 justify-center  inset-y-0 '>
                <Text className=' text-xl '>+91</Text>
                </View>

             <TextInput {...props}   onChange={(text)=>{onChange(text)}} className={[
        `border-2  rounded-md  py-4 px-12 text-lg ${error ==="" ?"border-secondry-300 ":"border-danger-400 bg-danger-100 "} `,
        " pl-15"
      ].join(" ")} />


        </View>
    
   

    <Text className='text-md w-[95%] text-danger-400'>{error}</Text>

    </View>


}
