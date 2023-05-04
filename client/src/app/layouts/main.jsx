// import _ from "lodash";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/productPage";
import ProductsListPage from "../components/productsListPage";
import useMockData from "../utils/mockData";
// import Search from "../components/common/form/search";
// import GroupList from "../components/common/groupList";
// import UserTable from "../components/ui/usersTable";
// import { paginate } from "../utils/paginate";

const Main = () => {
    const { initialize } = useMockData();
    useEffect(() => {
        initialize();
    }, []);
    const params = useParams();
    const { productId, categoryId } = params;
    return (
        <>
            <div style={{ backgroundColor: "#d2c9ff" }}>
                {categoryId ? (
                    <ProductsListPage categoryId={categoryId} />
                ) : productId ? (
                    <ProductPage productId={productId} />
                ) : (
                    <ProductsListPage />
                )}
            </div>
        </>
    );
};

export default Main;
