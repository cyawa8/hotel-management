import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiLogin";
import toast from "react-hot-toast";

export function useUpdateUser(){
    const queryClient = useQueryClient();

    const {mutate : updateUser, isLoading: isUpdating} = useMutation({
        mutationFn : updateCurrentUser,
        onSuccess : (user) => {
            toast.success("User Account Successfullt Updated");
            queryClient.setQueriesData("user", user);
            queryClient.invalidateQueries({
                queryKey: ["user"]
            });
        },
        onError: (err)=>toast.error(err.message),
    });

    return {updateUser, isUpdating};
}