import { ref, reactive } from 'vue';
import { getEntitySchema, handleHttpResponse } from '../functions/model.js';
import { useAPI } from './useAPI.js';

export function useFormHandler(entityType, initialData = {}) {
    const formData = ref({ ...initialData });
    const validationErrors = reactive({});
    const serverError = ref(null);
    const isSubmitting = ref(false);

    const schema = getEntitySchema(entityType);

    const validate = () => {
        try {
            schema.parse(formData.value);
            resetValidationErrors();
            return true;
        } catch (e) {
            resetValidationErrors();
            e.errors.forEach(error => {
                validationErrors[error.path[0]] = error.message;
            });
            return false;
        }
    };

    const handleSubmit = async (url, method = 'POST') => {
        let response;

        if (!validate()) return;
        isSubmitting.value = true;
        serverError.value = null;
        try {
            if (method === 'POST') {
                const { results } = await useAPI('post', url, {}, formData.value, '');
                response = results.value;
            } else {
                const { results } = await useAPI('patch', url, {}, formData.value, '');
                response = results.value;
            }
            await handleHttpResponse(response);
        } catch (error) {
            console.log('Error:', error.message);

            serverError.value = error.message;
        } finally {
            isSubmitting.value = false;
        }
    };

    const resetValidationErrors = () => {
        Object.keys(validationErrors).forEach(key => {
            validationErrors[key] = null;
        });
    };

    const resetErrors = () => {
        resetValidationErrors();
        serverError.value = null;
    };

    return {
        formData,
        validationErrors,
        serverError,
        isSubmitting,
        handleSubmit,
        resetErrors,
    };
}
