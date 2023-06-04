import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Category from "./ui/category";
import history from "../utils/history";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUser } from "../store/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "./ui/rating";
import SortProducts from "./common/sort";

const ProductsList = ({ products }) => {
    const [typeOfView, setTypeOfView] = useState(true);
    const handleClick = (productId) => {
        history.push(`/products/${productId}`);
        window.scrollTo(0, 0);
    };
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const [sortProducts, setSortProducts] = useState(products);
    useEffect(() => {
        setSortProducts(products);
    }, [products]);
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
            <SortProducts
                sortParam="price"
                buttonValue="Сортировать по цене"
                sortProducts={sortProducts}
                setSortProducts={setSortProducts}
            />
            <SortProducts
                sortParam="rate"
                buttonValue="Сортировать по рейтингу"
                sortProducts={sortProducts}
                setSortProducts={setSortProducts}
            />

            <i
                className="bi bi-list justify-content-right m-2"
                role="button"
                onClick={() => {
                    if (typeOfView) {
                        setTypeOfView(false);
                    }
                }}
            ></i>

            <i
                className="bi bi-grid-3x3-gap justify-content-right m-2"
                role="button"
                onClick={() => {
                    if (!typeOfView) {
                        setTypeOfView(true);
                    }
                }}
            ></i>

            {typeOfView ? (
                <div className="row justify-content-around">
                    {sortProducts.map((product) => (
                        <div
                            key={product._id}
                            className="col m-4 mb-2 "
                            style={{
                                backgroundColor: "white",
                                borderRadius: "15px"
                            }}
                        >
                            <div className="row row-col-2  justify-content-around">
                                <div className="col mt-2 ">
                                    <img
                                        className="img-fluid rounded-3"
                                        src={product.image}
                                        height="150"
                                        alt={product.name}
                                        type="button"
                                        onClick={() => handleClick(product._id)}
                                    />
                                    <div
                                        className="row row-col-2 justify-content-around"
                                        style={{ minWidth: "180px" }}
                                    >
                                        <div className="col">
                                            {currentUser ? (
                                                <>
                                                    {newFavourite &&
                                                    newFavourite?.filter(
                                                        (prod) =>
                                                            prod._id ===
                                                            product._id
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
                                                                fontSize:
                                                                    "25px",
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
                                                                fontSize:
                                                                    "25px",
                                                                color: "red"
                                                            }}
                                                        ></i>
                                                    )}
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col-8">
                                            <Rating
                                                productRating={product.rate}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col mt-2 "
                                    type="button"
                                    onClick={() => handleClick(product._id)}
                                >
                                    <h5>{product.name}</h5>
                                    <Category id={product.category} />
                                    <p>
                                        Цена:{" "}
                                        <b>{product.price.toLocaleString()}</b>{" "}
                                        рублей
                                    </p>
                                    {product.quantity > 0 ? (
                                        <p>Количество: {product.quantity}</p>
                                    ) : (
                                        <p>нет в наличии</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="container mt-5 mb-5">
                    <div className="d-flex row">
                        <div className="col">
                            {sortProducts.map((product) => (
                                <div
                                    className="row row-col-4 p-2 bg-white border rounded m-2"
                                    key={product._id}
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: "15px"
                                    }}
                                >
                                    <div className="col">
                                        <img
                                            className="img-fluid img-responsive rounded product-image"
                                            src={product.image}
                                            alt={product.name}
                                            role="button"
                                            onClick={() =>
                                                handleClick(product._id)
                                            }
                                            width="100%"
                                        />
                                    </div>
                                    <div className="col">
                                        <div>
                                            <h5>{product.name}</h5>
                                            <Category id={product.category} />
                                            <div className="d-flex col">
                                                <Rating
                                                    productRating={product.rate}
                                                />
                                                <hr />{" "}
                                            </div>
                                            <p className="text-justify text-wrap text-truncate">
                                                {product.desc.slice(0, 60)}
                                                ...
                                                <br />
                                                <br />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="align-items-center align-content-center col border-left mt-1">
                                            <div className="d-flex flex-row align-items-center">
                                                <h4 className="mr-1">
                                                    <b>
                                                        {product.price.toLocaleString()}
                                                    </b>{" "}
                                                    рублей
                                                </h4>
                                            </div>
                                            <h6 className="text-success">
                                                В наличии: {product.quantity}{" "}
                                                шт.
                                            </h6>
                                            <div className="d-flex flex-column mt-4">
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    type="button"
                                                    onClick={() =>
                                                        handleClick(product._id)
                                                    }
                                                >
                                                    Подробнее
                                                </button>
                                                {currentUser ? (
                                                    <>
                                                        {newFavourite &&
                                                        newFavourite?.filter(
                                                            (prod) =>
                                                                prod._id ===
                                                                product._id
                                                        ).length > 0 ? (
                                                            <button
                                                                className="btn btn-light mt-3"
                                                                onClick={() =>
                                                                    handleClickFavourite(
                                                                        product
                                                                    )
                                                                }
                                                            >
                                                                <i
                                                                    className="bi bi-heart-fill"
                                                                    style={{
                                                                        fontSize:
                                                                            "15px",
                                                                        color: "red"
                                                                    }}
                                                                >
                                                                    {" "}
                                                                </i>
                                                                Удалить из
                                                                избранного
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="btn btn-light mt-3"
                                                                onClick={() =>
                                                                    handleClickFavourite(
                                                                        product
                                                                    )
                                                                }
                                                            >
                                                                <i
                                                                    className="bi bi-heart"
                                                                    style={{
                                                                        fontSize:
                                                                            "15px",
                                                                        color: "red"
                                                                    }}
                                                                ></i>{" "}
                                                                В избранное
                                                            </button>
                                                        )}
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

ProductsList.propTypes = {
    products: PropTypes.array
};

export default ProductsList;
