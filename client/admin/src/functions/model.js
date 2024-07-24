import ky from "ky";

export function fetchModelStructure(modelName) {
    try {
        console.log("Fetching model structure...");
        return ky.get(`${import.meta.env.VITE_API_BASE_URL}/model/${modelName}`, {
            credentials: "include"
        }).json();
    } catch (error) {
        console.error("Error fetching model structure:", error);
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