// import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabins(){
    return (
        <Modal>
            <Modal.Open opens='cabin-form'>
                <Button>Add New Cabin</Button>
            </Modal.Open>
            <Modal.Window name='cabin-form'>
                <CreateCabinForm />
            </Modal.Window>
        </Modal>
        
    );
}

// function AddCabins() {
//     const [isOpenModal, setOpenModal] = useState(false);
//     return (
//         <div>
//             <Button onClick={()=>setOpenModal((show)=>!show)}>Add new Cabin</Button>
//             {isOpenModal && <Modal onClose={()=>setOpenModal(false)}><CreateCabinForm onCloseModal={()=>setOpenModal(false)}/></Modal>}
//         </div>
//     )
// }

export default AddCabins
