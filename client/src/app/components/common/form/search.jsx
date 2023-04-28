import React from "react";
import PropTypes from "prop-types";

const Search = ({ value, onChange }) => {
    return <input
    type="text"
    name="search"
    value={value}
    onChange={onChange}
    placeholder='Search...'></input>;
};

Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};
export default Search;
