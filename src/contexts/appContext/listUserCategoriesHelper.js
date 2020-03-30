import axios from "axios";
import config from '../../config';
import { SET_USER_CATEGORIES } from "../../reducer/application";

const listUserCategoriesHelper = async (email, dispatch) => {

  try {
    const userCategoriesData = await axios.get(
      `${config.API_PATH}/api/user/categories/list/${email}`, { email })
    const userCategories = userCategoriesData.data;
    dispatch({ type: SET_USER_CATEGORIES, value: userCategories });

  } catch (e) {
    console.log(e)
  }
};

export default listUserCategoriesHelper;