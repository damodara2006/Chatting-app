import ErrorApi from "./ErrorApi.js";

const AsyncHandler = (requestFunction) => async (req, res, next) => {
    try {
       return await requestFunction(req, res, next); 
    } catch (error) {
        next((error))
    }
};

export default AsyncHandler;
