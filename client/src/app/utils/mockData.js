import { useState } from "react";
// import professions from "../mockData/professions.json";
// import qualities from "../mockData/qualities.json";
// import users from "../mockData/users.json";
import httpService from "../services/http.service";
import products from "../mockData/products.json";
import categories from "../mockData/categories.json";

const useMockData = () => {
    const [error, setError] = useState(null);
    // const [count, setCount] = useState(0);
    // const incrementCount = () => {
    //     setCount((prevState) => prevState + 1);
    // };
    // const updateProgress = () => {
    //     if (count !== 0 && status === statusConsts.idle) {
    //         setStatus(statusConsts.pending);
    //     }
    //     const newProgress = Math.floor((count / summaryCount) * 100);
    //     if (progress < newProgress) {
    //         setProgress(() => newProgress);
    //     }
    //     if (newProgress === 100) {
    //         setStatus(statusConsts.successed);
    //     }
    // };

    // useEffect(() => {
    //     updateProgress();
    // }, [count]);
    async function initialize() {
        try {
            for (const prod of products) {
                await httpService.put("products/" + prod._id, prod);
                // incrementCount();
            }
            for (const cat of categories) {
                await httpService.put("categories/" + cat._id, cat);
                // incrementCount();
            }
        } catch (error) {
            setError(error);
        }
    }

    return { error, initialize };
};

export default useMockData;
