import moment from 'moment';
import * as Constants from './Constants';

//import latinize from 'latinize';
//import { isBrowser, isMobileOnly, isTablet } from "react-device-detect";


const emailPtrn = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

export const convertUTCMiliSToLocalDateFormat = (utcDateTime, forShowFormat) => {

  console.log("utcDateTime Value: ", utcDateTime);

  if (utcDateTime !== null && utcDateTime !== undefined && utcDateTime !== "") {

    utcDateTime = moment.unix(utcDateTime).format(forShowFormat);
  }
  else
    utcDateTime = "";
  return utcDateTime;
}



export const convertStrDateFormat = (utcDateTime, comingFormat, forShowFormat) => {
  if (utcDateTime !== null && utcDateTime !== undefined && utcDateTime !== "") {
    var momentObj = moment(utcDateTime, comingFormat);
    utcDateTime = momentObj.format(forShowFormat);
  }
  else
    utcDateTime = "";
  return utcDateTime;
}


export const convertStrDateFormatWithYearLastMonth = (utcDateTime, comingFormat, forShowFormat) => {
  if (utcDateTime !== null && utcDateTime !== undefined && utcDateTime !== "") {
    var momentObj = moment(utcDateTime, comingFormat);
    momentObj = momentObj.endOf('year').endOf('month');
    utcDateTime = momentObj.format(forShowFormat);
  }
  else
    utcDateTime = "";
  return utcDateTime;
}

export const isValidEmail = (value) => {
  //alert(value)
  if (value == '' || value == undefined) {
    return [Constants.PLEASE_ENTER_EMAIL];
  }
  else if (!value.match(emailPtrn)) {
    return [Constants.EMAIL_MUST_BE_VALID];
  }
  return "";

}

export const isValidName = (value) => {
  if (value == '' || value == undefined) {
    return [Constants.PLEASE_ENTER_NAME];
  } else if ((value.trim().length < 2)) {
    return [Constants.NAME_MUST_BE_VALID];
  }
  return '';

}

export const isValidComment = (value) => {
  if (value == '' || value == undefined) {
    return [Constants.PLEASE_ENTER_COMMENTS];
  } else if ((value.trim().length < 2)) {
    return [Constants.COMMENT_MUST_BE_VALID];
  }
  return '';

}

export const isValidID = (value) => {
  if (value == '' || value == undefined) {
    return [Constants.PLEASE_ENTER_ID];
  }
  return '';

}

export const getFormatedAddress = (property_address, province, area, city) => {

  if (!property_address) {
    property_address = '';
  }

  if (province) {
    property_address = province;
  }

  if (area) {
    property_address = property_address + " , " + area;
  }


  if (property_address == '' && !city) {
    property_address = city;
  }

  return property_address;
}
