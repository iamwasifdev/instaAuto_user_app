import { Text, TextInput, View, type TextInputProps } from 'react-native'
import { TextInputChangeEvent } from 'react-native'



interface InputType extends TextInputProps{
    label:string,
    placeholder:string,
    size:"sm"|"md"|"lg",
    error:string,
    onChangeCus:(e:string)=>void


}


const sizeStyle={
    sm:"w-[50%] ",
    md:"w-[85%]",
    lg:"w-[90%]"

}



export default function Input({size,error,onChangeCus,label,...props}:InputType){


    return <View className={`${sizeStyle[size]} `}>

        <Text className='text-lg text-secondry-600'>{label}</Text>
    
    <TextInput {...props}   onChangeText={(text)=>{onChangeCus(text)}} className={[
        `border-2  rounded-md  py-4 px-12 text-lg ${error ==="" ?"border-secondry-300 ":"border-danger-400 bg-danger-100 "} `
      ].join(" ")} />

    <Text className='text-md w-[95%] text-danger-400'>{error}</Text>

    </View>


}
