import * as ApiUrls from './ApiUrls';
import * as types from './types';
import * as Constants from '../utils/Constants';
import * as CustomStorage from '../utils/CustomStorage';
//import base64 from 'base-64';
var METHOD_TYPE_POST = 'post';
var METHOD_TYPE_GET = 'get';


/**
 * @param {*} data 
 * This will take data as JSON Object and return in Form Data Object or Multipart Object
 */
export const getFormDataFromObject = (data) => {
  let formData;
  if(data[Constants.IS_NOT_MULTIPART] && data[Constants.IS_NOT_MULTIPART] ===true)
  {
    formData=data;
  }
  else{

   formData = new FormData();
  for (var key in data) {
    if (typeof data[key] === 'object') {
      var dataValue = data[key];
      if (dataValue != null) {
        dataValue = ((JSON.stringify(dataValue)));
        dataValue = dataValue.replace(/\\/g, '');
      }
      if (dataValue !== undefined && dataValue !== null) {
        formData.append(key, dataValue);
      }

    }
    else {

      if (data[key] !== undefined && data[key] !== null) {
        console.log("getFormDataFromObject called 1", data[key]);

        formData.append(key, data[key]);
      }
    }
  }
}
  return formData;
}

/**
 * 
 * @param {*} responseTmp 
 * @param {*} dispatch 
 * @param {*} apiType 
 * @param {*} context 
 * 
 *  This will check api response is valid or not 
 */

export const isValidResponse = (responseTmp, dispatch, apiType, context) => {
  //console.log('apiType' + apiType + ' response : ', responseTmp);
  var isValid = true;
  var msg = '';
  var response = JSON.parse(responseTmp);
  
  if (response) {
    if (response.hasOwnProperty(Constants.KEY_ERROR) && response.hasOwnProperty(Constants.KEY_MESSAGE) && response[Constants.KEY_ERROR] === true) {
      if (response[Constants.KEY_MESSAGE] !== null && response[Constants.KEY_MESSAGE] !== '')
        msg = response[Constants.KEY_MESSAGE];
    }
  }
  if (msg !== '') {
    isValid = false;
    if (context !== undefined && context.handleResponse !== undefined) {
      context.handleResponse({ [Constants.KEY_SHOW_PROGRESS]: false, [Constants.KEY_TYPE]: apiType })
    }
    else {
      dispatch({ [Constants.KEY_TYPE]: 'reload', payload: { [Constants.KEY_SHOW_PROGRESS]: false } });
    }
    setTimeout(() => {
      alert(msg);
    }, 200)
  }
  else {
    if (context !== undefined && context.handleResponse !== undefined) {
      context.handleResponse({ [Constants.KEY_RESPONSE]: response, [Constants.KEY_TYPE]: apiType })
    }
    else {
      
      dispatch({[Constants.KEY_TYPE]: apiType,  payload: { [Constants.KEY_RESPONSE]: response,[Constants.KEY_TYPE]: apiType } });
    }
  }
  return isValid;
}

/**
 * 
 * @param {*} data 
 * @param {*} dispatch 
 * @param {*} apiUrl 
 * @param {*} typeValue 
 * @param {*} methodType 
 * @param {*} showPBar 
 * @param {*} context 
 * This function will after all validation checked 
 */
export const callApiFinal = (data, dispatch, apiUrl, typeValue, methodType, showPBar, context) => {

  
  if (context !== undefined && context.handleResponse !== undefined) {
    context.handleResponse({ [Constants.KEY_SHOW_PROGRESS]: showPBar, [Constants.KEY_TYPE]: typeValue })
  }
  else {
    dispatch({ [Constants.KEY_TYPE]: 'reload', payload: { [Constants.KEY_SHOW_PROGRESS]: showPBar } });
  }
  var reqObj = {
    method: methodType
  };
  const userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);

  console.log('global[Constants.KEY_USER_DATA] ', userData)
  // reqObj[Constants.KEY_HEADERS]={  'Content-Type': 'application/json'}
  // if (userData) {
    // reqObj[Constants.KEY_HEADERS] = {
    //   'Authorization': 'Basic ' + base64.encode('boneoblog' + ":" + 'Vq8_YYL5@boneo2'),
    // }
  // }
  if (methodType === METHOD_TYPE_POST) {
    if (data !== undefined && data !== null) {
      console.log('requestData: ' + JSON.stringify(data) + ' API Post: ' + apiUrl);
      const formData = getFormDataFromObject(data);
      reqObj[Constants.KEY_BODY] = formData;
    }

    fetch(apiUrl, reqObj).then(response => response.text())
      .then(res => isValidResponse(res, dispatch, typeValue, context)).catch(error => {
        if (context !== undefined && context.handleResponse !== undefined) {
          context.handleResponse({ [Constants.KEY_SHOW_PROGRESS]: false, [Constants.KEY_TYPE]: typeValue })
        }
        else {
          dispatch({ [Constants.KEY_TYPE]: 'reload', payload: { [Constants.KEY_SHOW_PROGRESS]: false } });
        }
        setTimeout(() => {
          alert(error);
        }, 200)
      })
  }
  else if (methodType === METHOD_TYPE_GET) {
    var finalUrl = apiUrl;
    console.log('requestData: ' + ' API GEt: ' + finalUrl);
    fetch(finalUrl, reqObj).then(response => response.text())
      .then(res => isValidResponse(res, dispatch, typeValue, context)).catch(error => {
        if (context !== undefined && context.handleResponse !== undefined) {
          context.handleResponse({ [Constants.KEY_SHOW_PROGRESS]: false, [Constants.KEY_TYPE]: typeValue })
        }
        else {
          dispatch({ [Constants.KEY_TYPE]: 'reload', payload: { [Constants.KEY_SHOW_PROGRESS]: false } });
        }
        setTimeout(() => {
          alert(error);
        }, 200)
      })
  }
}

