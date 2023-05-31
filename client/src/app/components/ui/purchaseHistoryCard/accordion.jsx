import React, { useState, useRef, useEffect } from "react";
import Chevron from "./chevron";
import PropTypes from "prop-types";
import "./Accordion.css";
import history from "../../../utils/history";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductById,
    getProductsList,
    updateProduct
} from "../../../store/products";
import { getCurrentUserData } from "../../../store/users";

function Accordion({ purch }) {
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion__icon");
    const content = useRef(null);
    const [rateStars, setRateStars] = useState([]);
    const [rate, setRate] = useState([]);
    const [product, setProduct] = useState({});
    const [hover, setHover] = useState(false);
    const [currentProductInPurchase, setCurrentProductInPurchase] = useState();
    const productFromBase = useSelector(getProductById(product?._id));
    const currentUser = useSelector(getCurrentUserData());
    const productsList = useSelector(getProductsList());
    const dispatch = useDispatch();
    const rateCounter = [];

    for (let i = 1; i <= 5; i++) {
        rateCounter.push({
            rating: i,
            star: (
                <i
                    className="bi bi-star-fill"
                    style={{
                        fontSize: hover ? "22px" : "20px",
                        color: hover ? "#ffd800" : "#f2f1f0"
                    }}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                ></i>
            )
        });
    }

    useEffect(() => {
        setRateStars(rateCounter);
    }, []);

    function toggleAccordion() {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(
            setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
        );
        setRotateState(
            setActive === "active"
                ? "accordion__icon"
                : "accordion__icon rotate"
        );
    }
    const parseDate = new Date(purch.created_at);
    const handleClickProductPage = (product) => {
        window.scrollTo(0, 0);
        history.push(`/products/${product._id}`);
    };
    const handleClickRating = (rating, product) => {
        const rateCounter = [];
        for (let i = 1; i <= rating; i++) {
            rateCounter.push({
                rating: i,
                star: (
                    <i
                        className="bi bi-star-fill"
                        style={{ color: "#ffd800", fontSize: "20px" }}
                    >
                        {""}
                    </i>
                )
            });
        }
        for (let i = rating + 1; i <= 5; i++) {
            rateCounter.push({
                rating: i,
                star: (
                    <i
                        className="bi bi-star-fill"
                        style={{ color: "#f2f1f0", fontSize: "20px" }}
                    >
                        {""}
                    </i>
                )
            });
        }
        setRate(rating);
        setProduct(product);
        setCurrentProductInPurchase({
            ...currentUser.purchaseHistory
                .filter((p) => p._id === purch._id)[0]
                .purchase.filter((prod) => prod._id === product?._id)[0],
            rateStars: rateCounter
        });
    };

    const handleClickRate = (product) => {
        let productRate = productFromBase?.rate;
        if (!productRate) {
            productRate = [
                {
                    _id: currentUser._id,
                    rate: rate
                }
            ];
            dispatch(
                updateProduct({
                    ...product,
                    quantity: productFromBase.quantity,
                    rate: productRate
                })
            );
        } else {
            productRate = [
                ...productRate,
                {
                    _id: currentUser._id,
                    rate: rate
                }
            ];
            dispatch(
                updateProduct({
                    ...product,

                    quantity: productFromBase.quantity,
                    rate: productRate
                })
            );
        }
        window.location.pathname = `/personal`;
    };

    function getProductRating(p) {
        const productRating = productsList
            .filter((prod) => prod._id === p._id)[0]
            .rate.filter((r) => r._id === currentUser._id)[0].rate;
        const prodRate = [];
        for (let i = 1; i <= productRating; i++) {
            prodRate.push({
                rating: i,
                star: (
                    <i
                        className="bi bi-star-fill"
                        style={{ color: "#ffd800", fontSize: "20px" }}
                    >
                        {""}
                    </i>
                )
            });
        }
        for (let i = productRating + 1; i <= 5; i++) {
            prodRate.push({
                rating: i,
                star: (
                    <i
                        className="bi bi-star-fill"
                        style={{ color: "#f2f1f0", fontSize: "20px" }}
                    >
                        {""}
                    </i>
                )
            });
        }
        return (
            <>
                {prodRate.map((r) => (
                    <span key={r.rating}>{r.star}</span>
                ))}
            </>
        );
    }

    function handleMouseEnter(i) {
        setHover(true);
        const rateCounter = [];
        for (let j = 1; j <= 5; j++) {
            if (i === j) {
                rateCounter.push({
                    rating: j,
                    star: (
                        <i
                            className="bi bi-star-fill"
                            style={{
                                fontSize: "22px",
                                color: "#ffd800"
                            }}
                            onMouseEnter={() => handleMouseEnter(j)}
                            onMouseLeave={() => handleMouseLeave(j)}
                        ></i>
                    )
                });
            } else {
                rateCounter.push({
                    rating: j,
                    star: (
                        <i
                            className="bi bi-star-fill"
                            style={{
                                fontSize: "20px",
                                color: "#f2f1f0"
                            }}
                            onMouseEnter={() => handleMouseEnter(j)}
                            onMouseLeave={() => handleMouseLeave(j)}
                        ></i>
                    )
                });
            }
        }
        setRateStars(rateCounter);
    }

    function handleMouseLeave(i) {
        setHover(false);
        const rateCounter = [];
        for (let j = 1; j <= 5; j++) {
            rateCounter.push({
                rating: j,
                star: (
                    <i
                        className="bi bi-star-fill"
                        style={{
                            fontSize: hover ? "22px" : "20px",
                            color: hover ? "#ffd800" : "#f2f1f0"
                        }}
                        onMouseEnter={() => handleMouseEnter(j)}
                        onMouseLeave={() => handleMouseLeave(j)}
                    ></i>
                )
            });
        }

        setRateStars(rateCounter);
    }

    return (
        <div className="accordion__section">
            <button
                className={`accordion ${setActive}`}
                onClick={toggleAccordion}
            >
                <p className="accordion__title">Заказ {parseDate.toString()}</p>
                <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
            </button>
            <div
                ref={content}
                style={{ maxHeight: `${setHeight}` }}
                className="accordion__content"
            >
                <div className="accordion__text">
                    {purch.purchase.map((p) => {
                        return (
                            <div
                                key={p._id}
                                className="row container mb-4 d-flex justify-content-between align-items-center"
                            >
                                <div className="col">
                                    <img
                                        src={p.image}
                                        className="img-fluid rounded-3"
                                        alt={p.name}
                                        role="button"
                                        onClick={() =>
                                            handleClickProductPage(p)
                                        }
                                    />
                                </div>
                                <div className="col">
                                    <h6 className="text-black mb-0">
                                        {p.name}
                                    </h6>
                                </div>
                                <div className="col">
                                    <div className="badge bg-info">
                                        <span className="fs-5">
                                            {" "}
                                            {p.quantity}шт.
                                        </span>
                                    </div>
                                </div>
                                <div className="col">
                                    <h6 className="mb-0">
                                        {p.price.toLocaleString()}
                                        {"руб "}
                                        за 1 шт.
                                    </h6>
                                    <p className="fs-6">
                                        {" Итог: "}
                                        {(
                                            p.price * p.quantity
                                        ).toLocaleString()}
                                        {"руб "}
                                        за все
                                    </p>
                                </div>
                                <div className="col">
                                    {useSelector(
                                        getProductById(p._id)
                                    )?.rate?.filter(
                                        (r) => r._id === currentUser._id
                                    ).length > 0 ? (
                                        getProductRating(p)
                                    ) : (
                                        <>
                                            {rate > 0 ? (
                                                <>
                                                    {currentProductInPurchase._id ===
                                                        p._id &&
                                                        currentProductInPurchase.rateStars.map(
                                                            (r) => (
                                                                <span
                                                                    key={
                                                                        r.rating
                                                                    }
                                                                    role="button"
                                                                    onClick={() =>
                                                                        handleClickRating(
                                                                            r.rating,
                                                                            p
                                                                        )
                                                                    }
                                                                >
                                                                    {r.star}
                                                                </span>
                                                            )
                                                        )}
                                                    {currentProductInPurchase._id ===
                                                        p._id && (
                                                        <button
                                                            className="btn btn-info"
                                                            onClick={() =>
                                                                handleClickRate(
                                                                    p
                                                                )
                                                            }
                                                        >
                                                            Оценить товар
                                                        </button>
                                                    )}
                                                </>
                                            ) : (
                                                currentProductInPurchase?._id ===
                                                    p._id || (
                                                    <div className="col">
                                                        {rateStars.map((r) => (
                                                            <span
                                                                key={r.rating}
                                                                role="button"
                                                                onClick={() =>
                                                                    handleClickRating(
                                                                        r.rating,
                                                                        p
                                                                    )
                                                                }
                                                            >
                                                                {r.star}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

Accordion.propTypes = {
    purch: PropTypes.object
    // content: PropTypes.oneOfType([
    //     PropTypes.arrayOf(PropTypes.node),
    //     PropTypes.node
    // ])
};

export default Accordion;
