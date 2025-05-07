import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings(){
    const {
        isLoading, 
        error,
        data : setting
    } = useQuery({
        queryKey : ["Setting"],
        queryFn : getSettings,
    });

return {isLoading, error, setting};
}