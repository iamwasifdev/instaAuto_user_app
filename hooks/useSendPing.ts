import { useDataContext } from "@/context/dataContext";
import { routeIdDictionary } from "@/ts";
import sendPing from "@/useMutationFunctions/sendPing";
import gotError from "@/utils/error";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

//This is the implimentation layer of  the  api
export default function useSendPing() {
  //  destinationStopId,
  // pickupLat:lat,
  // pickupLng:lng
  
  const { setAllowedRoutes,setPhase } = useDataContext();
  const [used, setUsed] = useState(false);//this is so the person will not be able to click twice
  const [error, setError] = useState("");
  const { mutate: rawMutate, ...rest } = useMutation<
    routeIdDictionary,
    unknown,
    { destinationStopId: string; pickupLat: number; pickupLng: number }
  >({
    mutationFn: (variables) => {
      return sendPing(
        variables.destinationStopId,
        variables.pickupLng,
        variables.pickupLat,
      );
    },
    onError: (error) => {
      setError(gotError(error, "str").error);
      setUsed(false);
      setTimeout(() => {
        setError("");
      }, 1000 * 6);
    },
    onSuccess: (data) => {
      setPhase("CONFIRM")
      setError("");
      setAllowedRoutes(data);
      console.log("It was an success and the Data is: ", data);
    },
  });

  function hardDebouncedMutate(
    variables: {
      destinationStopId: string;
      pickupLng: number;
      pickupLat: number;
    }
  ) {
    if (used) {
      return;
    }
    rawMutate(variables);


  }

  return {
    hardDebouncedMutate,
    error,
    used,
    mutation: { ...rest },
  };
}