/**
 * 
 * @param {*} data 
 * @param {*} dispatch 
 * @param {*} apiUrl 
 * @param {*} typeValue 
 * @param {*} methodType 
 * @param {*} isConnected 
 * @param {*} showPBar 
 * @param {*} context 
 * This function will check network connectivity, if network connected then it will proceed Api calling othewise show alert 
 */

export const callApiAfterNetChecking = async (data, dispatch, apiUrl, typeValue, methodType, isConnected, showPBar, context) => {
  if (isConnected) {
    callApiFinal(data, dispatch, apiUrl, typeValue, methodType, showPBar, context);
  } else {
    alert('Network is not available');
  }
}

export const callApi = async (data, dispatch, apiUrl, typeValue, methodType, showPBar, context) => {
  try {
    callApiAfterNetChecking(data, dispatch, apiUrl, typeValue, methodType, true, showPBar, context);
  } catch (e) {
    console.log('exception', e[Constants.KEY_MESSAGE]);
  }
}


export const reqGetPostListData = (data, context) => async (dispatch) => {
  let api = ApiUrls.URL_POSTS;

    callApi(data, dispatch, api,
    types.URL_POSTS, METHOD_TYPE_GET, true, context);
}

export const reqGetPostDetailData = (data, context) => async (dispatch) => {
  let api = ApiUrls.URL_DETAIL + "/"  + data[Constants.KEY_ID];

    callApi(data, dispatch, api,
    types.URL_DETAIL, METHOD_TYPE_GET, true, context);
}

export const reqGetPostCommentData = (data, context) => async (dispatch) => {
  let api = ApiUrls.URL_COMMENT + "/"  + data[Constants.KEY_ID] + "/" + types.URL_COMMENT;

    callApi(data, dispatch, api,
    types.URL_COMMENT, METHOD_TYPE_GET, true, context);
}

export const reqGetUserData = (data, context) => async (dispatch) => {
  let api = ApiUrls.URL_USERS + "/"  + data[Constants.KEY_ID];

    callApi(data, dispatch, api,
    types.URL_USERS, METHOD_TYPE_GET, true, context);
}

export const reqGetUserListData = (data, context) => async (dispatch) => {
  let api = ApiUrls.URL_USERS;

    callApi(data, dispatch, api,
    types.URL_USERS_LIST, METHOD_TYPE_GET, true, context);
}

export const reqGetUserWiseAlbumData = (data, context) => async (dispatch) => {
  let api = ApiUrls.URL_USERS_WISE_ALBUMS + "/"  + data[Constants.KEY_ID] + "/" + types.URL_ALBUMS;

    callApi(data, dispatch, api,
    types.URL_ALBUMS, METHOD_TYPE_GET, true, context);
}

export const reqGetUserWisetodosData = (data, context) => async (dispatch) => {
  let api = ApiUrls.URL_USERS_WISE_TODOS + "/"  + data[Constants.KEY_ID] + "/" + types.URL_TODOS;

    callApi(data, dispatch, api,
    types.URL_TODOS, METHOD_TYPE_GET, true, context);
}

export const reqPostRegisterData = (data, context) => async (dispatch) => {
  let api = ApiUrls.URL_REGISTER;

    callApi(data, dispatch, api,
    types.URL_REGISTER, METHOD_TYPE_POST, true, context);
}