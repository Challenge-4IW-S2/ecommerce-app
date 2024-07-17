import ky from "ky";

export async function isUserAuthenticated() {
    try {
        const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/auth-check`, {
            credentials: 'include',
        });

        return response.ok;
    } catch (e) {
        return false;
    }
}