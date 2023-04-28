import React, { useEffect, useState } from "react";
import api from "../api";
import CategoriesList from "./categoriesList";
import SearchProducts from "./searchProducts";
import ProductsList from "./productsList";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const ProductsListPage = ({ categoryId }) => {
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [selectedCat, setSelectedCat] = useState();
    const [searchData, setSearchData] = useState({ search: "" });
    const history = useHistory();

    useEffect(() => {
        api.products.fetchAll().then((data) => setProducts(data));
        api.categories.fetchAll().then((data) => setCategories(data));
    }, []);

    const handleCategorySelect = (item) => {
        history.push(`/`);
        setSelectedCat(item);
        setSearchData({ search: "" });
    };

    const handleChange = ({ target }) => {
        setSearchData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setSelectedCat();
    };

    const clearFilter = () => {
        setSelectedCat();
        setSearchData({ search: "" });
    };

    if (products && categories) {
        const filteredProducts = categoryId
            ? products.filter((product) => product.category?.id === categoryId)
            : selectedCat
            ? products.filter(
                  (product) => product.category?.name === selectedCat?.name
              )
            : typeof searchData.search !== "string"
            ? products
            : products.filter((product) =>
                  product.name
                      .toLowerCase()
                      .includes(searchData.search.toLowerCase())
              );
        return (
            <div>
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <SearchProducts
                        value={searchData.search.toString()}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex">
                    {categories && (
                        <div className="d-flex flex-column flex-shrink-0 p-3 w-25">
                            <CategoriesList
                                selectedItem={selectedCat}
                                items={categories}
                                onItemSelect={handleCategorySelect}
                            />
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={clearFilter}
                            >
                                {" "}
                                Очистить
                            </button>
                        </div>
                    )}
                    <div className="d-flex flex-column contentJustify-center">
                        <ProductsList products={filteredProducts} />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

ProductsListPage.propTypes = {
    categoryId: PropTypes.string
};

export default ProductsListPage;
