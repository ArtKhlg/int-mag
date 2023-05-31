import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUser } from "../store/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import history from "../utils/history";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Favourite = () => {
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();

    const handleClick = (target) => {
        history.push(`/products/${target}`);
        window.scrollTo(0, 0);
        // window.location.pathname = `/products/${target}`;
    };

    const handleClickFavourite = (productId) => {
        const newFavourite = currentUser.favourite.filter(
            (f) => f._id !== productId
        );
        dispatch(updateUser({ ...currentUser, favourite: newFavourite }));
        toast.error("Товар удален из избранного");
    };
    return (
        <>
            {" "}
            <div className="text-center container py-5">
                <div className="m-3">
                    <h2>Избранные товары</h2>
                </div>
                {currentUser.favourite && currentUser.favourite.length > 0 ? (
                    <div className="row">
                        {currentUser.favourite.map((p) => {
                            return (
                                <div
                                    key={p._id}
                                    className="d-flex col-lg-4 col-md-12 mb-4"
                                    height="225"
                                    width="294"
                                >
                                    <div className="card">
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                                            <i
                                                role="button"
                                                onClick={() =>
                                                    handleClickFavourite(p._id)
                                                }
                                                className="bi bi-heart-fill"
                                                style={{
                                                    fontSize: "25px",
                                                    color: "red"
                                                }}
                                            ></i>
                                        </span>
                                        <div
                                            className="d-block"
                                            width="10rem"
                                            role="button"
                                            onClick={() => handleClick(p._id)}
                                        >
                                            <img
                                                src={p.image}
                                                className="mw-100"
                                                width="237"
                                            />
                                        </div>
                                        <div
                                            className="card-body"
                                            role="button"
                                            onClick={() => handleClick(p._id)}
                                        >
                                            <h5 className="card-title mb-3">
                                                {p.name}
                                            </h5>

                                            <h6 className="mb-3">
                                                {p.price} руб.
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}{" "}
                    </div>
                ) : (
                    <div>
                        Тут еще нет товаров!{" "}
                        <Link to="/">Вернитесь в магазин</Link> и добавьте
                        понравившиеся товары в данный раздел
                    </div>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default Favourite;
