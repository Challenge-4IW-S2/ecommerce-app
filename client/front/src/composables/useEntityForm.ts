import { ref, reactive, onMounted, watch } from 'vue';
import ky from 'ky';
import { z } from 'zod';
import sweetalert from 'sweetalert2';
import {
    fetchModelStructure,
    filterUnwantedFields,
    getEntitySchema,
    handleHttpResponse
} from '../functions/model.js';

const unwantedFields = ['token','createdAt', 'updatedAt', 'is_verified','deleted','is_active', 'user_id', "product_id", "password_updated_at"];
export function useEntityForm(entityType, entityId = null,BASE_URL) {
    const formData = reactive({});
    const entitySchema = ref(getEntitySchema(entityType));
    const entityStructure = ref([]);
    const errors = ref({});
    const isEditing = ref(Boolean(entityId));
    let addressOptions = ref([]);
    let categorieOption = ref([]);
    let images = ref([]);

    const getRoleOptions = async () => {
        try {
            const response = await ky.get(`${BASE_URL}/userRoles`).json();
            return response.map(role => ({
                value: role.id,
                label: role.name
            }));
        } catch (error) {
            console.error('Failed to fetch roles:', error);
            return [];
        }
    };
    const getAdressOptions = async () => {
        try {
            const response = await ky.get(`${BASE_URL}/address/${entityId}/addresses`).json();
            return response.map(address => ({
                id: address.id,
               street: address.street,
               city: address.city,
                postal_code: address.postal_code,
                country: address.country,
            }));
        } catch (error) {
            console.error('Failed to fetch addresses:', error);
            return [];
        }
    };

    const getCategorieOptions = async () => {
        try {
            const response = await ky.get(`${BASE_URL}/categories`).json();
            return response.map(categorie => ({
                value: categorie.id,
                label: categorie.name
            }));
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return [];
        }
    };

    const getProductPictureOptions = async () => {
        try {
            const response = await ky.get(`${BASE_URL}/productPicture/${entityId}/productPictures`).json();
            return response.map(picture => ({
                id: picture.id,
                url: picture.url.replace(/^.*[\\\/]/, '')
            }));
        } catch (error) {
            console.error('Failed to fetch pictures:', error);
            return [];
        }
    }


    const fetchEntityStructure = async () => {
            try {
                unwantedFields.push('id');
                let response = {};
                if (entityId) {
                    response = await ky.get(`${BASE_URL}/${entityType}/${entityId || ''}`).json();
                } else {
                    const [structure] = await Promise.all([fetchModelStructure(entityType.charAt(0).toUpperCase() + entityType.slice(1))]);
                    response = structure;
                    response = structure.reduce((acc, field) => {
                        acc[field.name] = field.defaultValue || '';
                        return acc;
                    }, {});
                }

                const cleanedResponse = filterUnwantedFields(response, unwantedFields);
                let roleOptions = [];
                if (entityType === 'user') {
                    roleOptions = await getRoleOptions();
                    if (entityId) {
                        addressOptions.value = await getAdressOptions();
                    }
                }
                if (entityType === 'product') {
                    categorieOption = await getCategorieOptions();
                    if (entityId) {
                        images.value = await getProductPictureOptions();
                    }
                }
                entityStructure.value = Object.keys(cleanedResponse).map(key => {
                    const field = {
                        name: key,
                        value: cleanedResponse[key],
                        type: getTypeForKey(key, cleanedResponse[key])
                    };
                    if (key === 'role') {
                        field.is = 'select';
                        field.options = roleOptions;
                        field.value = roleOptions.find(role => role.value === field.value)?.label;
                    }
                    if (key === 'category_id') {
                        field.is = 'select';
                        field.options = categorieOption;
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
                console.log(errors.value)
            }
            return false;
        }
    };

    const handleSubmit = async () => {
            if (!validateForm()) return;
        try {
                const method = isEditing.value ? 'patch' : 'post';

                const cleanedData = filterUnwantedFields(formData, unwantedFields);
                const response = await ky[method](`${BASE_URL}/${entityType}/${entityId || ''}`, {
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
    };

    const handleDelete = async () => {
        if (entityId) {
            try {
                await ky.delete(`${BASE_URL}/${entityType}/${entityId}`).json();
                console.log(`${entityType} deleted successfully`);
            } catch (error) {
                console.error(`Failed to delete ${entityType}:`, error);
            }
        }
    };

    const getTypeForKey = (key, value) => {
        if (typeof value === 'number' )  return 'number';
        if (typeof value === 'boolean') return 'checkbox';
        if (typeof value === 'string' && (key.includes('email') || key.includes('Email'))) return 'email';
        if (typeof value === 'string' && (key.includes('password') || key.includes('Password'))) return 'password';
        if (typeof value === 'string' && (key.includes('phone') || key.includes('Phone'))) return 'tel';
        if ((key.includes('role') || key.includes('Role')) ) return 'select';
        if ((key.includes('quantity') || key.includes('Quantity')) ) return 'number';
        return 'text';
    };

    onMounted(() => {
        if (entityType) {
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
        images,
        addressOptions,
        handleSubmit,
        handleDelete,
    };
}
