import axios from "axios";
import config from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import { SET_APP_DATA } from "../../reducer/application";

//get token value from storage
const getStorageData = async (data) => {
  try {
    const value = await AsyncStorage.getItem(data)
    return value
  } catch (e) {
    console.log(e)
  }
};

const onAppReload = async (dispatch, loggedin) => {

  try {
    //get token from storage
    const token = await getStorageData('token');
    //api calls if client logged in and token valid
    const [accountants, user] = await Promise.all([
      axios.get(`${config.API_PATH}/api/accountants`),
      axios.post(`${config.API_PATH}/api/user`, { token })
    ]);

    await loggedin(true)
    await dispatch({
      type: SET_APP_DATA,
      value: {
        accountants: accountants.data,
        userInfo: user.data.userInfo,
        userCategories: user.data.categories
      }
    })
  } catch (e) {
    console.log(e)
  }
};

export default onAppReload;