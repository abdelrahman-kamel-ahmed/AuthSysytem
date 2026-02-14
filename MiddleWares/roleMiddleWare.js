exports.roleMiddleWare=function(...allowedRoles){

    return function (request, response, next) {
        const { role } = request.user;
        if (!role) {
            return response.status(401).json({ message: "un-authorized" });
        }
        if (!allowedRoles.includes(role)) {
            return response.status(403).json({ message: "Access denied" });
        }
        next();
    }
    
}