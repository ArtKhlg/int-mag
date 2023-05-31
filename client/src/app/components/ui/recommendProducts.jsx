import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProductsList } from "../../store/products";

const RecommendProducts = ({ categoryId }) => {
    const products = useSelector(getProductsList());
    const filteredProducts = products.filter((p) => p.category === categoryId);
    const handleClick = (target) => {
        window.scrollTo(0, 0);
        window.location.pathname = `/products/${target}`;
    };
    return (
        <>
            <section style={{ backgroundColor: "#eee" }}>
                <div className="text-center container py-5">
                    <h4 className="mt-4 mb-5">
                        <strong>Похожие товары данной категории</strong>
                    </h4>

                    <div className="row">
                        {filteredProducts.map((p) => {
                            return (
                                <div
                                    key={p._id}
                                    className="d-flex col-lg-4 col-md-12 mb-4"
                                    height="225"
                                    width="294"
                                    role="button"
                                    onClick={() => handleClick(p._id)}
                                >
                                    <div className="card">
                                        <div className="d-block" width="10rem">
                                            <img
                                                src={p.image}
                                                className="mw-100"
                                                width="237"
                                            />
                                        </div>
                                        <div className="card-body">
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
                </div>
            </section>
        </>
    );
};

RecommendProducts.propTypes = {
    categoryId: PropTypes.string
};

export default RecommendProducts;
