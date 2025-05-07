import PropTypes from "prop-types"

function Empty({ resourceName }) {
  return <p>No {resourceName} could be found.</p>;
}

// ✅ Menambahkan PropTypes untuk validasi props
Empty.propTypes = {
  resourceName: PropTypes.string.isRequired,
};

export default Empty;
