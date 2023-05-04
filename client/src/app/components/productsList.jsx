import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Category from "./ui/category";

const ProductsList = ({ products }) => {
    const history = useHistory();
    const handleClick = (productId) => {
        history.push(`/products/${productId}`);
    };
    const [sortType, setSortType] = useState(true);
    let sortProducts = products;
    const sortByPrice = () => {
        if (sortType === true) {
            sortProducts = products.sort((a, b) => {
                return a.price - b.price;
            });
            setSortType(!sortType);
        }
        if (sortType === false) {
            sortProducts = products.sort((a, b) => {
                return b.price - a.price;
            });
            setSortType(!sortType);
        }
    };
    return (
        <div>
            <button
                onClick={sortByPrice}
                className="btn btn-secondary btn-sm mb-3"
            >
                Сортировать по цене{" "}
                {sortType ? (
                    <i className="bi bi-sort-up"></i>
                ) : (
                    <i className="bi bi-sort-down"></i>
                )}
            </button>

            {sortProducts.map((product) => (
                <div
                    key={product._id}
                    className="shadow p-4 d-flex mb-2"
                    style={{ backgroundColor: "white", borderRadius: "15px" }}
                >
                    <div className="col-md-6 ">
                        <img
                            className="mw-100 p-2"
                            src={product.image}
                            height="200"
                            alt={product.name}
                            style={{
                                borderRadius: "15px"
                            }}
                        />
                    </div>
                    <div className="col-md-6 ms-auto ">
                        <h5>{product.name}</h5>
                        <Category id={product.category} />
                        {/* <p>ID: {product._id}</p> */}
                        {/* <p>Количество: {product.quantity}</p> */}
                        <p>
                            Цена: <b>{product.price.toLocaleString()}</b> рублей
                        </p>
                        <div className="col-md-6 ms-auto">
                            <button
                                type="button"
                                className="btn btn-outline-info"
                                onClick={() => handleClick(product._id)}
                            >
                                Карточка товара
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

ProductsList.propTypes = {
    products: PropTypes.array
};

export default ProductsList;
