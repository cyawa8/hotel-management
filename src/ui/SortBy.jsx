import { useSearchParams } from "react-router-dom"
import PropTypes from "prop-types";
import Select from "./Select"

function SortBy({options}) {
    const [search, setSearch] = useSearchParams();
    const sortBy = search.get("sortBy");
    function handleChange(e){
        search.set('sortBy', e.target.value)
        setSearch(search);
    }

    return (
        <Select options={options} type={'white'} value={sortBy || ""} onChange={handleChange}/>
    )
}

SortBy.propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default SortBy
