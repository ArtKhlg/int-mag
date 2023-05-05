import React from "react";
import { useProducts } from "../../hooks/useProducts";
import PropTypes from "prop-types";

const RecommendProducts = ({ categoryId }) => {
    const { products } = useProducts();
    const filteredProducts = products.filter((p) => p.category === categoryId);
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
                                >
                                    <div className="card">
                                        <div className="d-block" width="10rem">
                                            <img
                                                src={p.image}
                                                className="mw-100"
                                                width="237"
                                            />
                                            <a href={`/products/${p._id}`}>
                                                <div className="hover-overlay">
                                                    <div
                                                        className="mask"
                                                        style={{
                                                            backgroundColor:
                                                                "rgba(251, 251, 251, 0.15)"
                                                        }}
                                                    ></div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="card-body">
                                            <a
                                                href={`/products/${p._id}`}
                                                className="text-reset"
                                            >
                                                <h5 className="card-title mb-3">
                                                    {p.name}
                                                </h5>
                                            </a>
                                            {/* <a
                                                    href={`/products/${p._id}/${p.category}`}
                                                    className="text-reset"
                                                >
                                                    <p>{p.category}</p>
                                                </a> */}
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
