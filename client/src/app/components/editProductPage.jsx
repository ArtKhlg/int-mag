import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import TextField from "./common/form/textField";
import { validator } from "../utils/validator";
import SelectField from "./common/form/selectField";
import TextAreaField from "./common/form/textAreaField";
import { getCategories, getCategoriesLoadingStatus } from "../store/categories";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProduct } from "../store/products";

const EditProductPage = () => {
    const { edit } = useParams();
    const dispatch = useDispatch();
    const categories = useSelector(getCategories());
    const categoriesLoading = useSelector(getCategoriesLoadingStatus());
    const productId = edit.slice(4, edit.length);
    const product = useSelector(getProductById(productId));
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const [productCategoryName, setProductCategoryName] = useState();
    useEffect(() => {
        if (product && !categoriesLoading && !data) {
            setData({
                ...product
            });
        }
    }, [product, categoriesLoading, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            setProductCategoryName(
                categories.filter((c) => c.catNumber === data.category)[0].name
            );
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

    const handleChangeCategory = (target) => {
        const dataCat = categories.filter((c) => c.name === target.value);

        setData((prevState) => ({
            ...prevState,
            [target.name]: dataCat[0]._id
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        dispatch(
            updateProduct({
                ...data
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
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <SelectField
                                label="Категория товара"
                                defaultOption="Выберите категорию для товара"
                                options={categories}
                                name="category"
                                onChange={handleChangeCategory}
                                value={productCategoryName}
                                error={errors.category}
                            />
                            <TextField
                                label="Цена за единицу"
                                name="price"
                                type="number"
                                value={data.price}
                                onChange={handleChangeNumber}
                                error={errors.price}
                            />
                            <TextField
                                label="Количество товара на складе"
                                name="quantity"
                                type="number"
                                value={data.quantity}
                                onChange={handleChangeNumber}
                                error={errors.quantity}
                            />
                            <TextAreaField
                                label="Описание товара"
                                name="desc"
                                value={data.desc}
                                onChange={handleChange}
                                error={errors.desc}
                            />
                            <TextAreaField
                                label="Изображение товара"
                                name="image"
                                value={data.image}
                                onChange={handleChange}
                                error={errors.image}
                            />

                            {/* <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            /> */}

                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </>
    );
};

export default EditProductPage;
