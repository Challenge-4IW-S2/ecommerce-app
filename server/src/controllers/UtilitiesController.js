import {models} from '../postgresql/db.js';
export class UtilitiesController {
    static async fetchModelStructure(req, res) {
        console.log('init fetchModelStructure')
        const { modelName } = req.params;
        const model = models[modelName];
        console.log(models[modelName])

        if (model) {
            const modelAttributes = model.rawAttributes;
            const structure = Object.keys(modelAttributes).map((attribute) => ({
                name: attribute,
                type: modelAttributes[attribute].type.key,
                allowNull: modelAttributes[attribute].allowNull,
                primaryKey: modelAttributes[attribute].primaryKey || false,
                unique: modelAttributes[attribute].unique || false,
            }));
            res.json(structure);
        } else {
            res.status(404).json({ message: `Model ${modelName} not found` });
        }
    }
}