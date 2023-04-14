import options from './options.json';
import paths from './paths';
import schemas from './components';

export default {
    ...options,
    paths,
    components: {
        schemas
    }
};