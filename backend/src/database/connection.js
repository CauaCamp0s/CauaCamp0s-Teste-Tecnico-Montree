import { createRequire } from 'module';
import knexConfig from '../../knexfile.js';

const require = createRequire(import.meta.url);
const knex = require('knex');

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

export default knex(config);
