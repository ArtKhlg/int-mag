import React, { useState, useRef } from "react";
import Chevron from "./chevron";
import PropTypes from "prop-types";

import "./Accordion.css";

function Accordion({ purch }) {
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion__icon");

    const content = useRef(null);

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
                                className="row mb-4 d-flex justify-content-between align-items-center"
                            >
                                <div className="col-md-2 col-lg-2 col-xl-3  ">
                                    <img
                                        src={p.image}
                                        className="img-fluid rounded-3"
                                        alt={p.name}
                                    />
                                </div>
                                <div className="col-md-3 col-lg-3 col-xl-2">
                                    <h6
                                        className="text-black mb-0"
                                        // role="button"
                                        // onClick={() =>
                                        //     handleClickProductPage(
                                        //         o
                                        //     )
                                        // }
                                    >
                                        {p.name}
                                    </h6>
                                </div>
                                <div className="col-md-3 col-lg-3 col-xl-1 d-flex">
                                    <div className="badge bg-info">
                                        <span className="fs-5">
                                            {" "}
                                            {p.quantity}шт.
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 col-xl-3 offset-lg-1">
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
