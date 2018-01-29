export default function getPlatformInformation() {

  var platform = require('platform');
  alert(platform.name)
  console.log('test---------',platform.name      ); // 'IE'
  console.log('test---------',platform.version    ); // '10.0'
  console.log('test---------',platform.layout   ); // 'Trident'
  console.log('test---------',platform.os      ); // 'Windows Server 2008 R2 / 7 x64'
  console.log('test---------',platform.description);

}


