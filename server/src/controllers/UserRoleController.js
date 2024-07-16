import UserRole from "../postgresql/models/UserRole.js";
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
    static async createUserRole(req, res) {
        try {
            const userRoleRepository = new UserRoleRepository();
            const userRole = await userRoleRepository.createUserRole(req.body);
            res.status(201).json(userRole);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async getUserRole(req, res) {
        try {
            const userRole = await UserRole.findByPk(req.params.id);
            res.status(200).json(userRole);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async updateUserRole(req, res) {
        try {
            const userRole = await UserRole.findByPk(req.params.id);
            await userRole.update(req.body);
            res.status(200).json(userRole);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async deleteUserRole(req, res) {
        try {
            const userRole = await UserRole.findByPk(req.params.id);
            await userRole.destroy();
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}