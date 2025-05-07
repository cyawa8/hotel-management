import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin(){
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {
        mutate : checkin,
        isLoading : isCheckingIn
    } = useMutation({
        mutationFn : ({bookingId, breakfast})=>updateBooking(
            bookingId, {
                status : "checked-in", 
                is_paid : true,
                ...breakfast || {},
            }
        ),
        onSuccess: (data)=>{
            toast.success(`Booking #${data.id} successfully checked in`); 
            queryClient.invalidateQueries({active : true})
            navigate("/")
        },

        onError: (error)=>{
            toast.error('There was an error while checked in')
            
    console.error(error);
        }
    })
    return {checkin, isCheckingIn}
}

export function useCheckout(){
    const queryClient = useQueryClient()
    const {
        mutate : checkout, 
        isLoading : isCheckingOut
    } = useMutation({
        mutationFn : ({bookingId})=>updateBooking(
            bookingId, {
                status : "checked-out",
            }
        ),
        onSuccess: (data)=>{
            toast.success(`Booking #${data.id} successfully checked out`); 
            queryClient.invalidateQueries({active : true})
        },

        onError: (error)=>{
            toast.error('There was an error while checked inasd')
            
    console.error(error);
        }
    })
    return {checkout, isCheckingOut}
}