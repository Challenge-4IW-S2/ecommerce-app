// tests/integration/Search.integration.spec.js
import { mount } from '@vue/test-utils';
import Search from '@/components/Search/Search.vue';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Search.vue API Integration', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should fetch search results correctly', async () => {
        // Mock the API response
        fetchMock.mockResponseOnce(JSON.stringify({ results: ['Product 1', 'Product 2'] }));

        const wrapper = mount(Search);

        // Trigger the search method
        await wrapper.vm.searchProducts('query');

        // Assert the API call
        expect(fetchMock).toHaveBeenCalledWith(`${import.meta.env.VITE_API_BASE_URL}/searchProduct?query=query`);

        // Assert the component's state based on the mocked response
        expect(wrapper.vm.results).toEqual(['Product 1', 'Product 2']);
    });
});