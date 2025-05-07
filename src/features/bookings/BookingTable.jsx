import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";
import { useEffect, useRef } from "react";

function BookingTable() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const prevFilter = useRef(null);

    const filterValue = searchParams.get("status");
    const filter = !filterValue || filterValue === "all" ? null : {field : "status", value : filterValue};

    const sortByValue = searchParams.get("sortBy") || "start_date-desc";
    const [field, direction] = sortByValue.split("-");
    const sortBy = {field, direction};
    
   // Ambil page dari URL, default ke 1
   const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  
   // Reset page ke 1 hanya jika filter berubah
   useEffect(() => {
    if (prevFilter.current !== filterValue) {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("page", "1"); // Reset page ke 1 saat filter berubah
            return params;
        });
        prevFilter.current = filterValue; // Simpan filter baru
    }
}, [filterValue, setSearchParams]);

    const {
      isLoading,
      data: { data : bookings, count} = {data: [], count: 0 },
      error,
    } = useQuery({
      queryKey: ['bookings', filter ? filter.value : "all", sortBy.field, sortBy.direction, page],
      queryFn : () =>  getBookings(filter ? { filter, sortBy, page } : { sortBy, page }),
    });

    //PRE-FETCHING
    // **Pastikan jumlah halaman valid**
    const pageCount = Math.max(1, Math.ceil(count / PAGE_SIZE)); // Minimal 1 halaman
    const pages = Math.min(page, pageCount); // Jika halaman lebih besar dari total halaman, reset ke yang benar
     
    if(pages < pageCount){
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter ? filter.value : "all", sortBy.field, sortBy.direction, page + 1],
        queryFn: () => getBookings(filter ? { filter, sortBy, page: page + 1 } : { sortBy, page: page + 1 }),
    });
    }
    
    if(pages > 1){
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter ? filter.value : "all", sortBy.field, sortBy.direction, page - 1],
        queryFn: () => getBookings(filter ? { filter, sortBy, page: page - 1 } : { sortBy, page: page - 1 }),
    });
    }

   

  if (!bookings.length) return <Empty resourceName="bookings" />;
  if(isLoading) return <Spinner />;
  if (error) return <div>Error loading booking data: {error.message}</div>;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            // console.log(booking)
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count}/>
        </Table.Footer>
      </Table>

    </Menus>
  );
}

export default BookingTable;
