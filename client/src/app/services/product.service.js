import httpService from "./http.service";

const productEndpoint = "products/";

const productService = {
    get: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            productEndpoint + payload._id,
            payload
        );
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            productEndpoint + payload._id,
            payload
        );
        return data;
    },
    delete: async (productId) => {
        const { data } = await httpService.delete(productEndpoint + productId);
        return data;
    }
};
export default productService;
