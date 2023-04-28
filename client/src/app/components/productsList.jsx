import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const ProductsList = ({ products }) => {
    const history = useHistory();
    const handleClick = (productId) => {
        history.push(`/${productId}`);
    };
    return (
        <div>
            {products.map((product) => (
                <div key={product._id} className="shadow p-4 d-flex">
                    <div className="col-md-6 ">
                        <img
                            className="mw-100 p-2"
                            src={product.image}
                            height="300"
                            alt={product.name}
                            style={{
                                borderRadius: "15px"
                            }}
                        />
                    </div>
                    <div className="col-md-6 ms-auto ">
                        <h5>{product.name}</h5>
                        <p>Категория: {product.category.name}</p>

                        <p>ID: {product._id}</p>
                        {/* <p>Количество: {product.quantity}</p> */}
                        <p>
                            Цена: <b>{product.price}</b>
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
