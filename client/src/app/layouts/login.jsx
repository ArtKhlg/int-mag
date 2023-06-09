import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Регистрация</h3>
                            <p>
                                Уже есть аккаунт?{" "}
                                <a
                                    role="button"
                                    className="btn btn-success"
                                    onClick={toggleFormType}
                                >
                                    Войти
                                </a>
                            </p>

                            <RegisterForm />
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Авторизация</h3>
                            <p>
                                Еще нет аккаунта?{" "}
                                <a
                                    role="button"
                                    className="btn btn-info"
                                    onClick={toggleFormType}
                                >
                                    Регистрация
                                </a>{" "}
                            </p>

                            <LoginForm />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
