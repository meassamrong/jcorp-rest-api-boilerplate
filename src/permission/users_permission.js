
const permissionRequire = (requiredRoles) => {
    return (req, res, next) => {
        const userRoles = req.users.id.roles; // Access the roles from req.user set in verifyToken

        const hasPermission = requiredRoles.some(role => userRoles.includes(role));

        if (!hasPermission) {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }

        next();
    };
}
module.exports = { permissionRequire }