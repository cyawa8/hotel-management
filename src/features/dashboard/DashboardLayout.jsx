import styled from "styled-components";
import { useRecentBooking } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStay } from "./useRecentStay";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout(){
  const {isLoading: isLoading1, bookings} = useRecentBooking();
  const {confirmedStays, numDays, isLoading:isLoading2} = useRecentStay();
 

  if(isLoading1 || isLoading2) return <Spinner />;

  return(
    <StyledDashboardLayout> 
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays}/>
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;