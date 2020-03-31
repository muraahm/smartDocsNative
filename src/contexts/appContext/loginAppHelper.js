import axios from "axios";
import config from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SET_USER_INFO,
  SET_USER_CATEGORIES,
  SET_ACCOUNTANTS,
} from "../../reducer/application";



const loginAppHelper = async (email, password, dispatch) => {

  const userData = await axios.post(
    `${config.API_PATH}/api/login/`, { email, password })
  const userInfo = userData.data;
  //dispatch client info to the reducer
  dispatch({ type: SET_USER_INFO, value: userInfo });
  AsyncStorage.setItem('token', userData.data.token);
  console.log('userData', userData.data)

  //grab all available categories
  const userCategoriesData = await axios.get(
    `${config.API_PATH}/api/user/categories/list/${email}`, { email })
  const userCategories = userCategoriesData.data;
  dispatch({ type: SET_USER_CATEGORIES, value: userCategories });

  //grab all available accountants
  const accountantsData = await axios.get(`${config.API_PATH}/api/accountants`)
  const accountants = accountantsData.data;
  dispatch({ type: SET_ACCOUNTANTS, value: accountants });
};

export default loginAppHelper;