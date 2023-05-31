import React from "react";
import Accordion from "./accordion";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../../store/users";

const PurchaseHistoryCard = () => {
    const currentUser = useSelector(getCurrentUserData());

    return (
        <>
            {currentUser.purchaseHistory.map((purch) => {
                return (
                    <div key={purch._id}>
                        <Accordion purch={purch} />
                    </div>
                );
            })}
        </>
    );
};

export default PurchaseHistoryCard;
