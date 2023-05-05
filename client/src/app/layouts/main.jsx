// import _ from "lodash";
import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/productPage";
import ProductsListPage from "../components/productsListPage";
// import useMockData from "../utils/mockData";

const Main = () => {
    const params = useParams();
    const { productId, categoryId } = params;
    return (
        <>
            <div style={{ backgroundColor: "#eee" }}>
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
