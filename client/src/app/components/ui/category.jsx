import React from "react";
import PropTypes from "prop-types";
import { useCategories } from "../../hooks/useCategories";

const Category = ({ id }) => {
    const { getCategory } = useCategories();

    const category = getCategory(id);
    if (category) {
        return <p>Категория: {category.name}</p>;
    }
};

Category.propTypes = {
    id: PropTypes.string
};

export default Category;
