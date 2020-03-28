import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import config from '../config';
import {
  reducer,
  SET_USER_INFO,
  SET_USER_CATEGORIES,
  SET_ACCOUNTANTS,
  SET_APP_DATA,
  SET_USER_RECIEPTS,
  LOGGEDIN
} from "../reducer/application";


export const AppContext = createContext();

const AppContextProvider = (props) => {

  const [state, dispatch] = useReducer(reducer,
    {
      // INIT STATE
      userInfo: {},
      userCategories: [],
      accountants: [],
      userReciepts: [],
      loggedin: false
    }
  );

  //get token value from storage
  const getStorageData = async (data) => {
    try {
      const value = await AsyncStorage.getItem(data)
      return value
    } catch (e) {
      console.log(e)
    }
  };

  const removeStorageData = async (data) => {
    try {
      await AsyncStorage.removeItem(data)
    } catch (e) {
      console.log(e)
    }
  };

  //client login api call
  const login = (email, password) => {
    return axios.post(`${config.API_PATH}/api/login/`, { email, password })
      .then(response => {
        AsyncStorage.setItem('token', response.data.token);
        const userInfo = response.data;
        //dispatch client info to the reducer
        dispatch({ type: SET_USER_INFO, value: userInfo });
      })
      .then(
        //grab all available categories
        axios.get(`${config.API_PATH}/api/user/categories/list/${email}`, { email })
          .then(response => {
            const userCategories = response.data;
            dispatch({ type: SET_USER_CATEGORIES, value: userCategories });
          }))
      .then(
        //grab all available accountants
        axios.get(`${config.API_PATH}/api/accountants`)
          .then(response => {
            const accountants = response.data;
            dispatch({ type: SET_ACCOUNTANTS, value: accountants });
          })
      )
  };

  //handle client register api call
  const register = (name, email, password) => {
    return axios.put(`${config.API_PATH}/api/users/register`, { name, email, password })
      .then(response => {
        AsyncStorage.setItem('token', response.data.token);
        const userInfo = response.data;
        dispatch({ type: SET_USER_INFO, value: userInfo });
      })
      .then(
        axios.get(`${config.API_PATH}/api/accountants`)
          .then(response => {
            const accountants = response.data;
            dispatch({ type: SET_ACCOUNTANTS, value: accountants });
          })
      )
  };

  //set to empty state and remove token while loggin out
  const logout = () => {
    const userInfo = {};
    const userCategories = [];
    loggedin(false)
    removeStorageData('token')
    dispatch({ type: SET_USER_INFO, value: userInfo });
    dispatch({ type: SET_USER_CATEGORIES, value: userCategories });
  };

  const createCategory = (name, email, acct_company) => {
    return axios.put(`${config.API_PATH}/api/users/create/category`, { name, email, acct_company })
      .then(response => {
        axios.get(`${config.API_PATH}/api/user/categories/list/${email}`, { email })
          .then(response => {
            const userCategories = response.data;
            dispatch({ type: SET_USER_CATEGORIES, value: userCategories });
          })
      })
  };

  //get all user categories from the database 
  const listUserCategories = (email) => {
    axios.get(`${config.API_PATH}/api/user/categories/list/${email}`, { email })
      .then(response => {
        const userCategories = response.data;
        dispatch({ type: SET_USER_CATEGORIES, value: userCategories });
      })
  };

  //get all available files for the client from the database
  const getReceipts = (categoryId, userId) => {
    return axios.post(`${config.API_PATH}/api/user/reciepts`, { categoryId, userId })
      .then(response => {
        const userReciepts = response.data
        dispatch({ type: SET_USER_RECIEPTS, value: userReciepts });
      })
  };

  //handle component views
  const loggedin = (value) => {
    dispatch({ type: LOGGEDIN, value: value });
  };

  useEffect(
    () => {

      //get token from storage
      getStorageData('token').then((token) => {

        //use effect api call if client logged in
        Promise.all([
          axios.get(`${config.API_PATH}/api/accountants`),
          axios.post(`${config.API_PATH}/api/user`, { token })
        ])
          .then((all) => {
            loggedin(true)
            dispatch({
              type: SET_APP_DATA,
              value: {
                accountants: all[0].data,
                userInfo: all[1].data.userInfo,
                userCategories: all[1].data.categories
              }

            });
          })
          .catch(err => {
            // console.log(err.response.status);
            // console.log(err.response.headers);
            // console.log(err.response.data);
          });
      })
    }, []);

  return (
    <AppContext.Provider value={
      {
        state,
        dispatch,
        login,
        register,
        logout,
        createCategory,
        listUserCategories,
        getReceipts,
        loggedin,
        getStorageData
      }}>
      {props.children}
    </AppContext.Provider>
  )
};

export default AppContextProvider;