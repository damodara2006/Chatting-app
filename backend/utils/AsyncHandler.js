import ErrorApi from "./ErrorApi.js";

const AsyncHandler = (requestFunction) => async (req, res, next) => {
    try {
       return await requestFunction(req, res, next); 
    } catch (error) {
        console.log(error)
    }
};

export default AsyncHandler;
