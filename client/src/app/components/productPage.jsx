import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import Category from "./ui/category";
import { useAuth } from "../hooks/useAuth";

const ProductPage = ({ productId }) => {
    const { currentUser, updateUserData } = useAuth();
    const { products } = useProducts();
    const history = useHistory();
    const [product, setProduct] = useState();
    useEffect(() => {
        setProduct(getProduct(productId));
    }, [products]);
    const [order, setOrder] = useState(
        currentUser?.orders?.filter((o) => o._id === productId || [])
    );
    console.log("order", order);
    const { isLoading, getProduct } = useProducts();
    const { getCategory } = useCategories();

    const category = getCategory(product?.category);

    const handleClick = () => {
        history.push(`/products`);
    };
    const handleClickCategory = () => {
        history.push(`/products/${productId}/${category._id}`);
    };
    const handleClickBuy = async () => {
        try {
            if (!order) {
                setOrder([product]);
                currentUser.orders = [product];
            } else {
                setOrder((prevState) => [...prevState, product]);

                currentUser.orders.push(product);
            }

            await updateUserData({ ...currentUser });

            console.log(currentUser);
        } catch (error) {
            console.log(error);
        }
    };
    if (!isLoading && product) {
        return (
            <>
                <span
                    role="button"
                    className="text-decoration-underline fst-italic"
                    onClick={handleClick}
                >
                    Товары
                </span>
                /
                <span
                    role="button"
                    className="text-decoration-underline fst-italic"
                    onClick={handleClickCategory}
                >
                    {category.name}
                </span>
                <div className="d-flex flex-wrap card mb-3 bg-light">
                    <div className="row g-0">
                        <div className="col">
                            <img
                                src={product.image}
                                width="600"
                                alt={product.name}
                                style={{
                                    borderRadius: "10px"
                                }}
                            />
                        </div>
                        <div className="col d-flex flex-wrap ">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <p>{product.name}</p>
                                </h5>

                                <h6 className="card-text">
                                    <Category id={productId} />
                                </h6>

                                <h6 className="card-text">
                                    <p>
                                        Количество в наличии: {product.quantity}
                                    </p>
                                </h6>

                                <h6 className="card-text">
                                    <p>Цена (за шт.): {product.price}</p>
                                </h6>
                                <h6 className="card-text">
                                    <p>{product.desc}</p>
                                </h6>
                            </div>
                            <div className="col">
                                {!order || order.length === 0 ? (
                                    <button
                                        type="button"
                                        className="btn btn-outline-success"
                                        onClick={handleClickBuy}
                                    >
                                        <h2>Купить</h2>
                                    </button>
                                ) : (
                                    <>
                                        <button className="btn btn-danger">
                                            -
                                        </button>
                                        {order?.length}{" "}
                                        <button
                                            className="btn btn-success"
                                            onClick={handleClickBuy}
                                        >
                                            +
                                        </button>
                                    </>
                                )}
                                <div className="d-flex align-items-end">
                                    <p>id:{product._id}</p>
                                </div>
                            </div>
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
    } else return "loading...";
};

ProductPage.propTypes = {
    productId: PropTypes.string
};

export default ProductPage;
