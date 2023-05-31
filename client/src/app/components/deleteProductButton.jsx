import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/products";

const DeleteProduct = ({ product }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = (item) => {
        dispatch(deleteProduct(item._id));

        history.push(`/admin`);
    };
    return (
        <>
            <button onClick={() => handleDelete(product)}>
                <i className="bi-x p-2"></i>
            </button>
        </>
    );
};

DeleteProduct.propTypes = {
    product: PropTypes.object
};
export default DeleteProduct;
