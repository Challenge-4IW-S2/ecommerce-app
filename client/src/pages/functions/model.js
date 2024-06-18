import ky from "ky";

export function fetchModelStructure(modelName) {
    try {
        console.log("Fetching model structure...");
        return ky.get(`http://localhost:8000/model/${modelName}`).json();
    } catch (error) {
        console.error("Error fetching model structure:", error);
        throw error;
    }


}