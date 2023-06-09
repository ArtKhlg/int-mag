import React from "react";
import TableHeader from "../components/common/table/tableHeader";
import TableBody from "../components/common/table/tableBody";
import EditProduct from "../components/editProductButton";
import EditProductPage from "../components/editProductPage";
import AddProductPage from "../components/addProductPage";
import DeleteProduct from "../components/deleteProductButton.jsx";
import {
    Redirect,
    useHistory,
    useParams
} from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../store/users";

const AdminPage = () => {
    const history = useHistory();
    const { edit } = useParams();
    const currentUser = useSelector(getCurrentUserData());
    const columns = {
        name: {
            path: "name",
            name: "Наименование"
        },
        category: {
            path: "category",
            name: "Категория"
        },
        price: {
            path: "price",

            name: "Цена"
        },
        quantity: {
            path: "quantity",

            name: "Количество"
        },
        image: {
            path: "image",

            name: "Изображение"
        },
        desc: {
            path: "desc",
            name: "Описание"
        },
        edit: {
            path: "edit",
            name: "Редактировать",
            component: (product) => <EditProduct product={product} />
        },
        delete: {
            path: "delete",
            name: "Удалить",
            component: (product) => <DeleteProduct product={product} />
        }
    };

    const handleClick = () => {
        history.push("/admin/add");
    };
    return (
        <>
            {currentUser && currentUser.admin === true ? (
                <>
                    {edit && edit !== "add" ? (
                        <EditProductPage />
                    ) : edit && edit === "add" ? (
                        <AddProductPage />
                    ) : (
                        <div>
                            {" "}
                            <div className="d-flex justify-content-around">
                                <button
                                    className="btn btn-success"
                                    onClick={handleClick}
                                >
                                    Добавить новый товар
                                </button>
                            </div>
                            <table className="table">
                                <>
                                    <TableHeader {...{ columns }} />
                                    <TableBody {...{ columns }} />
                                </>
                            </table>
                        </div>
                    )}
                </>
            ) : (
                <Redirect to="/" />
            )}
        </>
    );
};

export default AdminPage;
