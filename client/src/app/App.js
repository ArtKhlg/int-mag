import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
// import ProductPage from "./components/productPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/login:type?" component={Login} />
                <Route
                    path="/:productId?/:categoryId?"
                    exact
                    component={Main}
                />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
