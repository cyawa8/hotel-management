import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useBookingDelete(){
    const queryClient = useQueryClient();
    const {mutate: deleteBookingMutation, isLoading : isDeleting } = useMutation({
        mutationFn: async (bookingId) => {
          console.log('deleteCabin is being called...');
          await deleteBooking(bookingId); // Pastikan deleteCabin dipanggil
        },
        onSuccess : ()=>{
          console.log('Data berhasil dihapus');
          toast.success('Data berhasil dihapus')
          queryClient.invalidateQueries({queryKey: ['bookings']})
        },
        onError: (err) => {
          console.error('Error while deleting booking:', err); // Log error di sini untuk debugging
          toast.error('Failed to delete booking');
        },
      });
      return { deleteBookingMutation, isDeleting };
}