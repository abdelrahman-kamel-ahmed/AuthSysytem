exports.roleMiddleWare=function(...allowedRoles){

    return (request, response, next) => {
        console.log(request.user);
        const  role  = request.user.role;
        if (!role) {
            return response.status(401).json({ message: "un-authorized" });
        }
        if (!allowedRoles.includes(role)) {
            return response.status(403).json({ message: "Access denied" });
        }
        next();
    }
    
}