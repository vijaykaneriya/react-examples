import * as  Constants from './Constants';

export const setSessionDataAsObject = (keyAsString, value) => {
    sessionStorage.setItem(keyAsString, JSON.stringify(value));
}

export const saveLocalData =(key,value)=>
{
    console.log("saveLocalData called: ",key," Value: ",value);
    try {
        if (typeof value === 'object') 
        localStorage.setItem(key, JSON.stringify(value));
        else
        localStorage.setItem(key, value);
    } catch (error) {
      console.log("error saveLocalData: ",error[Constants.KEY_MESSAGE]);
        
    }
   
}


export const getLocalData = (key) =>
{
  return  localStorage.getItem(key,"");
}


export const getLocalDataObj = (key) =>
{
  let dataValue=  localStorage.getItem(key,undefined);
  if(dataValue)
  dataValue=JSON.parse(dataValue);
  return dataValue;
}


export const getSessionDataAsObject = (keyAsString) => {
    //  alert('getSessionDataAsObject=', keyAsString + '=' + sessionStorage.getItem(keyAsString))

    if (sessionStorage.getItem(keyAsString) != undefined) {
        var objData = undefined;
        try {
            var data = sessionStorage.getItem(keyAsString);
            if (typeof data !== "undefined" && data !== "undefined") {
                objData = JSON.parse(data);
            }
        } catch (error) {
            console.log(' error getSessionDataAsObject : ', error[Constants.KEY_MESSAGE]);
        }
        return objData;
    }
}

export const clearLocalData = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.log('logout 2 error ::::: ', error[Constants.KEY_MESSAGE]);
        // Error retrieving data
    }

}

export const clearSessionData = () => {
    try {
        sessionStorage.clear();
    } catch (error) {
        console.log('logout 2 error ::::: ', error[Constants.KEY_MESSAGE]);
        // Error retrieving data
    }

}