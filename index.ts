import { BrowserWindow, app, session } from 'electron';
const uBlock = `${__dirname}/content/ublock/`;

async function loadExtension(extensionPath: string) {
  const extensionFile = Bun.file(extensionPath);

  const exists = await extensionFile.exists();
  if (exists) {
    try {
      await session.defaultSession.loadExtension(extensionPath);
      console.log(`Loaded extension from ${extensionPath}.`);
    } catch (error) {
      console.error(`Failed to load extension from ${extensionPath}, ${error}`);
    };
  } else {
    console.error(`Extension at ${extensionPath} does not exist.`);
  };
};

let window;
async function create() {
  window = new BrowserWindow({
    width: 1080,
    minWidth: 680,
    height: 840,
    title: app.getName(),
    webPreferences: {
      nodeIntegration: true,
      "devTools": true,
      "sandbox": true
    },
    "autoHideMenuBar": true,
    "backgroundColor": "black",
    "fullscreen": false,
    "icon": "download.png",
  });

  await loadExtension(uBlock);

  //window.setIcon(__dirname + "/images.png");
  window.loadURL("https://1v1.lol");
  //window.setFullScreen(true);
  window.setClosable(true);
};
app.on("ready", () => {
  create();
});