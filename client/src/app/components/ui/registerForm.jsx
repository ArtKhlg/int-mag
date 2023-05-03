import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radioField";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        sex: "male",
        license: false
    });

    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Email введен некорректно" }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно содержать не менее 3 символов",
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен содержать не менее 8 символов",
                value: 8
            }
        },
        license: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const { signUp } = useAuth();

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await signUp(data);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />

            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите Ваш пол"
            />

            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>

            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
