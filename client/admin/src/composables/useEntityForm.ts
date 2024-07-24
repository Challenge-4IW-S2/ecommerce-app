import { ref, reactive, onMounted, watch } from 'vue';
import ky from 'ky';
import { z } from 'zod';
import sweetalert from 'sweetalert2';
import { filterUnwantedFields } from '../functions/model.js';
const getEntitySchema = (entityType) => {
    switch (entityType) {
        case 'user':
            return z.object({
                email: z.string().email("Invalid email format"),
                password: z.string().min(6, "Password must be at least 6 characters long"),
                firstname: z.string(),
                lastname: z.string(),
                phone: z.string().optional(),
                role: z.string(),
            });
        case 'product':
            return z.object({
                name: z.string().nonempty("Product name is required"),
                price: z.number().positive("Price must be positive"),
                description: z.string().optional(),
            });
        default:
                return z.object({});
    }
};
const unwantedFields = ['createdAt', 'updatedAt', 'is_verified','deleted'];
export function useEntityForm(entityType, entityId = null) {
    const formData = reactive({});
    const entitySchema = ref(getEntitySchema(entityType));
    const entityStructure = ref([]);
    const errors = ref({});
    const isEditing = ref(Boolean(entityId));
    const getRoleOptions = async () => {
        try {
            const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/role`).json();
            return response.map(role => ({
                value: role.id,
                label: role.name
            }));
        } catch (error) {
            console.error('Failed to fetch roles:', error);
            return [];
        }
    };


    const fetchEntityStructure = async () => {
        try {
            const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/${entityType}/${entityId || ''}`).json();
            const cleanedResponse = filterUnwantedFields(response, unwantedFields);
            let roleOptions = [];
            if (entityType === 'user') {
                roleOptions = await getRoleOptions();
            }
            entityStructure.value = Object.keys(cleanedResponse).map(key => {
            const field = {
                name: key,
                value: cleanedResponse[key],
                type: getTypeForKey(key, cleanedResponse[key])
            };
            // Ajouter les options pour les champs de type select
            if (key === 'role') {
                field.is = 'select';
                field.options = roleOptions;
            }
            return field;
        });

            initializeFormData();
        } catch (error) {
            console.error('Failed to fetch entity structure:', error);
        }
    };

    const initializeFormData = () => {
        entityStructure.value.forEach(field => {
            formData[field.name] = field.value || '';
        });
    };

    const validateForm = () => {
        try {
            const cleanedData = filterUnwantedFields(formData, unwantedFields);
            entitySchema.value.parse(cleanedData);
            errors.value = {};
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

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const method = isEditing.value ? 'patch' : 'post';
                const cleanedData = filterUnwantedFields(formData, unwantedFields);
                const response = await ky[method](`${import.meta.env.VITE_API_BASE_URL}/${entityType}/${entityId || ''}`, {
                    json: cleanedData
                }).json();
                await sweetalert.fire({
                   icon: "success",
                   title: "Success",
                   text: `${entityType} ${isEditing.value ? 'updated' : 'created'} successfully`,
                });
            } catch (error) {
                await sweetalert.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error,
                });
                console.error('Failed to submit form:', error);
            }
        } else {
            console.log('Validation errors:', errors.value);
        }
    };

    const handleDelete = async () => {
        if (entityId) {
            try {
                await ky.delete(`${import.meta.env.VITE_API_BASE_URL}/${entityType}/${entityId}`).json();
                console.log(`${entityType} deleted successfully`);
            } catch (error) {
                console.error(`Failed to delete ${entityType}:`, error);
            }
        }
    };

    const getTypeForKey = (key, value) => {
        if (typeof value === 'number') return 'number';
        if (typeof value === 'boolean') return 'checkbox';
        if (typeof value === 'string' && (key.includes('email') || key.includes('Email'))) return 'email';
        if (typeof value === 'string' && (key.includes('password') || key.includes('Password'))) return 'password';
        if (typeof value === 'string' && (key.includes('phone') || key.includes('Phone'))) return 'tel';
        if ((key.includes('role') || key.includes('Role')) ) return 'select';
        return 'text';
    };

    onMounted(() => {
        if (entityId) {
            fetchEntityStructure();
        } else {
            initializeFormData();
        }
    });

    watch(
        () => entityId,
        () => {
            if (entityId) fetchEntityStructure();
        }
    );

    return {
        formData,
        errors,
        entityStructure,
        handleSubmit,
        handleDelete,
    };
}
