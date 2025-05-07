import styled from "styled-components";
import {Flag} from "../../ui/Flag";
import Tag from "../../ui/Tag";
import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({activity}){
  
  const {id, status, guest_id, num_night} = activity;

  

  return (
  <div>
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guest_id.country_flag} alt={`Flag of ${guest_id.nationality}`}/>
      <Guest>{guest_id.first_name}</Guest>
      <div>{num_night} Night</div>

      {status === "unconfirmed" && (
        <Button size="small" variation="primary" as={Link} to={`/checkin/${id}`}>Check in</Button>
      )}

      {status === "checked-in" && (
        <CheckoutButton bookingId={id}>Check out</CheckoutButton>
      )}
    </StyledTodayItem>
  </div>
 );
}

TodayItem.propTypes = {
  activity: PropTypes.shape({
    id : PropTypes.number.isRequired,
    status: PropTypes.oneOf(["unconfirmed", "checked-in"]).isRequired,
    num_night: PropTypes.number.isRequired,
    guest_id: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      nationality: PropTypes.string.isRequired,
      country_flag: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TodayItem;
