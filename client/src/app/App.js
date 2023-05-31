import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import ShoppingCart from "./layouts/shoppingCart";
import PersonalPage from "./components/ui/personalPage";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AdminPage from "./layouts/adminPage";
import Thanks from "./layouts/thanks";
import Products from "./layouts/products";
import AppLoader from "./components/ui/hoc/appLoader";
import Favourite from "./layouts/favourite";

function App() {
    return (
        <div>
            <AppLoader>
                <NavBar />
                <Switch>
                    <ProtectedRoute path="/favourite" component={Favourite} />
                    <ProtectedRoute
                        path="/shoppingCart"
                        component={ShoppingCart}
                    />
                    <ProtectedRoute
                        path="/admin/:edit?"
                        component={AdminPage}
                    />
                    <ProtectedRoute
                        path="/personal/:edit?"
                        component={PersonalPage}
                    />
                    <ProtectedRoute path="/thanks" component={Thanks} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route
                        path="/products/:productId?/:categoryId?"
                        component={Products}
                    />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            </AppLoader>
        </div>
    );
}

export default App;
