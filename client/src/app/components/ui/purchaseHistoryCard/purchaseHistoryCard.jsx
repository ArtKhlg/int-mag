import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import Accordion from "./accordion";

const PurchaseHistoryCard = () => {
    const { currentUser } = useAuth();
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
