import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import EditUserPage from "./editUserPage";
import { useAuth } from "../../hooks/useAuth";
import PurchaseHistoryCard from "./purchaseHistoryCard/purchaseHistoryCard";
// import { useSelector } from "react-redux";
// import { getCurrentUserId } from "../../store/users";

const PersonalPage = () => {
    const params = useParams();
    const { edit } = params;
    const history = useHistory();
    // const currentUserId = useSelector(getCurrentUserId());
    const { currentUser } = useAuth();
    // const currentUserId = currentUser._id;

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    return (
        <>
            {edit ? (
                <EditUserPage />
            ) : (
                <>
                    <div className="card mb-3">
                        <div className="card-body">
                            <button
                                className="position-absolute top-0 end-0 btn btn-light btn-sm"
                                onClick={handleClick}
                            >
                                <i className="bi bi-gear"></i>
                            </button>

                            <div className="d-flex flex-column align-items-center text-center position-relative">
                                <img
                                    src={currentUser.image}
                                    className="rounded-circle"
                                    width="150"
                                />
                                <div className="mt-3">
                                    <h4>{currentUser.name}</h4>
                                    <p className="text-secondary mb-1">
                                        Ваш email: {currentUser.email}
                                    </p>
                                    <p className="text-secondary mb-1">
                                        Количество заказов:{" "}
                                        {currentUser.purchaseHistory
                                            ? currentUser.purchaseHistory.length
                                            : 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {currentUser.purchaseHistory ? (
                        <div className="card mb-3">
                            <div className="card-body">
                                <PurchaseHistoryCard />
                            </div>
                        </div>
                    ) : null}
                </>
            )}
        </>
    );
};
PersonalPage.propTypes = {
    user: PropTypes.object
};

export default PersonalPage;
