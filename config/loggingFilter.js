module.exports = (request, response, next) => {
    if (request.body) {
        console.log("request: ", request.body);
    }else{
        console.log("request: {}");
    }
    next();
    console.log("response: ", response.statusCode);
};