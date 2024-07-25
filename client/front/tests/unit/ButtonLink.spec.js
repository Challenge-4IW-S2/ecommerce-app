// tests/unit/ButtonLink.spec.js
import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import ButtonLink from '../../src/components/Links/ButtonLink.vue';

describe('ButtonLink.vue', () => {
    it('renders correctly', () => {
        const wrapper = shallowMount(ButtonLink, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            },
            props: {
                to: '/some-path',
                text: 'Click Me'
            }
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.text()).toBe('Click Me');
    });

    it('navigates to the correct path on click', async () => {
        const wrapper = shallowMount(ButtonLink, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            },
            props: {
                to: '/some-path',
                text: 'Click Me'
            }
        });
        await wrapper.trigger('click');
        expect(wrapper.emitted().click).toBeTruthy();
    });
});