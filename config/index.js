const fs = require("fs");
const configFile = "./config.json";
var conf = null;

const getConfig = section => {
  if (conf == null) {
    if (fs.existsSync(configFile)) {
      var json = fs.readFileSync(configFile);
      conf = JSON.parse(json); //proveruvame dali postoi fajlot i go citame
    } else {
      console.error("Could not find config file");
    }
  }
  return conf[section]; //so ova go vraka db delot (sekcijata)
};
module.exports = {
 getConfig
};
