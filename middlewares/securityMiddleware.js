
const WHITE_LIST=[
    "/api/v1/auth/",
]


function securityMiddleware(request, response, next){
    if (request.url.startsWith("/api/v1/auth")){
        next();
        return;
    }

    let token = request.headers.authorization;
    // catch the token after Bearer:' '
    token = token.split(' ')[1];

    if (!token){
        response.status(401).send();
    }


}