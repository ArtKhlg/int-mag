import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
// import SelectField from "../../common/form/selectField";
import RadioField from "../common/form/radioField";
// // import MultiSelectField from "../../common/form/multiSelectField";
// import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../hooks/useAuth";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     getQualities,
//     getQualitiesLoadingStatus
// } from "../../../store/qualities";
// import {
//     getProfessions,
//     getProfessionsLoadingStatus
// } from "../../../store/professions";
// import { getCurrentUserData, updateUser } from "../../../store/users";

const EditUserPage = () => {
    const history = useHistory();
    // const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const { currentUser, updateUserData } = useAuth();
    // const currentUser = useSelector(getCurrentUserData());
    // const { updateUserData } = useAuth();
    // const qualities = useSelector(getQualities());
    // const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    // const qualitiesList = qualities.map((q) => ({
    //     label: q.name,
    //     value: q._id
    // }));
    // const professions = useSelector(getProfessions());
    // const professionLoading = useSelector(getProfessionsLoadingStatus());
    // const professionsList = professions.map((p) => ({
    //     label: p.name,
    //     value: p._id
    // }));
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await updateUserData(data);
        } catch (error) {
            setErrors(error);
        }
        // dispatch(
        //     updateUser({
        //         ...data,
        //         qualities: data.qualities.map((q) => q.value)
        //     })
        // );

        history.push(`/personal`);
    };
    // function getQualitiesListByIds(qualitiesIds) {
    //     const qualitiesArray = [];
    //     for (const qualId of qualitiesIds) {
    //         for (const quality of qualities) {
    //             if (quality._id === qualId) {
    //                 qualitiesArray.push(quality);
    //                 break;
    //             }
    //         }
    //     }
    //     return qualitiesArray;
    // }
    // const transformData = (data) => {
    //     const result = getQualitiesListByIds(data).map((qual) => ({
    //         label: qual.name,
    //         value: qual._id
    //     }));
    //     return result;
    // };
    useEffect(() => {
        if (currentUser && !data) {
            setData({
                ...currentUser
            });
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
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
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
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
