import { mount } from '@vue/test-utils';
import PageNumber from './PageNumber.vue';

type Props = {
    number?: string,
    active?: boolean,
    disabled?: boolean
}

describe('PageNumber testing render with props' , () => {

    test('render with default props' , () => {

        const linkWrapper = mountAnGetLinkWrapper({});

        expect(linkWrapper.text()).toContain('');
        expect(linkWrapper.classes()).not.toContain(['active' , 'disabled']);
        
    });


    test('render with number props' , () => {

        const props = {
            number: '1'
        }

        const linkWrapper = mountAnGetLinkWrapper(props);

        expect(linkWrapper.text()).toContain('1');
    });

    test('render with active props' , () => {

        const props = {
            active: true
        }

        const linkWrapper = mountAnGetLinkWrapper(props);
        expect(linkWrapper.classes()).toContain('active');
    });

    test('render without active props' , () => {

        const props = {
            active: false
        }

        const linkWrapper = mountAnGetLinkWrapper(props);
        expect(linkWrapper.classes()).not.toContain('active');
    });

    test('render with disabled props' , () => {

        const props = {
            disabled: true
        }

        const linkWrapper = mountAnGetLinkWrapper(props);
        expect(linkWrapper.classes()).toContain('disabled');
    });

    test('render without disabled props' , () => {

        const props = {
            disabled: false
        }

        const linkWrapper = mountAnGetLinkWrapper(props);
        expect(linkWrapper.classes()).not.toContain('disabled');
    });
});

describe('PageNumber testing emits' ,  () => {

    test('trigger emit onClickNumber when click pageLing', async () => {
        const props = {
            number: '2'
        }

        const onClickNumberEmitted = await mountAndGetOnClickNumberEmit(props);
    
        await expect(onClickNumberEmitted).toHaveLength(1);
        await expect(onClickNumberEmitted[0]).toEqual([2]);
    })

    test('not trigger emit onClickNumber when click pageLing with active', async () => {
        const props = {
            active: true
        }

        const onClickNumberEmitted = await mountAndGetOnClickNumberEmit(props);
    
        await expect(onClickNumberEmitted).toBeUndefined();
    })

    test('not trigger emit onClickNumber when click pageLing with disabled', async () => {
        const props = {
            disabled: true
        }

        const onClickNumberEmitted = await mountAndGetOnClickNumberEmit(props);
    
        await expect(onClickNumberEmitted).toBeUndefined();
    })
});

function mountAnGetLinkWrapper(props: Props) {
    const wrapper = mount(PageNumber , {
        props
    });

    return wrapper.get('[data-test="page-link"]');
}

async function mountAndGetOnClickNumberEmit(props: Props) {
    const wrapper = mount(PageNumber , {
        props
    });

    const pageLinkWrapper = wrapper.get('[data-test="page-link"]');

    await pageLinkWrapper.trigger('click');

    return wrapper.emitted()['clickPage'];

}