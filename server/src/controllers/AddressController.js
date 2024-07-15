import AdressRepository from "../postgresql/Repository/AdressRepository.js";
import UserRepository from "../postgresql/Repository/UserRepository.js";

export class AddressController {
    static async updateAddress(req, res) {
        const parameters = {
            id: req.params.id,
            street: req.body.street,
            city: req.body.city,
            zip_code: req.body.zip_code,
            country: req.body.country
        }
        const adressRepository = new AdressRepository();
        const address = await adressRepository.updateAddress(req.params.id, parameters);
        res.status(address ? 200 : 201).json(address);
    }
    static async deleteAddress(req, res) {
        const adressRepository = new AdressRepository();
        const { id } = req.params.id;
        const nbDeleted = await adressRepository.deleteAddress(id);
        if (nbDeleted === 1) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }

    static async getAllAddressByUserId(req, res) {
        const adressRepository = new AdressRepository();
        const address = await adressRepository.findByOtherField("user_id",req.params.userId);
        res.json(address);
    }

    static async getAddress(req, res) {
        const adressRepository = new AdressRepository();
        const address = await adressRepository.findById(req.params.id);
        res.json(address);
    }

    static async createAddress(req, res) {
        const parameters = {
            user_id: req.body.user_id,
            street: req.body.street,
            city: req.body.city,
            zip_code: req.body.zip_code,
            country: req.body.country
    }
        const adressRepository = new AdressRepository();
        const address = await adressRepository.createAdress(parameters);
        res.status(address ? 200 : 201);
    }


}
