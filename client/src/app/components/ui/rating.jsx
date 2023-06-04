import React from "react";
import PropTypes from "prop-types";

const Rating = ({ productRating }) => {
    const maxRating = 5;

    const rate = [];
    if (!Array.isArray(productRating) || productRating.length === 0) {
        productRating = [{ rate: 0 }];
    }

    const productRatingCounter = (productRatingArray) => {
        const sum = productRatingArray.reduce(
            (acc, number) => acc + number.rate,
            0
        );
        const length = productRatingArray.length;
        return Math.round(sum / length);
    };

    const productRatingRound = productRatingCounter(productRating);

    for (let i = 1; i <= productRatingRound; i++) {
        rate.push({
            rating: i,
            star: (
                <i className="bi bi-star-fill" style={{ color: "#ffd800" }}>
                    {""}
                </i>
            )
        });
    }
    for (let i = productRatingRound + 1; i <= maxRating; i++) {
        rate.push({
            rating: i,
            star: (
                <i className="bi bi-star-fill" style={{ color: "#f2f1f0" }}>
                    {""}
                </i>
            )
        });
    }

    return (
        <>
            {rate.map((r) => (
                <span key={r.rating}>{r.star}</span>
            ))}
        </>
    );
};

Rating.propTypes = {
    productRating: PropTypes.array
};

export default Rating;
