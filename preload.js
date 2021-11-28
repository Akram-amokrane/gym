const path = require("path");

Window.ipcRenderer = require("electron").ipcRenderer;

Window.knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "/gym.db"),
  },
  useNullAsDefault: true,
});
