var platform = require('platform');


var errorHandlerErrorAdditionalInfo = '';
var errorHandlerCount = 0;
var errorHandlerPreviousError = '';


function addEvent(evnt, elem, func) {
  if (elem.addEventListener)  // W3C DOM
     elem.addEventListener(evnt,func,false);
  else if (elem.attachEvent) { // IE DOM
     elem.attachEvent("on"+evnt, func);
  }
  else { // No much to do
     elem[evnt] = func;
  }
}

function buildErrorMessageObject(errorMessageObject){

  var errorObj = {
    message: errorMessageObject.message,
    url: errorMessageObject.filename,
    line: errorMessageObject.lineno,
    column: errorMessageObject.colno
  };

  if(errorMessageObject.error && errorMessageObject.error.stack){
    errorObj.stack =  errorMessageObject.error.stack.toString();
  }

  if(typeof platform !== "undefined"){
    errorObj.platform = {};
    // on IE10 x86 platform preview running in IE7 compatibility mode on Windows 7 64 bit edition
    errorObj.platform.name = platform.name; // 'IE'
    errorObj.platform.version = platform.version; // '10.0'
    errorObj.platform.layout = platform.layout; // 'Trident'
    errorObj.platform.osArchitecture = platform.os.architecture; // 'Windows Server 2008 R2 / 7 x64'
    errorObj.platform.osFamily = platform.os.family; // 'Windows Server 2008 R2 / 7 x64'
    errorObj.platform.osVersion = platform.os.version; // 'Windows Server 2008 R2 / 7 x64'
    errorObj.platform.description = platform.description; // 'IE 10.0 x86 (platform preview; running in IE 7 mode) on Windows Server 2008 R2 / 7 x64'
    errorObj.platform.product = platform.product; // 'iPad'
    errorObj.platform.manufacturer = platform.manufacturer; // 'Apple'
  }

  errorObj.timeStamp = Date.now();

  return errorObj;
}

function buildEmailMessage(errorMessageObject){

      errorHandlerCount++;

      if(errorHandlerCount > 3){
        return;
      }
    var errorObj = {};
    errorObj = buildErrorMessageObject(errorMessageObject);

    console.log('test 55555 return ------ ', encodeURIComponent(Open.objectToString(errorObj)))
    return 'data=' + encodeURIComponent(Open.objectToString(errorObj));
   /* var errorContent = ['<table>'];
    //for (var i = 0; i < arguments.length; i++) {test1-----
      errorContent.push('<tr><th>Message</th><td>' + errorMessageObject.message + '</td></tr>');
      errorContent.push('<tr><th>Url</th><td>' + errorMessageObject.filename + '</td></tr>');
      errorContent.push('<tr><th>Line</th><td>' + errorMessageObject.lineno + '</td></tr>');
      errorContent.push('<tr><th>Column</th><td>' + errorMessageObject.colno + '</td></tr>');
      if(errorMessageObject.error && errorMessageObject.error.stack){
        errorContent.push('<tr><th>Stack</th><td>' + errorMessageObject.error.stack.toString() + '</td></tr>');
      }
    //}

    if (errorHandlerErrorAdditionalInfo !== null && typeof (errorHandlerErrorAdditionalInfo) !== 'undefined' && errorHandlerErrorAdditionalInfo !== '') {
      errorContent.push('<tr><th></th><td>' + errorHandlerErrorAdditionalInfo + '</td></tr>');
      errorHandlerErrorAdditionalInfo = '';
    }

    errorContent.push('<tr><th>appCodeName</th><td>' + navigator.appCodeName + '</td></tr>');
    errorContent.push('<tr><th>appName</th><td>' + navigator.appName + '</td></tr>');
    errorContent.push('<tr><th>appVersion</th><td>' + navigator.appVersion + '</td></tr>');
    errorContent.push('<tr><th>cookieEnabled</th><td>' + navigator.cookieEnabled + '</td></tr>');
    //errorContent.push('<tr><th>geolocation</th><td>' + navigator.geolocation + '</td></tr>');
    errorContent.push('<tr><th>language</th><td>' + navigator.language + '</td></tr>');
    errorContent.push('<tr><th>onLine</th><td>' + navigator.onLine + '</td></tr>');
    errorContent.push('<tr><th>platform</th><td>' + navigator.platform + '</td></tr>');
    errorContent.push('<tr><th>product</th><td>' + navigator.product + '</td></tr>');
    errorContent.push('<tr><th>userAgent</th><td>' + navigator.userAgent + '</td></tr>');

    //s.push('<tr><td>Open.store.aliases:</td><td>' + Open.objectToString(Open.store.aliases) + '</td></tr>');
    // s.push('<tr><td>Open.store:</td></tr>');
    // for (var i in Open.store) {
      // if (typeof (Open.store[i]) === 'object') {
        // s.push('<tr><td></td><td>' + i + '</td></tr>');
      // }
    // }
    errorContent.push('</table>');
    return 'data=' + encodeURIComponent(errorContent.join(''));*/

}

function errorListener(errorMessageObject) {
  console.log('errorMessageObject======= ',errorMessageObject)
  var jsError = window.onerror;

    if (typeof errorHandlerPreviousError !== "undefined" && errorHandlerPreviousError === errorMessageObject.message ) {
      return;
    }
    errorHandlerPreviousError = errorMessageObject.message;

    if (jsError) { jsError(errorMessageObject); }

    var i = Open.connection.createObject();
    i.open('POST', '/open/errorHandler.asp', 1);
    i.setRequestHeader('CharSet', 'UTF-8');
    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    i.send(buildEmailMessage(errorMessageObject)); return false;


}

export default function addWindowErrorListener() {

  var errorHandlerErrorAdditionalInfo = '';
  var errorHandlerCount = 0;

  addEvent("error", window, errorListener )
}


