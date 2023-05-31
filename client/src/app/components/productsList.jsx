import React, { useState } from "react";
import PropTypes from "prop-types";
import Category from "./ui/category";
import history from "../utils/history";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUser } from "../store/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "./ui/rating";

const ProductsList = ({ products }) => {
    const handleClick = (productId) => {
        history.push(`/products/${productId}`);
        window.scrollTo(0, 0);
    };
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
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
    let newFavourite = currentUser?.favourite;
    const handleClickFavourite = (product) => {
        if (!newFavourite || newFavourite === null) {
            newFavourite = [product];

            dispatch(updateUser({ ...currentUser, favourite: newFavourite }));
            toast.success("Товар добавлен в избранное");
            return newFavourite;
        } else {
            if (
                newFavourite.filter((prod) => prod._id === product._id).length >
                0
            ) {
                newFavourite = [...newFavourite].filter(
                    (prod) => prod._id !== product._id
                );

                dispatch(
                    updateUser({ ...currentUser, favourite: newFavourite })
                );
                toast.error("Товар удален из избранного");
                return newFavourite;
            } else {
                newFavourite = [...newFavourite, product];

                dispatch(
                    updateUser({ ...currentUser, favourite: newFavourite })
                );

                toast.success("Товар добавлен в избранное");
                return newFavourite;
            }
        }
    };

    return (
        <div>
            <button
                onClick={sortByPrice}
                className="btn btn-secondary btn-sm m-2"
            >
                Сортировать по цене{" "}
                {sortType ? (
                    <i className="bi bi-sort-up"></i>
                ) : (
                    <i className="bi bi-sort-down"></i>
                )}
            </button>
            <div className="row">
                {sortProducts.map((product) => (
                    <div
                        key={product._id}
                        className="row col-lg-5 col-md-12 m-4 mb-2"
                        style={{
                            backgroundColor: "white",
                            borderRadius: "15px",
                            width: "430px"
                        }}
                    >
                        <div className="col-lg-7 col-xl-6 mt-2 ">
                            <img
                                className="img-fluid rounded-3"
                                src={product.image}
                                height="200"
                                alt={product.name}
                                type="button"
                                onClick={() => handleClick(product._id)}
                            />
                            <div className="row mt-2">
                                <div className="col">
                                    {currentUser ? (
                                        <>
                                            {newFavourite &&
                                            newFavourite?.filter(
                                                (prod) =>
                                                    prod._id === product._id
                                            ).length > 0 ? (
                                                <i
                                                    role="button"
                                                    onClick={() =>
                                                        handleClickFavourite(
                                                            product
                                                        )
                                                    }
                                                    className="bi bi-heart-fill"
                                                    style={{
                                                        fontSize: "25px",
                                                        color: "red"
                                                    }}
                                                ></i>
                                            ) : (
                                                <i
                                                    role="button"
                                                    onClick={() =>
                                                        handleClickFavourite(
                                                            product
                                                        )
                                                    }
                                                    className="bi bi-heart"
                                                    style={{
                                                        fontSize: "25px",
                                                        color: "red"
                                                    }}
                                                ></i>
                                            )}
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col-xl-7 mt-2">
                                    <Rating productRating={product.rate} />
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-7 col-xl-6 mt-2 "
                            type="button"
                            onClick={() => handleClick(product._id)}
                        >
                            <h5>{product.name}</h5>
                            <Category id={product.category} />
                            {/* <p>ID: {product._id}</p> */}
                            <p>
                                Цена: <b>{product.price.toLocaleString()}</b>{" "}
                                рублей
                            </p>
                            {product.quantity > 0 ? (
                                <p>Количество: {product.quantity}</p>
                            ) : (
                                <p>нет в наличии</p>
                            )}
                            {/* <div className="col-md-6 ms-auto pb-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-info"
                                    onClick={() => handleClick(product._id)}
                                >
                                    Карточка товара
                                </button>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

ProductsList.propTypes = {
    products: PropTypes.array
};

export default ProductsList;
