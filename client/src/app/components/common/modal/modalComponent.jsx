import React from "react";
import "./modal.css";
import PropTypes from "prop-types";

const Modal = ({ active, setActive, children }) => {
    return (
        <div
            className={active ? "modal active" : "modal"}
            onClick={() => setActive(false)}
            // style={active ? { opacity: 1 } : { opacity: 0 }}
        >
            <div
                className={active ? "modal__content active" : "modal__content"}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    active: PropTypes.bool,
    setActive: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default Modal;
