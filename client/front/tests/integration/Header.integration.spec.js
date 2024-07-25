// tests/integration/Header.integration.spec.js
import { mount } from '@vue/test-utils';
import Header from '@/components/Header.vue';
import SmallCart from '@/components/Cart/SmallCart.vue';
import Cart from '@/components/Cart/Cart.vue';
import BurgerMenu from '@/components/BurgerMenu.vue';

describe('Header.vue Integration', () => {
    it('should render child components correctly', () => {
        const wrapper = mount(Header, {
            global: {
                components: {
                    SmallCart,
                    Cart,
                    BurgerMenu
                }
            }
        });
        expect(wrapper.findComponent(SmallCart).exists()).toBe(true);
        expect(wrapper.findComponent(Cart).exists()).toBe(true);
        expect(wrapper.findComponent(BurgerMenu).exists()).toBe(true);
    });
});