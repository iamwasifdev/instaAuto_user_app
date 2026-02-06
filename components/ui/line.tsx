import { View } from "react-native";

type LineType = {
  length: number;
  thickness?: number;
  className?: string;
};

export default function Line({ length, thickness = 3, className }: LineType) {
  console.log(length, thickness);

  return (
    <View
      style={{
        borderLeftWidth: thickness,
        height:length,

      
      }}
      className={` ${className ? className : ""}`}
    ></View>
  );
}
