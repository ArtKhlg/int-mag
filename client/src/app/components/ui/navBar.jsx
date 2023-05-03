import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";
const NavBar = () => {
    const { currentUser } = useAuth();
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item border border-dark m-2">
                        <Link className="nav-link " aria-current="page" to="/">
                            Главная
                        </Link>
                    </li>
                    {currentUser && (
                        // <button className="btn btn-primary position-relative">
                        <li className="nav-item position-relative border border-dark m-2">
                            <Link
                                className="nav-link "
                                aria-current="page"
                                to="/shoppingCart"
                            >
                                <i className="bi bi-cart"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {currentUser.orders
                                        ? currentUser.orders.length
                                        : 0}
                                    <span className="visually-hidden">
                                        товары в корзине
                                    </span>
                                </span>
                            </Link>
                        </li>
                        // </button>
                    )}
                </ul>
                <div className="d-flex">
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
            </div>
        </nav>
    );
};

export default NavBar;
