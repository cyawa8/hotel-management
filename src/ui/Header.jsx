import styled from "styled-components";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";
import { useUser } from "../features/authentication/useUser";

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding : 1.2rem 4.8rem;
    border-bottom : 1px solid var(--color-grey-100);
    
    display : flex;
    gap : 2.4rem;
    align-content: center;
    justify-content: space-between;
`

function Header() {
    const { user } = useUser();
    return (
        <StyledHeader>
            <UserAvatar />
            {user && <HeaderMenu users={user} />}
        </StyledHeader>
    )
}

export default Header
