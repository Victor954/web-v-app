import YAML from 'yaml';
import fs from 'fs';
import { resolve } from 'path';

const file = fs.readFileSync(resolve(__dirname , 'swagger.yml'), 'utf-8');

export default YAML.parse(file);