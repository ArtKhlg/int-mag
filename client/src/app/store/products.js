import { createAction, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        dataLoaded: false
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        productsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        productUpdated: (state, action) => {
            state.entities = state.entities.forEach((c) => {
                if (c._id === action.payload._id) c = action.payload;
            });
        },
        productDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceived,
    productUpdated,
    productsRequestFailed,
    productCreated,
    productDeleted
} = actions;

export const loadProductsList = () => async (dispatch, getState) => {
    dispatch(productsRequested());
    try {
        const { content } = await productService.get();
        dispatch(productsReceived(content));
    } catch (error) {
        dispatch(productsRequestFailed(error.message));
    }
};

const productCreateRequested = createAction("products/productCreateRequested");
const productCreateRequestFailed = createAction(
    "products/productCreateRequestFailed"
);
const productUpdateRequested = createAction("products/productUpdateRequested");
const productUpdateRequestFailed = createAction(
    "products/productUpdateRequestFailed"
);
const productDeleteRequested = createAction("products/productDeleteRequested");
const productDeleteRequestFailed = createAction(
    "products/productDeleteRequestFailed"
);

export const createProduct = (payload) => async (dispatch) => {
    dispatch(productCreateRequested());
    try {
        const { content } = await productService.create(payload);
        dispatch(productCreated(content));
    } catch (error) {
        dispatch(productCreateRequestFailed(error.message));
    }
};

export const updateProduct = (payload) => async (dispatch) => {
    dispatch(productUpdateRequested());
    try {
        const { content } = await productService.update(payload);
        dispatch(productUpdated(content));
        dispatch(loadProductsList());
    } catch (error) {
        dispatch(productUpdateRequestFailed(error.message));
    }
};

export const deleteProduct = (productId) => async (dispatch) => {
    dispatch(productDeleteRequested());
    try {
        const { content } = await productService.delete(productId);
        if (!content) {
            dispatch(productDeleted(productId));
        }
    } catch (error) {
        dispatch(productDeleteRequestFailed(error.message));
    }
};

export const getProductsList = () => (state) => state.products.entities;
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;

export const getProductById = (productId) => (state) => {
    if (state.products.entities) {
        return state.products.entities.find((p) => p._id === productId);
    }
};

export const getDataStatus = () => (state) => state.products.dataLoaded;

export default productsReducer;
