export const BASE_URL = process.env.NODE_ENV == 'development' ? 
'http://localhost:5000' : '';

export const NEWCARS_URL = '/api/newcars';
export const USEDCARS_URL = '/api/usedcars';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
export const UPLOADS_URL = '/api/upload';
export const REVIEWS_URL = '/api/reviews'