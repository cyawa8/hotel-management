import PropTypes from "prop-types";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height : 100vh;
  background-color : var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

function AuthorizedUser({ children }) {
  const navigate = useNavigate();
  const {isLoading, isAuthenticated} = useUser();

  console.log("isAuthenticatedd:", isAuthenticated);
  console.log("isLoadingds:", isLoading);

  useEffect(
    function(){
    if(!isAuthenticated && !isLoading){
       navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if(isLoading) return(
    <FullPage>
      <Spinner />
    </FullPage>
  );


  if(isAuthenticated) return children;
}

AuthorizedUser.propTypes = {
  children: PropTypes.node.isRequired, // Menentukan bahwa "children" harus berupa elemen React
};

export default AuthorizedUser;
