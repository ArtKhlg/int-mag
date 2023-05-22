import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const EditProduct = ({ product }) => {
    const history = useHistory();
    const handleClick = (item) => {
        history.push(`/admin/edit${item._id}`);
    };

    return (
        <>
            <button onClick={() => handleClick(product)}>
                <i className="bi bi-pencil p-2"></i>
            </button>
        </>
    );
};

EditProduct.propTypes = {
    product: PropTypes.object
};
export default EditProduct;
