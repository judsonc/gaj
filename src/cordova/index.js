document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    if (cordova.platformId === 'android')
        alert(cordova.platformId);
}
