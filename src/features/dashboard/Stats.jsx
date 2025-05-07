import PropTypes from "prop-types";
import Stat from "./Stat";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({bookings, confirmedStays, numDays}){
    const numBookings = bookings.length;
    const sales = bookings.reduce((acc, cur) => acc + cur.total,0)
    const checkIns = confirmedStays.length;
    const occupation = confirmedStays.reduce((acc, cur) => acc + cur.num_night, 0)/(numDays);

    return (
        <>
            <Stat title='bookings' color='blue' icon={<HiOutlineBriefcase />} value={numBookings}/>
            <Stat title='sales' color='green' icon={<HiOutlineBanknotes />} value={formatCurrency(sales)}/>
            <Stat title='checkins' color='indigo' icon={<HiOutlineCalendarDays />} value={checkIns}/>
            <Stat title='occupancy rate' color='yellow' icon={<HiOutlineChartBar />} value={Math.round(occupation*100)+"%"}/>
        </>
    );
}

Stats.propTypes = {
    bookings: PropTypes.array.isRequired,
    confirmedStays: PropTypes.array.isRequired,
    numDays: PropTypes.number.isRequired,
  };

export default Stats;