import axios from 'axios';

import { REACT_APP_PIXABAY_API_KEY } from 'api/config';

export const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  withCredentials: false,
  params: {
    key: REACT_APP_PIXABAY_API_KEY,
    safesearch: true,
  },
});
