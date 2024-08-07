import AdressRepository from "../postgresql/repository/AdressRepository.js";
import Adress from "../postgresql/models/Address.js";

export class AddressController {
    static async updateAddress(req, res,next) {
        const parameters = {
            street: req.body.street,
            city: req.body.city,
            postal_code: req.body.postal_code,
            country: req.body.country
        }
        try {
            const adressRepository = new AdressRepository();
            const [nbUpdated] =  await adressRepository.updateAdress(req.params.id, parameters)
            res.sendStatus(nbUpdated === 1 ? 200 : 404);
        }catch (e) {
            next(e);
        }

    }
    static async deleteAddress(req, res) {
        const adressRepository = new AdressRepository();
        const nbDeleted = await adressRepository.deleteAdress(req.params.id);
        if (nbDeleted === 1) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }

    static async createAddress(req, res,next) {
        const parameters = {
            user_id: req.body.user_id,
            street: req.body.street,
            city: req.body.city,
            postal_code: req.body.postal_code,
            country: req.body.country
        }
        try {
            const adressRepository = new AdressRepository();
            const address = await adressRepository.createAdress(parameters);
            res.status(201).json(address);
        }catch (e) {
           next(e);
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


}
