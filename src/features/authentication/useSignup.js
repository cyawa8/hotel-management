import { useMutation } from "@tanstack/react-query";
import {signUp as signUpApi} from "../../services/apiLogin"
import toast from "react-hot-toast";

export function useSignup(){
    const {mutate : signUp, isLoading} = useMutation({
        mutationFn : signUpApi,
        onSuccess: (user) =>{
            console.log(user);
            toast.success("Successfully adding user. Please verify new account from the user's email address");
        },
    });

    return {signUp, isLoading};
}