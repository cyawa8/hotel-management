import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckin";
import Modal from "../../ui/Modal";
import { useBookingDelete } from "./useBookingDelete";
// import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
// import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  // const booking = {};
  const {booking, isLoading} = useBooking();
  const navigate = useNavigate();
  const {checkout, isCheckingOut} = useCheckout();
  const { deleteBookingMutation, isDeleting } = useBookingDelete();
  // const status = "checked-in";

  const moveBack = useMoveBack();

  if(isLoading) return <Spinner />;

  if(!booking) return <Empty resourceName='booking'/>

  const {status, id: bookingId} = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (<Button 
          onClick={()=>navigate(`/checkin/${bookingId}`)}
        >
          Check In
        </Button>
      )}

      {status === "checked-in" && <Button 
          onClick={()=>{checkout({bookingId})}}
          disabled = {isCheckingOut}
        >
          Check Out
        </Button> 
      }

      <Modal>
        <Modal.Open opens="delete">
          <Button variation="danger">
            Delete
          </Button>
        </Modal.Open>

        <Modal.Window name="delete">
              {<ConfirmDelete resourceName="Booking" disabled={isDeleting} onConfirm={()=>deleteBookingMutation(bookingId, {onSettled : ()=> navigate(-1)})}    />}
        </Modal.Window>
      </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
