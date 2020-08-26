import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * Create an Axios Client with defaults
 */

const UN_AUTHORISE_STATUS_CODE = 401;

const headers = Cookies.get('accessToken')
  ? { Authorization: `Bearer ${Cookies.get('accessToken')}` }
  : null;

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers
});

client.interceptors.response.use(undefined, err => {
  const error = err.response;
  if (error.status === UN_AUTHORISE_STATUS_CODE) {
  }
  // if error is 401
  // if (error.status===401 && error.config &&
  //     !error.config.__isRetryRequest) {
  //     // request for a new token
  //     return getAuthToken().then(response => {
  //         // update the error config with new token
  //         error.config.__isRetryRequest = true;
  //         error.config.headers.token= localStorage.getItem("accessToken");
  //         return client(error.config);
  //     });
  // }
});

/**
 * Request Wrapper with default success/error actions
 */
const request = function(options) {

  const onSuccess = function(response) {
    if (options.upload) {
      return response;
    }
    const { data: responseData } = response;

    // if (responseData.status !== 0) {
    //     const { errorMessage, errorCode } = responseData.data;
    //     throw new Error(errorMessage, errorCode);
    // }
    return responseData;
  };

  const onError = function(error) {
    if (error.response) {
      console.debug('Status:', error.response.status);
      console.debug('Data:', error.response.data);
      console.debug('Headers:', error.response.headers);
    } else {
      console.debug('options', JSON.stringify(options));
      console.debug('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client({
    ...options
    // withCredentials: true,
    // credentials: 'include'
  })
  .then(onSuccess)
  .catch(onError);
};

export default request;
