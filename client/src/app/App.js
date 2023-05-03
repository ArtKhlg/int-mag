import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import ShoppingCart from "./layouts/shoppingCart";
import { ProductProvider } from "./hooks/useProducts";
import { CategoriesProvider } from "./hooks/useCategories";
import AuthProvider from "./hooks/useAuth";
import PersonalPage from "./components/ui/personalPage";
// import ProductPage from "./components/productPage";

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <ProductProvider>
                        <CategoriesProvider>
                            <Route
                                path="/shoppingCart"
                                component={ShoppingCart}
                            />
                            <Route
                                path="/personal/:edit?"
                                component={PersonalPage}
                            />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/" exact component={Main} />
                            <Route
                                path="/products/:productId?/:categoryId?"
                                component={Main}
                            />
                            {/* <Redirect to="/" /> */}
                        </CategoriesProvider>
                    </ProductProvider>
                </Switch>
            </AuthProvider>
        </div>
    );
}

export default App;
