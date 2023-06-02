import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getCategoriesLoadingStatus,
    getCategoryById,
    loadCategoriesList
} from "../../store/categories";
import Loading from "../common/loading";

const Category = ({ id }) => {
    const dispatch = useDispatch();
    const category = useSelector(getCategoryById(id));
    const isLoading = useSelector(getCategoriesLoadingStatus());

    useEffect(() => {
        dispatch(loadCategoriesList());
    }, []);
    if (isLoading) return <Loading />;
    if (category) {
        return <p>Категория: {category.name}</p>;
    }
};

Category.propTypes = {
    id: PropTypes.string
};

export default Category;
