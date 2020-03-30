import axios from "axios";
import config from '../../config';
import { SET_USER_RECIEPTS } from "../../reducer/application";

const getReceiptsHelper = async (categoryId, userId, dispatch) => {
  try {
    const receiptsData = await axios.post(
      `${config.API_PATH}/api/user/reciepts`, { categoryId, userId });
    const userReciepts = receiptsData.data
    dispatch({ type: SET_USER_RECIEPTS, value: userReciepts });

  } catch (e) {
    console.log(e)
  }
};

export default getReceiptsHelper;