import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import Akun from "./Akun";
import Modal from "./Modal";
import Menus from "./Menus";
import PropTypes from "prop-types";

const StyledHeaderMenu = styled.ul`
    display : flex;
    gap : 0.4rem;
`;

const MenuItem = styled.li`
  width: 100%;
`;

function HeaderMenu({users}) {
    const UID = users?.id ?? "default";
    return (
      <StyledHeaderMenu>
          <Modal>
            <Menus>
            <Menus.Menu>
                <Menus.Toogle id={UID} />
                <Menus.List id={UID}>
                    <MenuItem>
                        <Akun />
                    </MenuItem>
                    <MenuItem>
                        <Logout />
                    </MenuItem>
          
                </Menus.List>
            </Menus.Menu>
            </Menus>
        </Modal>
      </StyledHeaderMenu>
    )
}

HeaderMenu.propTypes = {
  users: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default HeaderMenu
