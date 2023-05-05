import Modal from "./modalComponent";
import "./modal.css";
import useModal from "./useModal";
import PropTypes from "prop-types";
import React from "react";

const ModalOrder = ({ confirmButtonClick }) => {
    const { isShowing, toggle } = useModal();

    return (
        <div className="App">
            <Modal
                show={isShowing}
                onCloseButtonClick={toggle}
                confirmButtonClick={confirmButtonClick}
            />
            <button className="btn btn-dark" onClick={toggle}>
                Заказать
            </button>
        </div>
    );
};

ModalOrder.propTypes = {
    confirmButtonClick: PropTypes.func
};

export default ModalOrder;
