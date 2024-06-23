// useFormValidation.js
import { reactive, ref, computed } from 'vue';
import { z } from 'zod';

// Exemple de schéma de validation avec Zod
const formSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstname: z.string().nonempty("First name is required"),
    lastname: z.string().nonempty("Last name is required"),
    phone: z.string().optional(), // optionnel
    // Ajouter d'autres champs selon vos besoins
});

export function useFormValidation(inputs) {
    const formData = reactive({});
    const errors = ref({});

    // Initialiser les valeurs du formulaire
    inputs.forEach(input => {
        formData[input.name] = '';
    });

    // Valider les données du formulaire
    const validateForm = () => {
        try {
            formSchema.parse(formData);
            errors.value = {}; // Réinitialiser les erreurs en cas de validation réussie
            return true;
        } catch (err) {
            if (err instanceof z.ZodError) {
                const errorMessages = err.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                errors.value = errorMessages;
            }
            return false;
        }
    };

    // Filtrer les inputs
    const filteredInputs = computed(() => {
        return inputs.filter(input => input.type !== 'DATE' && input.name !== 'id' && input.name !== 'is_verified');
    });

    return {
        formData,
        errors,
        validateForm,
        filteredInputs,
    };
}
