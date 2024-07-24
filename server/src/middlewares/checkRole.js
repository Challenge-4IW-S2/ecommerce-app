import UserRoleRepository from "../postgresql/repository/UserRoleRepository.js";

export default ( roles = []) => async (request, response, next) => {
    if (!request.user) {
        return response.sendStatus(500);
    }

    try {
        const roleRepository = new UserRoleRepository();
        const userRole = await roleRepository.findOne('id', request.user.role);

        return response.status(500).json({
            a: request.user.role
        })

        if (!userRole) {
            return response.sendStatus(500);
        }

        if (!roles.includes(userRole.name)) {
            return response.sendStatus(403);
        }
        next();
    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
};