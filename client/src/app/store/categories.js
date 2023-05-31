import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entitites: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true;
        },
        categoriesReceived: (state, action) => {
            state.entitites = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        categoriesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceived, categoriesRequestFailed } =
    actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadCategoriesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().categories;
    if (isOutdated(lastFetch)) {
        dispatch(categoriesRequested());
        try {
            const { content } = await categoryService.fetchAll();
            dispatch(categoriesReceived(content));
        } catch (error) {
            dispatch(categoriesRequestFailed(error.message));
        }
    }
};

export const getCategories = () => (state) => state.categories.entitites;
export const getCategoriesLoadingStatus = () => (state) =>
    state.categories.isLoading;
export const getCategoryById = (categoryId) => (state) =>
    state.categories.entitites?.filter((c) => c.catNumber === categoryId)[0];

export default categoriesReducer;
