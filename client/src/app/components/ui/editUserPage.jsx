import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radioField";
import { getCurrentUserData, updateUser } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../common/loading";

const EditUserPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const currentUser = useSelector(getCurrentUserData());
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateUser(data));

        history.push(`/personal`);
    };

    useEffect(() => {
        if (currentUser && !data) {
            setData(currentUser);
        }
    }, [currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <button
                className="btn btn-primary"
                onClick={() => history.goBack()}
            >
                <i className="bi bi-caret-left"></i>
                Назад
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />

                            <RadioField
                                options={[
                                    { name: "Мужской", value: "male" },
                                    { name: "Женский", value: "female" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />

                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
