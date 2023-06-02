import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import TextField from "./common/form/textField";
import { validator } from "../utils/validator";
import SelectField from "./common/form/selectField";
import TextAreaField from "./common/form/textAreaField";
// import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/categories";
import { createProduct } from "../store/products";
import Loading from "./common/loading";
const initialState = {
    name: "",
    category: "",
    price: "",
    quantity: "",
    desc: "",
    image: ""
};
const AddProductPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(getCategories());
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Введите наименование товара"
            },
            min: 3
        },
        price: {
            isRequired: {
                message: "Введите цену товара"
            },
            min: 1
        },
        quantity: {
            isRequired: {
                message: "Введите количество товара"
            },
            min: 1
        },
        desc: {
            isRequired: {
                message: "Введите описание товара"
            },
            min: 3
        },
        image: {
            isRequired: {
                message: "Укажите ссылку на изображение товара"
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

    const handleChangeNumber = (target) => {
        const numberValue = +target.value;
        setData((prevState) => ({
            ...prevState,
            [target.name]: numberValue
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataCat = categories.filter((c) => c.name === data.category);
        const isValid = validate();
        if (!isValid) return;
        dispatch(
            createProduct({
                ...data,
                category: dataCat[0]._id
            })
        );
        history.push(`/admin`);
    };
    return (
        <>
            <button
                className="btn btn-dark"
                onClick={() => history.push("/admin")}
            >
                <i className="bi bi-caret-left"></i>
                Назад
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Наименование товара"
                                name="name"
                                value={data?.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <SelectField
                                label="Категория товара"
                                defaultOption="Выберите категорию для товара"
                                options={categories}
                                // options={[
                                //     { name: "Автомобили", value: "1001" },
                                //     { name: "Животные", value: "1002" },
                                //     { name: "Электроника", value: "1003" },
                                //     { name: "Растения", value: "1004" }
                                // ]}
                                name="category"
                                onChange={handleChange}
                                value={data?.category}
                                error={errors.category}
                            />
                            <TextField
                                label="Цена за единицу"
                                name="price"
                                type="number"
                                value={data?.price}
                                onChange={handleChangeNumber}
                                error={errors.price}
                            />
                            <TextField
                                label="Количество товара на складе"
                                name="quantity"
                                type="number"
                                value={data?.quantity}
                                onChange={handleChangeNumber}
                                error={errors.quantity}
                            />
                            <TextAreaField
                                label="Описание товара"
                                name="desc"
                                value={data?.desc}
                                onChange={handleChange}
                                error={errors.desc}
                            />
                            <TextAreaField
                                label="Изображение товара"
                                name="image"
                                value={data?.image}
                                onChange={handleChange}
                                error={errors.image}
                            />

                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-success w-100 mx-auto"
                            >
                                Добавить
                            </button>
                        </form>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </>
    );
};

export default AddProductPage;
