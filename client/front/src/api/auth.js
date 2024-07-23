import { useAPI } from "../composables/useAPI.js";

export async function isUserAuthenticated() {
    try {
        const { results } = await useAPI('get', 'auth-check', {}, {}, 'include');
        const response = results.value;
        return response;
    } catch (e) {
        return false;
    }
}