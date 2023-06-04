import React, { useEffect, useState } from "react";
import CategoriesList from "./categoriesList";
import SearchProducts from "./searchProducts";
import ProductsList from "./productsList";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCategories } from "../store/categories";
import { getProductsList } from "../store/products";
import Loading from "./common/loading";

const ProductsListPage = ({ categoryId }) => {
    const [selectedCat, setSelectedCat] = useState();
    const [searchData, setSearchData] = useState({ search: "" });
    const history = useHistory();
    const products = useSelector(getProductsList());
    const categories = useSelector(getCategories());
    const handleCategorySelect = (item) => {
        setSelectedCat(item);
        setSearchData({ search: "" });
    };
    const [filteredProducts, setFilteredProducts] = useState(products);
    const handleChange = ({ target }) => {
        setSearchData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setSelectedCat();
    };

    const clearFilter = () => {
        history.push(`/`);
        setSelectedCat();
        setSearchData({ search: "" });
    };
    let newFiltProd = [];

    useEffect(() => {
        setFilteredProducts(newFiltProd);
    }, [selectedCat, products, searchData]);
    if (products && categories) {
        newFiltProd = categoryId
            ? products.filter((product) => product.category === categoryId)
            : selectedCat
            ? products.filter(
                  (product) => product.category === selectedCat.catNumber
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
                            <h5>Категории</h5>
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
                    <div className="d-flex flex-column content-justify-center">
                        <ProductsList products={filteredProducts} />
                    </div>
                </div>
            </div>
        );
    }
    return <Loading />;
};

ProductsListPage.propTypes = {
    categoryId: PropTypes.string
};

export default ProductsListPage;
