import db from "../db.js";
import PreferenceList from "../models/PreferencesList.js";

export default class PreferenceListRepository {
    constructor() {
        this.PreferenceList = PreferenceList(db.connection);
    }

    async findAll() {
        return await this.PreferenceList.findAll();
    }
}