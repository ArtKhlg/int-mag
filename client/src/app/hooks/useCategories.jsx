import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import categoryService from "../services/category.service";

const CategoriesContext = React.createContext();

export const useCategories = () => {
    return useContext(CategoriesContext);
};

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { content } = await categoryService.fetchAll();
                setCategories(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getCategories();
    }, []);
    const getCategory = (id) => {
        return categories.find((q) => q._id === id);
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                getCategory,
                isLoading
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

CategoriesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
