import { requireDir } from '@/helpers/require';

export default requireDir<Object>(module , {
    mapFromResult: (modules) => {

        return modules.reduce((acc , curr) => ({
            ...acc,
            ...curr
         }) , {});
    }
});