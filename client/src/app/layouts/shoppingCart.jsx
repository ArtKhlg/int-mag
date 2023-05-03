import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router-dom";

const ShoppingCart = () => {
    const history = useHistory();
    const { currentUser, updateUserData } = useAuth();

    console.log("currentUser", currentUser);
    const findUniqOrders = () => {
        if (currentUser.orders) {
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
    const price = currentUser?.orders?.reduce((acc, ord) => acc + ord.price, 0);
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
    console.log("currentUser.orders", currentUser.orders);
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
                                                                {
                                                                    currentUser
                                                                        .orders
                                                                        .length
                                                                }{" "}
                                                                товаров
                                                            </h6>
                                                        </div>
                                                        <hr className="my-4" />

                                                        {uniqueProducts.map(
                                                            (o) => (
                                                                <div
                                                                    key={o._id}
                                                                    className="row mb-4 d-flex justify-content-between align-items-center"
                                                                >
                                                                    <div className="col-md-2 col-lg-2 col-xl-2">
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
                                                                    <div className="col-md-3 col-lg-3 col-xl-3">
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
                                                                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                                        <button className="btn btn-light">
                                                                            -
                                                                        </button>
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
                                                                        <button className="btn btn-light">
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                        <h6 className="mb-0">
                                                                            {
                                                                                o.price
                                                                            }
                                                                        </h6>
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

                                                        <div className="d-flex justify-content-between mb-4">
                                                            <h5 className="text-uppercase">
                                                                {
                                                                    currentUser
                                                                        .orders
                                                                        .length
                                                                }{" "}
                                                                товаров
                                                            </h5>
                                                            <h5>
                                                                {price} рублей
                                                            </h5>
                                                        </div>

                                                        {/* <h5 className="text-uppercase mb-3">
                                                    Shipping
                                                </h5>

                                                <div className="mb-4 pb-2">
                                                    <select className="select">
                                                        <option value="1">
                                                            Standard-Delivery-
                                                            €5.00
                                                        </option>
                                                        <option value="2">
                                                            Two
                                                        </option>
                                                        <option value="3">
                                                            Three
                                                        </option>
                                                        <option value="4">
                                                            Four
                                                        </option>
                                                    </select>
                                                </div>

                                                <h5 className="text-uppercase mb-3">
                                                    Give code
                                                </h5>

                                                <div className="mb-5">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            id="form3Examplea2"
                                                            className="form-control form-control-lg"
                                                        />
                                                        <label
                                                            className="form-label"
                                                            htmlFor="form3Examplea2"
                                                        >
                                                            Enter your code
                                                        </label>
                                                    </div>
                                                </div> */}

                                                        <hr className="my-4" />

                                                        {/* <div className="d-flex justify-content-between mb-5">
                                                    <h5 className="text-uppercase">
                                                        Ито
                                                    </h5>
                                                    <h5>€ 137.00</h5>
                                                </div> */}

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
