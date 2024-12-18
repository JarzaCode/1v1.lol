const electron = require('electron');
const adblocker = require('@ghostery/adblocker-electron');
const crossfetch = require('cross-fetch');

adblocker.ElectronBlocker.fromPrebuiltAdsAndTracking(crossfetch.fetch).then((blocker) => {
  blocker.enableBlockingInSession(electron.session.defaultMaxListeners);
});

let window;
async function create() {
  window = new electron.BrowserWindow({
    width: 1080,
    minWidth: 680,
    height: 840,
    title: electron.app.getName(),
    webPreferences: {
      nodeIntegration: true,
      "devTools": true,
      "sandbox": truerequire
    },
    "autoHideMenuBar": true,
    "backgroundColor": "black",
    "fullscreen": false,
    "icon": "download.png",
  });

  //window.setIcon(__dirname + "/images.png");
  window.loadURL("https://1v1.lol");
  //window.setFullScreen(true);
  window.setClosable(true);
};
electron.app.on("ready", () => {
  create();
});