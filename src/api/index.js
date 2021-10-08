import axios from 'axios';

import {URL_BASE} from './urls';

export default axios.create(
    {
        baseURL:URL_BASE,
    }
);