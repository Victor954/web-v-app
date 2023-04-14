import { requireDir } from '@/helpers/require';

const components = requireDir<Object>(module , {
    mapFromResult: (modules) => {
        
        return modules.reduce((acc , curr) => ({
            ...acc,
            ...curr
         }) , {});
    }
});

export default components;