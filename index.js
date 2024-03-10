const { app, BrowserWindow, Menu, dialog} = require('electron');
const path = require('path');


var mainWindow;
var addWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
    mainWindow = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  var mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

//template for another page
var mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        //for user to go add.html page
        label: 'Create new file',
        click() {
          addWindow = new BrowserWindow({
            width: 800,
            height: 600,
            title: 'Create new file',
            webPreferences: {
              nodeIntegration: true,
              contextIsolation: false,
            },
          });
          addWindow.loadFile(path.join(__dirname, 'add.html'));
        },
      },
      {
        //for user to quit from this website
        label: 'Quit',
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    //for user to know more about this website
    label: 'Help',
    submenu: [
      {
        label: 'About us',
        click() {
          aboutUsFunction();
        },
      },
    ],
  },
];

// Function for 'About us' functionality
function aboutUsFunction() {
  dialog.showMessageBox(mainWindow, { message: 'About us: GlamWeather Email: marz@gmail.com', buttons: ['OK'] });
}
