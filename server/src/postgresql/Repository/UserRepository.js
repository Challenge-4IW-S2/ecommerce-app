import db from '../db.js';
import UserModel from '../model/User.js';
import { v4 as uuidv4 } from 'uuid';

export default class UserRepository {
    constructor() {
        this.User = UserModel(db.connection);
    }

    async findAll() {
        return await this.User.findAll();
    }
}