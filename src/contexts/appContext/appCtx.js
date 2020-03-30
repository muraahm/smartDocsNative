import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import {
  reducer,
  LOGGEDIN
} from "../../reducer/application";
import loginAppHelper from './loginAppHelper';
import registerAppHelper from './registerAppHelper';
import createCategoryHelper from './createCategoryHelper';
import listUserCategoriesHelper from './listUserCategoriesHelper';
import logoutHelper from './logoutHelper';
import getReceiptsHelper from './getReceiptsHelper';
import onAppReload from './onAppReload';


export const AppContext = createContext();

const AppContextProvider = (props) => {

  const [state, dispatch] = useReducer(reducer,
    {
      userInfo: {},
      userCategories: [],
      accountants: [],
      userReciepts: [],
      loggedin: false
    }
  );

  //client login api call
  const login = useCallback(async (email, password) => {
    await loginAppHelper(email, password, dispatch);
  }, [loginAppHelper, dispatch]);

  //handle client register api call
  const register = useCallback(async (name, email, password) => {
    await registerAppHelper(name, email, password, dispatch);
  }, [registerAppHelper, dispatch]);

  const createCategory = useCallback(async (name, email, acct_company) => {
    await createCategoryHelper(name, email, acct_company, dispatch);
  }, [createCategoryHelper, dispatch]);

  //get all user categories from the database
  const listUserCategories = useCallback(async (email) => {
    await listUserCategoriesHelper(email, dispatch);
  }, [listUserCategoriesHelper, dispatch]);

  //set to empty state and remove token while loggin out
  const logout = useCallback(async () => {
    await logoutHelper(dispatch, loggedin);
  }, [logoutHelper, dispatch, loggedin]);

  //get all available files for the client from the database
  const getReceipts = useCallback(async (categoryId, userId) => {
    await getReceiptsHelper(categoryId, userId, dispatch);
  }, [getReceiptsHelper, dispatch]);

  //handle component views
  const loggedin = (value) => {
    dispatch({ type: LOGGEDIN, value: value });
  };

  const appReload = useCallback(async () => {
    await onAppReload(dispatch, loggedin);
  }, [onAppReload, dispatch, loggedin]);

  useEffect(
    () => { appReload() }, []);

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
      }}>
      {props.children}
    </AppContext.Provider>
  )
};

export default AppContextProvider;