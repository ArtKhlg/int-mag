import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useProducts } from "../hooks/useProducts";

const DeleteProduct = ({ product }) => {
    const { deleteProductFromList } = useProducts();
    const history = useHistory();

    const handleDelete = async (item) => {
        try {
            await deleteProductFromList(item._id);
        } catch (error) {
            console.log(error.message);
        }
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
