
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../ui/ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useContext } from "react";
import {MenusContext} from "./Menus";

function Akun(){
    const {close} = useContext(MenusContext);
    const navigate = useNavigate();

    function handleClick(){
        navigate("./account");
        close();
    }

    return(
        <ButtonIcon onClick={handleClick}>
        <HiOutlineUser />
        <span>Akun</span>
        </ButtonIcon>
    );
}

export default Akun