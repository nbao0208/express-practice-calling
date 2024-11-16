module.exports = async (request, response, next) => {
    if (request.body) {
        console.log("request: ", request.body);
    }else{
        console.log("request: {}");
    }
    await next();
    console.log("response: ", response.data);
};