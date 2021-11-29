const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const { ipcMain } = electron;

var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "/gym.db"),
  },
  useNullAsDefault: true,
});

let mainWindow;
let mainDialog;

//MAIN WINDOW

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 800,
    minHeight: 500,
    height: 700,
    icon: path.join(__dirname, "/public/logo.png"),
    title: "Japonais Gym",
    frame: false,
    center: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: __dirname + "/preload.js",
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("Window:close", () => {
  BrowserWindow.getFocusedWindow().close();
});

ipcMain.on("Window:min", () => {
  BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on("Window:max", () => {
  if (mainWindow.isMaximized()) {
    BrowserWindow.getFocusedWindow().setSize(1000, 700, true);
  } else {
    BrowserWindow.getFocusedWindow().maximize();
  }
});

//SUBSCRIBERS

ipcMain.on("Window:show-dialog", (event, data) => {
  console.log(data);
  createDialog(data);
});

function sentSubs() {
  knex("users")
    .leftJoin("subscription", "users.last_payment", "=", "subscription.id")
    .select("users.*", "subscription.end_date")
    .then((data) => {
      mainWindow.webContents.send("window:subs:setAll", data);
    })
    .catch((e) => {
      sentState("error", e);
    });
}

ipcMain.on("window:subs:getAll", () => {
  sentSubs();
});

function searchSubs(search) {
  knex("users")
    .whereIn("first_name", search)
    .orWhere("last_name", search)
    .then((data) => {
      mainWindow.webContents.send("window:subs:setAll", data);
    })
    .catch((e) => {
      sentState("error", e);
    });
}

ipcMain.on("window:subs:getSearch", (event, search) => {
  searchSubs(search);
});

ipcMain.on("window:delete-user", (event, id) => {
  knex("users")
    .where("id", id)
    .del()
    .then(() => {
      sentSubs();
    })
    .catch((e) => {
      sentState("error", e);
    });
});

//SETTINGS

ipcMain.on("window:settings:tarifAdded", () => {
  mainWindow.webContents.send("window:settings:updateTarifs");
});

//Dialogs

function createDialog(data) {
  mainDialog = new BrowserWindow({
    width: 400,
    height: 500,
    frame: false,
    parent: mainWindow,
    center: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: __dirname + "/preload.js",
    },
  });

  mainDialog.loadURL(
    isDev
      ? `http://localhost:3000/${data.dialog}${
          data.hasOwnProperty("data") ? `?data=${data.data}` : ""
        }`
      : `file://${path.join(__dirname, `../build/index.html/${data.dialog}`)}`
  );
}

//ADD USER DIALOG :

ipcMain.on("addUser:user", (event, data) => {
  knex("users")
    .insert(data)
    .then((e) => {
      sentState("info", "Un atléte ajouter");
      mainDialog.webContents.send("addUser:initFields");
      sentSubs();
    })
    .catch((e) => {
      sentState("error", e);
    });
});

function sentState(type, message) {
  BrowserWindow.getFocusedWindow().webContents.send("window:state", {
    type: type,
    message: message,
  });
}
