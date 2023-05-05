import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { useProducts } from "../../../hooks/useProducts";
// import { useCategories } from "../../../hooks/useCategories";

const TableBody = ({ columns }) => {
    const { products } = useProducts();
    // const { categories } = useCategories();
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[column].path);
    };
    // const productsFiltered = [...products];
    // productsFiltered.map((prod) => {
    //     for (const cat of categories) {
    //         if (prod.category === cat._id) {
    //             prod.category = cat.name;
    //         }
    //     }
    //     return prod;
    // });
    return (
        <tbody>
            {products.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td
                            key={column}
                            className="text-truncate text-center"
                            style={{ maxWidth: "150px" }}
                        >
                            {" "}
                            {renderContent(item, column)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    columns: PropTypes.object.isRequired
};

export default TableBody;
