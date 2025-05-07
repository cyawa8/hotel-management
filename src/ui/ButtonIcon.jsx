import styled from "styled-components";

const ButtonIcon = styled.button`
width: 100%; /* ← ini bikin tombol full width */
background: none;
border: none;
padding: 1.2rem 2.4rem; /* Sesuaikan agar klik area enak */
border-radius: var(--border-radius-sm);
text-align: left;

display: flex;
align-items: center;
gap: 1.2rem;

transition: all 0.2s;

&:hover {
  background-color: var(--color-grey-100);
}

& svg {
  width: 2.2rem;
  height: 2.2rem;
  color: var(--color-brand-600);
} 
`;


export default ButtonIcon;
