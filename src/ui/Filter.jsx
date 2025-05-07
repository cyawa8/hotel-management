import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  &[data-active="true"] {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;


function Filter({filterField, options}){
  const [search, setSearch] = useSearchParams();
  const currentFilter = search.get(filterField) || options.at(0).value;

  function handleClick(value){
    search.set(filterField, value);
    setSearch(search);
  }

  return(
    <StyledFilter>
      {options.map(option =>
      
        <FilterButton 
          onClick={()=>handleClick(option.value)} 
          key={option.value} 
          data-active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
            {option.label}
        </FilterButton>
      
      )}
      </StyledFilter>
  );
}

Filter.propTypes = {
  filterField: PropTypes.string.isRequired, // Wajib string
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired, // Wajib string
      label: PropTypes.string.isRequired, // Wajib string
    })
  ).isRequired, // Harus berupa array object
};

export default Filter;