import { reducerCases } from "./constants";


export const getLocalItems = (name) => {
  let list = localStorage.getItem(name);
  if (list) {
    return list;
  }
  else {
    return null;
  }
}
export const initialState = {
  userInfo: undefined,
  showOrderModal: false,
  showOrderDetailModal: false,
  isSeller: false,
  authData: getLocalItems("token") || null,
  gigData: undefined,
  verifyEmail: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.AUTH_SUCCESS:
      localStorage.setItem("token", action.authData);
      //   setTimeout(() => {
      //     localStorage.removeItem('token');
      //  }, (59 * 60 * 1000))
      return {
        ...state,
        authData: action.authData,
      };
    case reducerCases.LOGOUT_SUCCESS:
      localStorage.removeItem("token")
      return {
        ...state,
        authData: action.authData,
      };

    case reducerCases.TOGGLE_ORDER_MODAL:
      return {
        ...state,
        showOrderModal: action.showOrderModal,
      };
    case reducerCases.CLOSE_ORDER_MODAL:
      return {
        ...state,
        showOrderModal: false,
      };
    case reducerCases.TOGGLE_ORDER_DETAIL_MODAL:
      return {
        ...state,
        showOrderDetailModal: action.showOrderDetailModal,
      };
    case reducerCases.CLOSE_ORDER_DETAIL_MODAL:
      return {
        ...state,
        showOrderDetailModal: false,
      };
    case reducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SWITCH_MODE:
      return {
        ...state,
        isSeller: action.isSeller,
      };
    case reducerCases.SET_GIG_DATA:
      return {
        ...state,
        gigData: action.gigData,
      };
    case reducerCases.SET_USER_VERIFY_EMAIL:
      return {
        ...state,
        verifyEmail: action.verifyEmail,
      };
    case reducerCases.ADD_REVIEW:
      return {
        ...state,
        gigData: {
          ...state.gigData,
          reviews: [...state.gigData.specificService.reviews, action.newReview],
        },
      };
    default:
      return state;
  }
};

export default reducer;
