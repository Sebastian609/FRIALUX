export const API_BASE_URL = import.meta.env.VITE_PRODUCTION
  ? import.meta.env.VITE_API_PROD_URL
  : import.meta.env.VITE_API_DEV_URL;


  export const WS_BASE_URL = import.meta.env.VITE_PRODUCTION
  ? import.meta.env.VITE_WS_PROD_URL
  : import.meta.env.VITE_WS_DEV_URL;
