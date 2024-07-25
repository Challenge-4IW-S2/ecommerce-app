import ky from "ky";

export function fetchModelStructure(modelName) {
    try {
        return ky.get(`${import.meta.env.VITE_API_BASE_URL}/model/${modelName}`).json();
    } catch (error) {
        throw error;
    }
}
export function filterUnwantedFields  (data, unwantedFields) {
    return Object.keys(data)
        .filter(key => !unwantedFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
}