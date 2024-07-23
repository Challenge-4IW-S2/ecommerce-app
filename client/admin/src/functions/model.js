import { useAPI } from "../../../front/src/composables/useAPI.js";

export async function fetchModelStructure(modelName) {
    try {
        console.log("Fetching model structure...");
        const { results } = await useAPI('get', `model/${modelName}`, {}, {}, '');
        const response = results.value;
        return response;
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