import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import { useHistory } from "react-router-dom";

const ProductPage = ({ productId }) => {
    const [product, setProduct] = useState();
    const history = useHistory();
    useEffect(() => {
        api.products.getById(productId).then((data) => setProduct(data));
    }, []);

    const handleClick = () => {
        history.push("/");
    };
    if (product) {
        return (
            <>
                <a href={"/"}>Товары</a>/
                <a href={`/${productId}/${product.category.id}`}>
                    {product.category.name}
                </a>
                <div className="d-flex flex-row bd-highlight mb-3">
                    <div className="p-2 bd-highlight">
                        <img
                            className="mw-100 p-2"
                            src={product.image}
                            height="auto"
                            alt={product.name}
                            style={{
                                borderRadius: "50px"
                            }}
                        />
                    </div>
                    <div className="p-2 bd-highlight ">
                        <h1>
                            <p>{product.name}</p>
                        </h1>

                        <h2>
                            <p>Категория: {product.category.name}</p>
                        </h2>

                        <h4>
                            <p>Количество в наличии: {product.quantity}</p>
                        </h4>

                        <h3>
                            <p>Цена (за шт.): {product.price}</p>
                        </h3>
                    </div>
                    <div className="p-2 bd-highlight ">
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={handleClick}
                        >
                            <h2>Купить</h2>
                        </button>
                        <div className="d-flex align-items-end">
                            <p>id:{product._id}</p>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={handleClick}
                >
                    <h2>Вернуться в каталог</h2>
                </button>
            </>
        );
    } else return "Loading...";
};

ProductPage.propTypes = {
    productId: PropTypes.string
};

export default ProductPage;
