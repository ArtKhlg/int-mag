import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const Thanks = () => {
    const history = useHistory();
    const handleClick = () => {
        history.push("/");
    };
    return (
        <>
            <div>
                <h2>Спасибо за покупку! Приходите еще!</h2>
                <button className="btn btn-info" onClick={handleClick}>
                    Вернуться в магазин
                </button>
            </div>
        </>
    );
};

export default Thanks;
