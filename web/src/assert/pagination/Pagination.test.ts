import { mount, VueWrapper } from '@vue/test-utils';
import { ComponentOptionsWithObjectProps } from 'vue';
import Pagination from './PAgination.vue';

type Props = {
    totalItemsCount: number,
    pageItemsCount: number
}

describe('Pagination testing' , () => {

    let wrapper: VueWrapper<any> | null = null;

    beforeAll(() => {
        const props: Props = {
            pageItemsCount: 10,
            totalItemsCount: 200
        } 

        wrapper = mount(Pagination , {
            props
        });
    })

    test('' , () => {

        expect(extractPageNumber(wrapper)).toEqual(['1' , '1' , '2' , '3' , '4' , '5' , '6' , '20']);
    });
    
    test('' , async () => {

        await findByTextAndTriggerClick('2' , wrapper);
        await expect(extractPageNumber(wrapper)).toEqual(['1', '1' , '2' , '3' , '4' , '5' , '6' , '20']);
    });

    test('' , async () => {

        await findByTextAndTriggerClick('3' , wrapper);
        await expect(extractPageNumber(wrapper)).toEqual(['1', '1' , '2' , '3' , '4' , '5' , '6' , '20']);
    });

    test('' , async () => {

        await findByTextAndTriggerClick('4' , wrapper);
        await expect(extractPageNumber(wrapper)).toEqual(['1', '2' , '3' , '4' , '5' , '6' , '7' , '20']);
    });

    test('' , async () => {

        await findByTextAndTriggerClick('7' , wrapper);
        await expect(extractPageNumber(wrapper)).toEqual(['1', '5' , '6' , '7' , '8' , '9' , '10' , '20']);
    });


    test('' , async () => {

        await findByTextAndTriggerClick('20' , wrapper);
        await expect(extractPageNumber(wrapper)).toEqual(['1' ,'15' , '16' , '17' , '18' , '19' , '20' , '20']);
    });

    test('' , async () => {

        await findByTextAndTriggerClick('15' , wrapper);
        await expect(extractPageNumber(wrapper)).toEqual(['1' ,'13' , '14' , '15' , '16' , '17' , '18' , '20']);
    });
});

async function findByTextAndTriggerClick(text:string , wrapper: VueWrapper<any> | null) {

    const pageLink = wrapper!.findAll('[data-test="page-link"]').find(wp => wp.text() === text);

    await pageLink!.trigger('click');
}

function extractPageNumber(wrapper: VueWrapper<any> | null) {
    return wrapper!.findAll('[data-test="page-link"]').map(wp => wp.text());
}