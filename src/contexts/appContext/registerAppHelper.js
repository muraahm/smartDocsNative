import axios from "axios";
import config from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SET_USER_INFO,
  SET_ACCOUNTANTS,
} from "../../reducer/application";

const registerAppHelper = async (name, email, password, dispatch) => {
  try {
    const userData = await axios.put(
      `${config.API_PATH}/api/users/register`, { name, email, password });
    const userInfo = userData.data;
    dispatch({ type: SET_USER_INFO, value: userInfo });

    const accountantsData = await axios.get(`${config.API_PATH}/api/accountants`)
    const accountants = accountantsData.data;
    dispatch({ type: SET_ACCOUNTANTS, value: accountants });

    AsyncStorage.setItem('token', user.data.token);
  } catch (e) {
    console.log(e)
  }
};

export default registerAppHelper;