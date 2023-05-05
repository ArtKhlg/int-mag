import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";
import useMockData from "../../utils/mockData";

const NavBar = () => {
    const { currentUser } = useAuth();
    const { initialize } = useMockData();

    const handleClick = () => {
        initialize();
    };
    return (
        <>
            <nav className="navbar bg-light mb-3">
                <div className="container-fluid">
                    <ul className="nav">
                        <li className="nav-item border border-dark m-2">
                            <Link
                                className="nav-link "
                                aria-current="page"
                                to="/"
                            >
                                Главная
                            </Link>
                        </li>
                        {currentUser && (
                            <li className="nav-item position-relative border border-dark m-2">
                                <Link
                                    className="nav-link "
                                    aria-current="page"
                                    to="/shoppingCart"
                                >
                                    <i className="bi bi-cart"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {currentUser.orders &&
                                        currentUser.orders.length > 0
                                            ? currentUser.orders.length
                                            : 0}
                                        <span className="visually-hidden">
                                            товары в корзине
                                        </span>
                                    </span>
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        {currentUser && currentUser.admin ? (
                            <>
                                <Link
                                    className="btn d-flex align-items-center"
                                    aria-current="page"
                                    to="/admin"
                                >
                                    Администраторская
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleClick}
                                >
                                    Подгрузить исходные товары
                                </button>{" "}
                            </>
                        ) : null}
                        {currentUser ? (
                            <NavProfile />
                        ) : (
                            <Link
                                className="nav-link border border-dark m-2"
                                aria-current="page"
                                to="/login"
                            >
                                Авторизация / Регистрация
                            </Link>
                        )}
                    </div>
                </div>{" "}
            </nav>
        </>
    );
};

export default NavBar;
