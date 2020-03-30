import AsyncStorage from '@react-native-community/async-storage';
import { SET_USER_INFO, SET_USER_CATEGORIES } from "../../reducer/application";

const removeStorageData = async (data) => {
  try {
    await AsyncStorage.removeItem(data)
  } catch (e) {
    console.log(e)
  }
};

const logoutHelper = (dispatch, loggedin) => {
  const userInfo = {};
  const userCategories = [];
  loggedin(false)
  removeStorageData('token')
  dispatch({ type: SET_USER_INFO, value: userInfo });
  dispatch({ type: SET_USER_CATEGORIES, value: userCategories });
};

export default logoutHelper;