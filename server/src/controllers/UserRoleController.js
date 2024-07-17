import UserRoleRepository from "../postgresql/Repository/UserRoleRepository.js";

export class UserRoleController{
    static async getAllUserRole(req, res) {
        try {
            const userRoleRepository = new UserRoleRepository();
            const userRole = await userRoleRepository.findAll();
            res.status(200).json(userRole);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async createUserRole(req, res,next) {
        try {
            const params = {
                name: req.body.name,
            };
            const userRoleRepository = new UserRoleRepository();
            const userRole = await userRoleRepository.createUserRole(params.name);
            res.status(201).json(userRole);
        } catch (error) {
            next(error);
        }
    }
    static async getUserRole(req, res,next) {
        try {
            const userRoleRepository = new UserRoleRepository();
            const userRole = await userRoleRepository.findByPk(req.params.id);
            res.json(userRole);
        } catch (error) {
            next(error)
        }
    }
    static async updateUserRole(req, res,next) {
        try {
            const params = {
                name: req.body.name,
            };
            const userRoleRepository = new UserRoleRepository();
            const [nbUpdated,userRole] = await userRoleRepository.updateUserRole(req.params.id,params.name);
            if (nbUpdated === 1) return res.json(userRole[0]);
        } catch (error) {
            next(error);
        }
    }
    static async deleteUserRole(req, res,next) {
        try {
            const userRoleRepository = new UserRoleRepository();
            const nbDeleted = await userRoleRepository.deleteUserRole(req.params.id);
            res.sendStatus(nbDeleted === 1 ? 204 : 400);

        } catch (error) {
            next(error);
        }
    }
}