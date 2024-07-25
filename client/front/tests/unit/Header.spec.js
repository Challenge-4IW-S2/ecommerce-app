// tests/unit/Header.spec.js
import { shallowMount } from '@vue/test-utils';
import Header from '../../src/components/Header.vue';
import SmallCart from '../../src/components/Cart/SmallCart.vue';
import Cart from '../../src/components/Cart/Cart.vue';
import BurgerMenu from '../../src/components/BurgerMenu.vue';
import ButtonLink from '../../src/components/Links/ButtonLink.vue';

describe('Header.vue', () => {
    it('renders correctly', () => {
        const wrapper = shallowMount(Header, {
            global: {
                components: {
                    SmallCart,
                    Cart,
                    BurgerMenu,
                    ButtonLink,
                }
            }
        });
        expect(wrapper.exists()).toBe(true);
    });
});