import axios from 'axios';

const axiosCommonConfig = { timeout: 60000 };

export const commonHttpClient = axios.create(axiosCommonConfig);
