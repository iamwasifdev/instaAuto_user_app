import { ListData } from "@/ts";
import { LucideIcon, MapPin } from "lucide-react-native";
import { FlatList, Pressable } from "react-native";
import IconDisplay from "./iconDisplay";

type ListType = {
  data: ListData[];
  Icon: LucideIcon;
  onClick: (data: ListData) => void;
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
          onPress={() => {
            onClick(item);
          }}
        >
           <IconDisplay
            className={"border-gray-300 text-gray-400 active:border-gray-600  "}
            iconColor={"#9ca3af"}
            size={tabSize}
            value={item.name}
            DisplayIcon={Icon}
          />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
