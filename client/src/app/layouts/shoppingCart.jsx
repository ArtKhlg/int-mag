import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router-dom";

const ShoppingCart = () => {
    const history = useHistory();
    const { currentUser, updateUserData } = useAuth();
    const findUniqOrders = () => {
        if (currentUser.orders) {
            currentUser.orders.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
            const arrIds = [];
            for (const prod of currentUser.orders) {
                arrIds.push(prod._id);
            }
            const arrIdsUniq = [...new Set(arrIds)];
            for (let i = 0; i < currentUser.orders.length; i++) {
                for (let j = 0; j < arrIdsUniq.length; j++) {
                    if (currentUser.orders[i]._id === arrIdsUniq[j]) {
                        arrIdsUniq[j] = currentUser.orders[i];
                    }
                }
            }
            return arrIdsUniq;
        } else {
            return null;
        }
    };
    const summaryPrice = currentUser?.orders
        ?.reduce((acc, ord) => acc + ord.price, 0)
        .toLocaleString();
    const uniqueProducts = findUniqOrders();

    const handleClickRemoveItem = (item) => {
        const newOrders = [];
        for (const prod of currentUser?.orders) {
            if (prod._id !== item._id) {
                newOrders.push(prod);
            }
        }
        currentUser.orders = newOrders;
        updateUserData({ ...currentUser });
    };

    const handleClickProductPage = (item) => {
        history.push(`/products/${item._id}`);
    };

    const renderPhrase = (number) => {
        return number === 1
            ? number + " товар"
            : number > 1 && number < 5
            ? number + " товара"
            : number + " товаров";
    };

    const handleClickDecrement = async (item) => {
        try {
            const removeId = currentUser.orders.findIndex(
                (o) => o._id === item._id
            );
            currentUser.orders.splice(removeId, 1);
            await updateUserData({ ...currentUser });
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickIncrement = async (item) => {
        try {
            currentUser.orders.push(item);
            await updateUserData({ ...currentUser });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            (
            {currentUser.orders ? (
                <>
                    <section
                        className="h-100 h-custom"
                        style={{ backgroundColor: "#d2c9ff" }}
                    >
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12">
                                    <div
                                        className="card card-registration card-registration-2"
                                        style={{ borderRadius: "15px" }}
                                    >
                                        <div className="card-body p-0">
                                            <div className="row g-0">
                                                <div className="col-lg-8">
                                                    <div className="p-5">
                                                        <div className="d-flex justify-content-between align-items-center mb-5">
                                                            <h1 className="fw-bold mb-0 text-black">
                                                                Корзина
                                                            </h1>
                                                            <h6 className="mb-0 text-muted">
                                                                {renderPhrase(
                                                                    currentUser
                                                                        .orders
                                                                        .length
                                                                )}{" "}
                                                            </h6>
                                                        </div>
                                                        <hr className="my-4" />

                                                        {uniqueProducts.map(
                                                            (o) => (
                                                                <div
                                                                    key={o._id}
                                                                    className="row mb-4 d-flex justify-content-between align-items-center"
                                                                >
                                                                    <div className="col-md-2 col-lg-2 col-xl-3  ">
                                                                        <img
                                                                            src={
                                                                                o.image
                                                                            }
                                                                            className="img-fluid rounded-3"
                                                                            alt={
                                                                                o.name
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-3 col-lg-3 col-xl-2">
                                                                        <h6
                                                                            className="text-black mb-0"
                                                                            role="button"
                                                                            onClick={() =>
                                                                                handleClickProductPage(
                                                                                    o
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                o.name
                                                                            }
                                                                        </h6>
                                                                    </div>
                                                                    <div className="col-md-3 col-lg-3 col-xl-1 d-flex">
                                                                        <button
                                                                            className="btn btn-light"
                                                                            onClick={() =>
                                                                                handleClickDecrement(
                                                                                    o
                                                                                )
                                                                            }
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <div className="badge bg-info">
                                                                            <span className="align-center">
                                                                                {" "}
                                                                                {
                                                                                    currentUser.orders.filter(
                                                                                        (
                                                                                            ord
                                                                                        ) =>
                                                                                            ord._id ===
                                                                                            o._id
                                                                                    )
                                                                                        .length
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <button
                                                                            className="btn btn-light"
                                                                            onClick={() =>
                                                                                handleClickIncrement(
                                                                                    o
                                                                                )
                                                                            }
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-md-4 col-lg-2 col-xl-3 offset-lg-1">
                                                                        <h6 className="mb-0">
                                                                            {o.price.toLocaleString()}
                                                                            {
                                                                                "руб "
                                                                            }
                                                                            за 1
                                                                            шт.
                                                                        </h6>
                                                                        <p className="fs-6">
                                                                            {
                                                                                " Итог: "
                                                                            }
                                                                            {(
                                                                                o.price *
                                                                                currentUser.orders.filter(
                                                                                    (
                                                                                        ord
                                                                                    ) =>
                                                                                        ord._id ===
                                                                                        o._id
                                                                                )
                                                                                    .length
                                                                            ).toLocaleString()}
                                                                            {
                                                                                "руб "
                                                                            }
                                                                            за
                                                                            все
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleClickRemoveItem(
                                                                                    o
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="bi bi-x-lg"></i>
                                                                        </button>
                                                                    </div>{" "}
                                                                    <hr className="my-4" />
                                                                </div>
                                                            )
                                                        )}

                                                        <div className="pt-5">
                                                            <h6 className="mb-0">
                                                                <a
                                                                    href="/"
                                                                    className="text-body"
                                                                >
                                                                    <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                                    Назад в
                                                                    магазин
                                                                </a>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 bg-grey">
                                                    <div className="p-5">
                                                        <h3 className="fw-bold mb-5 mt-2 pt-1">
                                                            Итого
                                                        </h3>
                                                        <hr className="my-4" />

                                                        <div className="d-flex flex-column justify-content-between mb-4">
                                                            <h5 className="text-uppercase">
                                                                {renderPhrase(
                                                                    currentUser
                                                                        .orders
                                                                        .length
                                                                )}{" "}
                                                            </h5>
                                                            <div>
                                                                <h5>
                                                                    {
                                                                        summaryPrice
                                                                    }{" "}
                                                                    рублей
                                                                </h5>
                                                            </div>
                                                        </div>

                                                        <hr className="my-4" />

                                                        <button
                                                            type="button"
                                                            className="btn btn-dark btn-block btn-lg"
                                                            data-mdb-ripple-color="dark"
                                                        >
                                                            Заказать
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <section
                    className="h-100 h-custom"
                    style={{ backgroundColor: "#d2c9ff" }}
                >
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12">
                                <div
                                    className="card card-registration card-registration-2"
                                    style={{ borderRadius: "15px" }}
                                >
                                    <div className="card-body p-0">
                                        <div className="row g-0">
                                            <div className="col-lg-8">
                                                <div className="p-5">
                                                    <div className="d-flex justify-content-between align-items-center mb-5">
                                                        <h1 className="fw-bold mb-0 text-black">
                                                            Корзина
                                                        </h1>
                                                        <h6 className="mb-0 text-muted">
                                                            Тут пока пусто
                                                        </h6>
                                                        <div className="pt-5">
                                                            <h6 className="mb-0">
                                                                <a
                                                                    href="/"
                                                                    className="text-body"
                                                                >
                                                                    <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                                    Назад в
                                                                    магазин
                                                                </a>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <hr className="my-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            );
        </>
    );
};
export default ShoppingCart;
