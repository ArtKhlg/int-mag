import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Category from "./ui/category";
import RecommendProducts from "./ui/recommendProducts";
import { useDispatch, useSelector } from "react-redux";
import {
    getCategoriesLoadingStatus,
    getCategoryById
} from "../store/categories";
import { getProductById, getProductsLoadingStatus } from "../store/products";
import { getCurrentUserData, updateUser } from "../store/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./common/loading";

const ProductPage = ({ productId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const currentUser = useSelector(getCurrentUserData());
    const [order, setOrder] = useState(
        currentUser?.orders?.filter((o) => o._id === productId)
    );

    const isLoading = useSelector(getProductsLoadingStatus());
    const product = useSelector(getProductById(productId));

    const category = useSelector(getCategoryById(product?.category));
    const categoriesLoading = useSelector(getCategoriesLoadingStatus());
    let currentUserOrders = [...new Set(currentUser?.orders)];

    const handleClick = () => {
        history.push(`/`);
    };
    const handleClickCategory = () => {
        history.push(`/products/${productId}/${category.catNumber}`);
    };

    const handleClickDecrement = () => {
        const removeId = currentUserOrders.findIndex(
            (o) => o._id === productId
        );
        currentUserOrders.splice(removeId, 1);
        setOrder(currentUserOrders.filter((o) => o._id === productId));
        dispatch(updateUser({ ...currentUser, orders: currentUserOrders }));
    };
    const handleClickBuy = () => {
        if (!order || currentUserOrders === null) {
            setOrder([product]);
            currentUserOrders = [product];
        } else {
            setOrder((prevState) => [...prevState, product]);
            currentUserOrders.push(product);
        }

        dispatch(
            updateUser({
                ...currentUser,
                orders: currentUserOrders
            })
        );
    };

    const handleClickFavourite = () => {
        let newFavourite = currentUser?.favourite;

        if (
            currentUser?.favourite?.filter((prod) => prod._id === product._id)
                .length > 0
        ) {
            newFavourite = [...currentUser.favourite].filter(
                (prod) => prod._id !== product._id
            );
            dispatch(
                updateUser({
                    ...currentUser,
                    favourite: newFavourite
                })
            );
            toast.error("Товар удален из избранного");
        } else {
            if (!currentUser.favourite) {
                newFavourite = [product];
                toast.success("Товар добавлен в избранное");
            } else {
                newFavourite = [...currentUser.favourite, product];
                toast.success("Товар добавлен в избранное");
            }
            dispatch(
                updateUser({
                    ...currentUser,
                    favourite: newFavourite
                })
            );
        }
    };
    if (!isLoading && product && !categoriesLoading) {
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
                    {category?.name}
                </span>
                <div className="d-flex flex-wrap card m-5 bg-light flex-column contentJustify-center">
                    <div className="position-absolute end-0 p-4">
                        {currentUser !== null ? (
                            <>
                                {" "}
                                {currentUser?.favourite &&
                                currentUser?.favourite.filter(
                                    (prod) => prod._id === product._id
                                ).length > 0 ? (
                                    <i
                                        role="button"
                                        onClick={handleClickFavourite}
                                        className="pt-4 bi bi-heart-fill"
                                        style={{
                                            fontSize: "40px",
                                            color: "red"
                                        }}
                                    ></i>
                                ) : (
                                    <i
                                        role="button"
                                        onClick={handleClickFavourite}
                                        className="pt-4 bi bi-heart"
                                        style={{
                                            fontSize: "40px",
                                            color: "red"
                                        }}
                                    ></i>
                                )}
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="row g-0">
                        <div className="col m-4">
                            <img
                                src={product.image}
                                width="600"
                                className="img-fluid rounded-3"
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
                                    <Category id={category.catNumber} />
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
                            {!currentUser ? (
                                <a href="/login">Авторизуйтесь, чтобы купить</a>
                            ) : (
                                <div className="col">
                                    {product.quantity > 0 ? (
                                        !order || order.length === 0 ? (
                                            <button
                                                type="button"
                                                className="btn btn-outline-success"
                                                onClick={handleClickBuy}
                                            >
                                                <h2>Купить</h2>
                                            </button>
                                        ) : order.length < product.quantity ? (
                                            <>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={
                                                        handleClickDecrement
                                                    }
                                                >
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
                                        ) : (
                                            <div>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={
                                                        handleClickDecrement
                                                    }
                                                >
                                                    -
                                                </button>
                                                {order?.length}{" "}
                                            </div>
                                        )
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handleClickBuy}
                                            disabled
                                        >
                                            <h2>Нет в наличии</h2>
                                        </button>
                                    )}
                                    <div className="d-flex align-items-end">
                                        <p>id:{product._id}</p>
                                    </div>
                                </div>
                            )}
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
                <RecommendProducts categoryId={product.category} />
                <ToastContainer />
            </>
        );
    } else return <Loading />;
};

ProductPage.propTypes = {
    productId: PropTypes.string
};

export default ProductPage;
