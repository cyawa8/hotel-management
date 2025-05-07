import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

// ✅ Menambahkan validasi props agar tidak ada warning di console
FormRowVertical.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element, // Jika hanya satu elemen
    PropTypes.arrayOf(PropTypes.node), // Jika lebih dari satu elemen
  ]).isRequired,
};

export default FormRowVertical;
