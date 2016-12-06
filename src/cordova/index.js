document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(window.cordova);
    console.log("jsjsj");
    if(window.cordova) {
        alert(window.cordova.platformId);
    }
}
