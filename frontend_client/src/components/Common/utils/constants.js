export const HOST = 'http://localhost:4000';
export const API_URL = `${HOST}/api`;

export const AUTH_ROUTES = `${API_URL}/auth`;
export const CATEGORY_ROUTES = `${API_URL}/category`;
export const SERVICE_ROUTES = `${API_URL}/service`;
export const ORDER_ROUTE = `${API_URL}/order`;
export const REVIEW_ROUTE = `${API_URL}/review`;

export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/register`;
export const VERIFY_ROUTE = `${AUTH_ROUTES}/verify-user`;
export const COMPLETE_PROFILE = `${AUTH_ROUTES}/complete-profile`;
export const GET_USER_INFO = `${AUTH_ROUTES}/me`;
export const SET_USER_INFO = `${AUTH_ROUTES}/set-user-info`;
export const SET_USER_IMAGE = `${AUTH_ROUTES}/profile-picture`;
export const SWITCH_ROLE = `${AUTH_ROUTES}/switch-role`
export const LOGOUT = `${AUTH_ROUTES}/logout`

export const GET_ALL_CATEGORIES = `${CATEGORY_ROUTES}/`;
export const CREATE_SERVICE_ROUTE = `${SERVICE_ROUTES}/`;
export const UPDATE_SERVICE_ROUTE = `${SERVICE_ROUTES}`
export const GET_SERVICE_ROUTE = `${SERVICE_ROUTES}/`;
export const GET_FILTER_SERVICE_ROUTE = `${SERVICE_ROUTES}/filter`
export const GET_SERVICE_DATA_ROUTE = `${SERVICE_ROUTES}/`
export const GET_MY_SERVICE_DATA_ROUTE = `${SERVICE_ROUTES}/myServices`
export const CREATE_SERVICE_COVER_PHOTO = `${SERVICE_ROUTES}/cover-photo`;
export const CREATE_ORDER_ROUTE = `${ORDER_ROUTE}/`
export const GET_MY_ORDERS = `${ORDER_ROUTE}/`
export const CANCEL_ORDER_ROUTE = `${ORDER_ROUTE}/cancel`
export const EDIT_ORDER_ROUTE = `${ORDER_ROUTE}/update`
export const SERVICE_PROVIDER_ORDER_STATUS_CHANGE = `${ORDER_ROUTE}/service-provider`
export const CREATE_REVIEW = `${REVIEW_ROUTE}/`
