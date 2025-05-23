import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";


export async function getBookings({filter, sortBy, page}){
  let query = supabase
 .from("Booking")
    .select(`
      id,
      created_at,
      start_date,
      end_date,
      num_night,
      num_quest,
      price,
      extra_price,
      total,
      status,
      breakfast,
      is_paid,
      observation,
      cabin_id(name),
      guest_id(first_name, last_name, email)
    `,{count : "exact"}
  );

  if(filter){
    query = query.eq(filter.field, filter.value);
  }
  
  if (sortBy) {
    query = query.order(sortBy.field, { descending: sortBy.direction === "desc" });
  }
  
  if(page){
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  
  const {data, error, count} = await query;

    if(error){
      console.error(error);
      throw new Error("Bookings could not be loaded");
    }

  return {data, count};
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("Booking")
    .select("*, cabin_id(*), guest_id(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("Booking")
    .select("created_at, total, extra_price, is_paid, status, guest_id(first_name)")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("Booking")
    // .select('*')
    .select("*, guest_id(first_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  
  const { data, error } = await supabase
    .from("Booking")
    .select("*, guest_id(first_name, nationality, country_flag)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}), and(status.eq.checked-in,end_date.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("Booking")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("Booking").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
