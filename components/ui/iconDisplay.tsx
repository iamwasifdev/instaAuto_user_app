import { LucideIcon } from "lucide-react-native";
import { Text, View, type TextInputProps } from "react-native";

interface IconDisplayType {
  label?: string;
  size: "sm" | "md" | "lg";
  value: string;
  DisplayIcon?: LucideIcon; //The D is capital because if we do not write this than the react will  not know that it is a component okdoki.
  displayText?: string;
  className?: string;
}

const sizeStyle = {
  sm: "w-[50%] ",
  md: "w-[85%]",
  lg: "w-[90%]",
};

export default function IconDisplay({
  size,
  label,
  value,
  className,
  displayText,
  DisplayIcon,
  ...props
}: IconDisplayType) {
  if (displayText && DisplayIcon) {
    console.warn(
      "IconInput: Cannot use both displayText and DisplayIcon. Use one field only",
    );
  }

  return (
    <View className={`${sizeStyle[size]}`}>
    { label? <Text className="text-lg text-secondry-600">{label}</Text>:null}

      <View className="relative">
        <View className=" p-1 absolute flex left-0 justify-center  inset-y-0 ">
          {displayText && <Text>{displayText}</Text>}
          {DisplayIcon && <DisplayIcon />}
        </View>
        <Text
          {...props}
        
          className={[
            `border-2  rounded-md  py-4 px-12 text-lg  `,
            "pl-7",
            `${className}`,
          ].join(" ")}
        >  {value}</Text>
      </View>
    </View>
  );
}
