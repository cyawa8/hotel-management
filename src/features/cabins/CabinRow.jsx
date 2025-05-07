import PropTypes from "prop-types";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm"
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
// import Button from "../../ui/Bustton";


// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin-left: 5px;
  border-radius: 6px;
`;

const Images = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin-left: 5px;
  border-radius: 6px;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;
 
const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {id : cabinId, name, capacity, price, discount, image} = cabin;
  const queryClient = useQueryClient();

  const {mutate: deleteCabinMutation, isLoading : isDeletings } = useMutation({
    mutationFn: async () => {
      console.log('deleteCabin is being called...');
      await deleteCabin(cabinId); // Pastikan deleteCabin dipanggil
    },
    onSuccess : ()=>{
      console.log('Data berhasil dihapus');
      toast.success('Data berhasil dihapus')
      queryClient.invalidateQueries({queryKey: ['cabins']})
    },
    onError: (err) => {
      console.error('Error while deleting cabin:', err); // Log error di sini untuk debugging
      toast.error('Failed to delete cabin');
    },
  });

  return (
    <>
    <Table.Row>
      <Modal>
        <Modal.Open opens="image">
          <Img src={image} />
        </Modal.Open>
        <Modal.Window name="image">
          <Images src={image} />
        </Modal.Window>
      </Modal>
      <Cabin>{name}</Cabin>
      <div>Fits Up To {capacity}</div>
      <Price>{formatCurrency(price)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
        <div>
          
          {/* <Modal>
            <Modal.Open opens="edit">
              <button>Edit</button>
            </Modal.Open>
            <Modal.Window name="edit">
              {<CreateCabinForm cabinEdit={cabin}/>}
            </Modal.Window>
          </Modal> */}

        <Modal>
          <Menus.Menu>
            <Menus.Toogle id={cabinId}/>
              <Menus.List id={cabinId}>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>

              </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit">
            {<CreateCabinForm cabinEdit={cabin}/>}
          </Modal.Window>
          <Modal.Window name="delete">
              {<ConfirmDelete resourceName="Cabins" disabled={isDeletings} onConfirm={()=>deleteCabinMutation(cabinId)} onCloseModal={()=>console.log('Modal Close')} />}
          </Modal.Window>
        </Modal>
        </div>
    </ Table.Row>

    
    </>
  )
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};

export default CabinRow