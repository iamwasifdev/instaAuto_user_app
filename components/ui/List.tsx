// import { ListData } from "@/ts";
// import { LucideIcon } from "lucide-react-native";
// import { FlatList, Pressable } from "react-native";
// import IconDisplay from "./iconDisplay";

// type ListType = {
//   data: ListData[];
//   Icon: LucideIcon;
//   onClick: (data: ListData) => void;
//   tabSize?: "sm" | "md" | "lg" | "xl";
// };

// export default function List({
//   data,
//   Icon,
//   onClick,
//   tabSize = "xl",
// }: ListType) {
//   return (
//     <FlatList
//       data={data}
//       renderItem={({ item }) => (
//         <Pressable
        
//           // ✅ block body with explicit return
// style={({ pressed }) => {
//  return{marginBottom:5}
// }}
  
//           onPress={() => {
//             console.log("Click");
//             onClick(item);
//             console.log("Clicked!");
//           }}
//         >
//           <IconDisplay
//             className={"border-inherit text-gray-400  "}
//             iconColor={"#9ca3af"}
//             size={tabSize}
//             value={item.name}
//             DisplayIcon={Icon}
//           />
//         </Pressable>
//       )}
//       keyExtractor={(item) => item.id}
//     />
//   );
// }



import { ListData } from "@/ts";
import { LucideIcon } from "lucide-react-native";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import IconDisplay from "./iconDisplay";

type ListType = {
  data: ListData[];
  Icon: LucideIcon;
  onClick: (id: string) => void;
  tabSize?: "sm" | "md" | "lg" | "xl";
};

export default function List({
  data,
  Icon,
  onClick,
  tabSize = "xl",
}: ListType) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Pressable
        
          style={{marginBottom:5}}
          onPress={() => {
            console.log("Click");
            onClick(item.id);
            console.log("Clicked!");
          }}
        >

           {({ pressed }) => (
    <View style={[
    
      pressed && { opacity: 0.5, backgroundColor: '#f3f4f6' }
    ]}>
      <IconDisplay
        className="border-gray-400 text-gray-400"
        iconColor="#9ca3af"
        size={tabSize}
        value={item.name}
        DisplayIcon={Icon}
      />
    </View>
  )}

          
          
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginBottom: 5,
  },
  pressed: {
    opacity: 0.6,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
});