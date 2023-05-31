import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/productPage";
import ProductsListPage from "../components/productsListPage";
import ProductsLoader from "../components/ui/hoc/productsLoader";

const Products = () => {
    const params = useParams();
    const { productId, categoryId } = params;

    return (
        <>
            <ProductsLoader>
                <div style={{ backgroundColor: "#eee" }}>
                    {categoryId ? (
                        <ProductsListPage categoryId={categoryId} />
                    ) : productId ? (
                        <ProductPage productId={productId} />
                    ) : (
                        <ProductsListPage />
                    )}
                </div>
            </ProductsLoader>
        </>
    );
};

export default Products;
