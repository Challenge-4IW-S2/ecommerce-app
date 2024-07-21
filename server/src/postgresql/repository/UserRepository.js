import db from '../db.js';
import UserModel from '../models/User.js';
import UserRoleRepository from './UserRoleRepository.js';
import PreferenceModel from '../models/Preference.js';

export default class UserRepository {
    constructor() {
        this.User = db.models.User;
        this.Preference = db.models.Preference;
        this.PreferencesList = db.models.PreferencesList;
        //  this.User = new UserModel(db.connection);
        this.userRoleRepository = new UserRoleRepository();
        // this.Preference = new PreferenceModel(db.connection);

    }

    async findAll() {
        return await this.User.findAll();
    }

    async findByPk(id) {
        return await this.User.findByPk(id);
    }

    async findOne(field, value) {
        return await this.User.findOne({
            where: {
                [field]: value
            }
        });
    }

    async createUser(user) {
        return await this.User.create({
            email: user.email,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            role: await this.userRoleRepository.getRoleId(user.role),
            token: user.token,
        });
    }

    async updateUser(id, user) {
        return this.User.update(user, {
            where: {
                id: id
            },
            individualHooks: true,
            returning: true
        });
    }


    async destroy(id) {
        return await this.User.destroy({
            where: {
                id: id
            }
        });
    }

    async deleteUser(id) {
        return await this.updateUser(id, {
            email: null,
            password: null,
            firstname: null,
            lastname: null,
            phone: null,
            role: null,
            deleted: true,
        });
    }

    async findAllWithPreferences(pref) {
        return await this.User.findAll({
            include: [{
                model: this.Preference,
                as: 'preferences',
                where: { activated: true},
                include: {
                    model: this.PreferencesList,
                    as: 'preference',
                    where: { name: pref }
                }
            }]
        });
    }

    async findAllWithPreferencesAndWhishlist() {
        return await this.User.findAll({
            include: [
                {
                    model: this.Preference,
                    as: 'preferences',
                    where: { activated: true },
                    include: {
                        model: this.PreferencesList,
                        as: 'preference',
                        where: { name: 'NEW' }
                    }
                },
                {
                    model: this.Preference,
                    as: 'wishlist',
                    where: { activated: true },
                    include: {
                        model: this.PreferencesList,
                        as: 'preference',
                        where: { name: 'NEW' }
                    }
                }
            ]
        });}

    async findAllByRole(role) {
        return await this.User.findAll({
            where: {
                role: await this.userRoleRepository.getRoleId(role)
            }
        });
    }
}