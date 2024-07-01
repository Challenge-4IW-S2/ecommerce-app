import ky from "ky";

export function fetchModelStructure(modelName) {
    try {
        console.log("Fetching model structure...");
        return ky.get(`${import.meta.env.VITE_API_BASE_URL}/model/${modelName}`).json();
    } catch (error) {
        console.error("Error fetching model structure:", error);
        throw error;
    }


}