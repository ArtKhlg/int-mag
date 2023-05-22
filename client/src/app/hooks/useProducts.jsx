import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import productService from "../services/product.service";

const ProductContext = React.createContext();

export const useProducts = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState();
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getProductsList();
    }, []);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function getProduct(id) {
        return products.find((p) => p._id === id);
    }

    async function getProductsList() {
        try {
            const { content } = await productService.get();
            setProducts(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function updateProductData(data) {
        try {
            const { content } = await productService.update(data);
            setProduct(content);
            getProductsList();
            console.log("product", product);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function createProductData(data) {
        try {
            const { content } = await productService.create(data);
            setProduct(content);
            getProductsList();
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function deleteProductFromList(id) {
        try {
            const { content } = await productService.delete(id);
            if (content !== null) {
                setProduct((prevState) =>
                    prevState.filter((c) => c._id !== id)
                );
            }
            getProductsList();
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <ProductContext.Provider
            value={{
                isLoading,
                products,
                getProduct,
                updateProductData,
                createProductData,
                deleteProductFromList
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

ProductProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
