import atob from 'atob';
import ApiService from './ApiService';
import { useDispatch } from 'react-redux';
import appConstant from '../components/appConstant';

const useAuthService = () => {
  const dispatch = useDispatch();
  const apiService = new ApiService(appConstant.API_ENDPOINT);

  const b64DecodeUnicode = (str) =>
    decodeURIComponent(
      Array.prototype.map
        .call(
          atob(str),
          (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        )
        .join('')
    );

  const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(b64DecodeUnicode(base64));
  };

  const populateToken = (data) => {
    const userInfo = parseJwt(data.access_token);
    const authorizationData = { ...data, ...userInfo };
    setAuthentication(authorizationData);
    localStorage.setItem(
      'authorizationData',
      JSON.stringify(authorizationData)
    );
  };

  const setAuthentication = (data) => {
    dispatch({
      type: 'SET_AUTHENTICATION',
      authentication: {
        ...data,
        isAuth: data.token ? true : false,
      },
    });
  };
  

  const login = (loginData) => {
    console.log('xyz', appConstant);
    return apiService
      .post(appConstant.INTERNAL_AUTH_BASE_URL + 'login', loginData, true)
      .then((res) => res.json())
      .then((res) => {
        populateToken(res.data);
        return res.data;
      });
  };

  const registerUser = (registerData) => {
    return apiService
      .post(
        appConstant.INTERNAL_AUTH_BASE_URL + '/Register',
        registerData,
        true
      )
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };

  const googleLogin = (tokenId) => {
    return apiService
      .post(
        appConstant.INTERNAL_AUTH_BASE_URL + '/LoginWithGoogle',
        { ExternalAccessToken: tokenId },
        true
      )
      .then((res) => res.json())
      .then((res) => {
        populateToken(res.data);
        return res.data;
      });
  };

  const logOut = () => {
    const authData = {
      isAuth: false,
      email: '',
      name: '',
      image: '',
      access_token: '',
      phoneNumber: '',
      expiration: '',
      role: '',
    };
    setAuthentication(authData);

    localStorage.setItem('authorizationData', JSON.stringify(authData));
  };

  return {
    authService: {
      login,
      registerUser,
      googleLogin,
      logOut,
      setAuthentication,
    },
  };
};

export default useAuthService;
