import React from "react";
import PropTypes from "prop-types";

const SearchProducts = ({ value, onChange }) => {
    return (
        <input
            type="text"
            name="search"
            value={value}
            onChange={onChange}
            placeholder="Поиск товара по имени..."
        ></input>
    );
};

SearchProducts.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};
export default SearchProducts;
