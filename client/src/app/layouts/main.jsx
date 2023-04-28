// import _ from "lodash";
import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/productPage";
import ProductsListPage from "../components/productsListPage";
// import Search from "../components/common/form/search";
// import GroupList from "../components/common/groupList";
// import UserTable from "../components/ui/usersTable";
// import { paginate } from "../utils/paginate";

const Main = () => {
    const params = useParams();
    const { productId, categoryId } = params;

    return (
        <>
            {categoryId ? (
                <ProductsListPage categoryId={categoryId} />
            ) : productId ? (
                <ProductPage productId={productId} />
            ) : (
                <ProductsListPage />
            )}
        </>
    );
};

export default Main;
