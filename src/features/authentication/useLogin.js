import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiLogin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: login, isLoading} = useMutation({
        mutationFn: ({email, password}) => loginAPI({email, password}),
        onSuccess: (user)=> {
            queryClient.setQueryData(["user"], user.user);
            navigate("/dashboard");
            toast.success('Login Success')
        },
        onError: (err)=>{
            console.log("ERROR", err);
            toast.error('Provided email or password are incorrect');
        },
    });

    return {login, isLoading};
}
