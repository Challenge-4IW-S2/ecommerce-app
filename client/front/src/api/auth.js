import { useAPI } from "../composables/useAPI";

export async function isUserAuthenticated() {
    try {
        const { results } = await useAPI('get', 'auth-check', {}, {}, 'include');
        const response = results;
        return response.json();
    } catch (e) {
        return false;
    }
}