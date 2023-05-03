import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
// import { useSelector } from "react-redux";
// import { getCurrentUserData } from "../../store/users";

function NavProfile() {
    // const currentUser = useSelector(getCurrentUserData());
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    if (!currentUser) return "Loading...";
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    alt=""
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link to={`/personal`} className="dropdown-item">
                    Личный кабинет
                </Link>
                <Link to="/logout" className="dropdown-item">
                    Выйти
                </Link>
            </div>
        </div>
    );
}

export default NavProfile;
