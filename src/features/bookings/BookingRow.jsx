import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

import PropTypes from "prop-types";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
// import Modal from "../../ui/Modal";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;


function BookingRow({
  booking: {
    id : bookingId,
    start_date,
    end_date,
    num_night,
    total,
    status,
    is_paid,
    guest_id: { first_name, email },
    cabin_id: { name: cabin_name }
  },
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); 
  const {checkout, isCheckingOut} = useCheckout();
  const {mutate: deleteBookingMutation, isLoading : isDeletings } = useMutation({
      mutationFn: async () => {
        console.log('deleteCabin is being called...');
        await deleteBooking(bookingId); // Pastikan delete dipanggil
      },
      onSuccess : ()=>{
        toast.success('Data berhasil dihapus')
        queryClient.invalidateQueries({queryKey: ['bookings']})
      },
      onError: (err) => {
        toast.error('Failed to delete booking');
        console.error('Error while deleting booking:', err); // Log error di sini untuk debugging
      },
    });
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const isPaid = {
    true : "green",
    false : "red"
  };


  return (
    <Table.Row>
      <Cabin>{cabin_name}</Cabin>

      <Stacked>
        <span>{first_name}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}
            {" "}
          &rarr; {num_night} night stay
        </span>
        <span>
          {format(new Date(start_date), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(end_date), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Stacked>
        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        {status === "unconfirmed" &&
        <Tag type={isPaid[is_paid]}>{is_paid ? "Paid" : "UnPaid"}</Tag>
        }
      </Stacked>

      <Amount>{formatCurrency(total)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toogle id={bookingId}/>
          <Menus.List id={bookingId}>
            <Menus.Button icon={<HiEye />} onClick={()=>navigate(`/bookings/${bookingId}`)}>
              Detail
            </Menus.Button>
            {/* <Menus.Button icon={<HiTrash />}>
              Delete
              </Menus.Button> */}

            
            <Modal.Open opens="hapuss">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>

            
            {status === "checked-in" &&
              <Menus.Button 
                icon={<HiArrowUpOnSquare />}
                onClick={()=>{checkout({bookingId})}}
                disabled = {isCheckingOut}
              >
                Check Out
              </Menus.Button>
            }

            {status === "unconfirmed" ? <Menus.Button 
              icon={<HiArrowDownOnSquare />}
              onClick={()=>navigate(`/bookings/${bookingId}`)}
              >
              Check In
            </Menus.Button> : null}
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="hapuss">
            {<ConfirmDelete resourceName="Booking" disabled={isDeletings} onConfirm={()=>deleteBookingMutation(bookingId)} onCloseModal={()=>console.log('Modal Close')} />}
        </Modal.Window>
        </Modal>
    </Table.Row>
  );
}

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    num_night: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    is_paid: PropTypes.bool.isRequired,
    status: PropTypes.oneOf(["unconfirmed", "checked-in", "checked-out"]).isRequired,
    guest_id: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    cabin_id: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BookingRow;
