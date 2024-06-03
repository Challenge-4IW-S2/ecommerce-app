import db from '../db.js'; 
import UserRoleModel from '../model/UserRole.js';
import { v4 as uuidv4 } from 'uuid';

export default class UserRoleRepository {
    constructor() {
        this.UserRole = UserRoleModel(db.connection);
    }

    async findAll() {
        return await this.UserRole.findAll();
    }

    // async create(name) {
    //     return await this.UserRole.create({
    //         id: uuidv4(),
    //         name: name
    //     });
    // }
}