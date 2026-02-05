
import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native'



interface CustomButtonProps extends PressableProps{
    text:string,
    type:"primary"|"secondry"|"danger"|"success",
    disabled:boolean,
    loading:boolean,
    size:"sm"|"md"|"lg",
    onClick:()=>void
}

const  colorStyles:Record<string,string>={
    primary:"bg-primary",
    secondry:"bg-secondry-100",
    danger:"bg-red",
    success:"bg-success"
}

const textStyles:Record<string,string>={
    primary:"text-white",
    secondry:"text-white",
    danger:"text-primary",
    success:"text-black",
}

const sizeStyles:Record<string,string>={
    sm:"h-14 px-5 ",
    md:"h-14 px-14",
    lg:"h-14 px-20"
}

export default function Button({

    text,
    type,
    disabled=false,
    loading=false,
    size,
    onClick,
    ...props


}:CustomButtonProps){

    return  <Pressable {...props}  accessibilityLabel={"Fuck you"} onPress={onClick} disabled={disabled} className={[
    "    py-4 rounded-md  max-w-50 items-center justify-center  ",
    `${disabled &&"opacity-50"}`,
    sizeStyles[size],
    colorStyles[type],
    "active:opacity-70"


  ].join(" ")} > 

    {
        loading
        ?
    <ActivityIndicator/>
        :
        
    <Text className={`text-center ${textStyles[type]}`}>{text}</Text>
    }

     

        
    </Pressable>

}
    