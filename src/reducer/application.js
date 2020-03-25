const SET_USER_INFO = "SET_USER_INFO"
const SET_USER_CATEGORIES = "SET_USER_CATEGORIES"
const SET_ACCOUNTANTS = "SET_ACCOUNTANTS"
const SET_APP_DATA = "SET_APP_DATA"
const SET_USER_RECIEPTS = "SET_USER_RECIEPTS"

function reducer(state, action) {

  switch (action.type) {

    case SET_USER_INFO:
      return { ...state, userInfo: action.value }

    case SET_USER_CATEGORIES:
      return { ...state, userCategories: action.value }

      case SET_USER_RECIEPTS:
        return { ...state, userReciepts: action.value}

    case SET_ACCOUNTANTS:
      return { ...state, accountants: action.value }

    case SET_APP_DATA:
      return {
        ...state,
        userInfo: action.value.userInfo,
        userCategories: action.value.userCategories,
        accountants: action.value.accountants
      }


    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export {
  reducer,
  SET_USER_INFO,
  SET_USER_CATEGORIES,
  SET_ACCOUNTANTS,
  SET_APP_DATA,
  SET_USER_RECIEPTS
};