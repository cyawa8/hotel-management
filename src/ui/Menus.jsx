import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import useClickOutside from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext()

function Menus({children}){
  const [isOpen, setIsOpen] = useState("");
  const [position, setPosition] = useState(null)

  const close = ()=>setIsOpen("");
  const open = setIsOpen;
  return(
    <MenusContext.Provider value={{isOpen, open, close, position, setPosition}}>{children}</MenusContext.Provider>
  );
}

function Toogle({id}){
  const {isOpen, open, close, setPosition} = useContext(MenusContext);

  function handleClick(e){
    e.stopPropagation(); 

    const rect = e.target.closest('button').getBoundingClientRect()
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    if (isOpen === "" || isOpen !== id) {
      open(id); // Jika menu yang sama diklik, tutup menu
    } else {
      close(); // Jika menu berbeda, buka menu baru
    }
  }

  return(
    <StyledToggle onClick={handleClick}><HiEllipsisVertical/></StyledToggle>
  );
}

function List({id, children}){
  const {isOpen, position, close} = useContext(MenusContext);
  const ref = useClickOutside(close, false);
  if(isOpen !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>{children}</StyledList>, document.body
  );
}
function Button({children, icon, onClick}){
  const {close} = useContext(MenusContext);
  
  function handleClick(){
    onClick?.();
    close();
  }
  return(
    <li>
      <StyledButton onClick={handleClick}>
        {icon}<span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toogle = Toogle;
Menus.List = List;
Menus.Button = Button;

Menus.propTypes = {
  children: PropTypes.node.isRequired,
};

Toogle.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // ✅ Bisa string atau number
};

List.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // ✅ Bisa string atau number
  children: PropTypes.node,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node, // ✅ Ikon bisa berupa React Node (elemen JSX)
  onClick: PropTypes.func, // ✅ onClick adalah fungsi opsional
};

export default Menus;
export {MenusContext};