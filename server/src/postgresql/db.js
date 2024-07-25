import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath,pathToFileURL } from 'url';
import UserRepository from "./repository/UserRepository.js";

const connection = new Sequelize(process.env.DATABASE_URL);

connection.authenticate().then(() => {
    console.log('Connected to PostgreSQL');
}).catch(error => {
    console.error('Unable to connect to PostgreSQL:', error);
});

const loadModels = async () => {
        const models = {};
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const modelsDirectory = path.join(__dirname, 'models');
    try {
        const files = fs.readdirSync(modelsDirectory).filter(file => file.endsWith('.js'));
        for (const file of files) {
            const modelPath = path.join(modelsDirectory, file);
            // Résoudre le chemin du fichier en URL compatible avec import()
            const modelUrl = pathToFileURL(modelPath).href;
            const { default: initModel } = await import(modelUrl);
            const model = initModel(connection);
            models[model.name] = model;
        }
        Object.values(models).forEach(model => {
            if (model.associate) {
                model.associate(models);
            }
        });
        return models;
    }catch (error) {
        console.error('Erreur lors du chargement des modèles:', error);
        throw error;
    }
};
// Charger les modèles au démarrage
export const models = await loadModels();
export default { connection , models };