import styled, {css} from "styled-components"

const Heading = styled.h1`
    ${props => props.type === 'H1' && 
    css`font-size : 30px;
        font-wights : 600;`}
    line-height : 1.4;
    

     ${props => props.type === 'H2' && 
    css`font-size : 20px;
        font-wights : 600;`}
    line-height : 1.4;
    padding : 1.2rem;
    
`;

export default Heading; 