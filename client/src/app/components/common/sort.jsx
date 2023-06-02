import React, { useState } from "react";
import PropTypes from "prop-types";
import history from "../../utils/history";

const SortProducts = ({
    setSortProducts,
    sortProducts,
    sortParam,
    buttonValue
}) => {
    const [sortType, setSortType] = useState(true);
    const sort = () => {
        const productRatingCounter = (productRatingArray) => {
            if (
                !Array.isArray(productRatingArray) ||
                productRatingArray.length === 0
            ) {
                return 0;
            }
            const sum = productRatingArray.reduce(
                (acc, number) => acc + number.rate,
                0
            );
            const length = productRatingArray.length;
            return Math.round(sum / length);
        };
        if (sortType === true) {
            if (sortParam === "price") {
                console.log("я тут где прайс");
                setSortProducts(
                    sortProducts.sort((a, b) => {
                        return a.price - b.price;
                    })
                );
            }
            if (sortParam === "rate") {
                setSortProducts(
                    sortProducts.sort((a, b) => {
                        return (
                            productRatingCounter(a.rate) -
                            productRatingCounter(b.rate)
                        );
                    })
                );
            }
            setSortType(!sortType);
        }
        if (sortType === false) {
            if (sortParam === "price") {
                setSortProducts(
                    sortProducts.sort((a, b) => {
                        return b.price - a.price;
                    })
                );
            }
            if (sortParam === "rate") {
                setSortProducts(
                    sortProducts.sort((a, b) => {
                        return (
                            productRatingCounter(b.rate) -
                            productRatingCounter(a.rate)
                        );
                    })
                );
            }
            setSortType(!sortType);
        }
        console.log("sort prod", sortProducts);
        history.push(`/`);
    };
    return (
        <button
            onClick={() => {
                sort();
            }}
            className="btn btn-secondary btn-sm m-2"
        >
            {buttonValue}
            {sortType ? (
                <i className="bi bi-sort-up"></i>
            ) : (
                <i className="bi bi-sort-down"></i>
            )}
        </button>
    );
};

SortProducts.propTypes = {
    sortParam: PropTypes.string,
    buttonValue: PropTypes.string,
    sortProducts: PropTypes.array,
    setSortProducts: PropTypes.func
};

export default SortProducts;
