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

function errorListener() {
  console.log('errorListenerFired')
  var jsError = window.onerror;
  console.log('test1------')
  return function(message, url, line, column, error) {
    console.log('test------2------')
    if (typeof errorHandlerPreviousError !== "undefined" && errorHandlerPreviousError === message) {
      console.log('test------3------',typeof(errorHandlerPreviousError))
      console.log('test------4------',typeof(message))
      return;
    }
    errorHandlerPreviousError = message;
    var data = function(message, url, line, column, error) {
        errorHandlerCount++;
        console.warn('errorHandlerCount ++')
        if(errorHandlerCount > 3){
          return;
        }

      var errorObj = {
        message: message,
        url: url,
        line: line,
        column: column
      };

      if(error && error.stack){
        errorObj.stack =  error.stack.toString();
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
      console.log('test 55555 return ------ ', encodeURIComponent(Open.objectToString(errorObj)))
      return 'data=' + encodeURIComponent(Open.objectToString(errorObj));
      var errorContent = ['<table>'];
      //for (var i = 0; i < arguments.length; i++) {test1-----
        errorContent.push('<tr><th>Message</th><td>' + message + '</td></tr>');
        errorContent.push('<tr><th>Url</th><td>' + url + '</td></tr>');
        errorContent.push('<tr><th>Line</th><td>' + line + '</td></tr>');
        errorContent.push('<tr><th>Column</th><td>' + column + '</td></tr>');
        if(error && error.stack){
          errorContent.push('<tr><th>Stack</th><td>' + error.stack.toString() + '</td></tr>');
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
      console.warn('return 1 ','data=' + encodeURIComponent(errorContent.join('')))
      return 'data=' + encodeURIComponent(errorContent.join(''));
    }
    console.log('after returnm 1 ')
    if (jsError) { jsError(message, url, line, column, error); }
    console.log('jsError 1 ')
    console.log('errorListenerFired post ????')
    var i = Open.connection.createObject();
    i.open('POST', '/open/errorHandler.asp', 1);
    console.log('post 1 ')
    i.setRequestHeader('CharSet', 'UTF-8');
    console.log('post 2 ')
    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    console.log('post 3 ')
    i.send(data(message, url, line, column, error)); return false;
    console.log('post 4 ')
  }();
}

export default function addWindowErrorListener() {
  alert(platform.name)
  console.log('test---------',platform.name      ); // 'IE'
  console.log('test---------',platform.version    ); // '10.0'
  console.log('test---------',platform.layout   ); // 'Trident'
  console.log('test---------',platform.os      ); // 'Windows Server 2008 R2 / 7 x64'
  console.log('test---------',platform.description);

  var errorHandlerErrorAdditionalInfo = '';
  var errorHandlerCount = 0;

  addEvent("error", window, errorListener )
}


