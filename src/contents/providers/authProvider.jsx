import PropTypes from 'prop-types';
import React, {
  createContext, useState, useContext,
} from 'react';
import Cookies from 'js-cookie';

import { useLogin } from '../api/auth/login';
import { Logger } from '../api/logger';

const defaultAuth = {
  authToken: '',
  authRefreshToken: '',
};

const AuthContext = createContext({
  ...defaultAuth,
  login: () => { },
  resetAuth: () => { },
});

const useAuthProvider = () => {
  const [auth, setAuth] = useState(defaultAuth);
  const { authLogin } = useLogin();

  const login = async ({ network, address, signature }) => {
    try {
      const data = await authLogin({ network, address, signature });
      Cookies.set('token', data.token);
      Cookies.set('refreshToken', data.refreshToken);
      setAuth({
        authToken: data.token,
        authRefreshToken: data.refreshToken,
      });
    } catch (e) {
      Logger.error({ error: e, message: 'login error' });
    }
  };

  const resetAuth = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    setAuth(defaultAuth);
  };

  return {
    ...auth,
    login,
    resetAuth,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
