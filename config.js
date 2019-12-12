const path = require('path');
//config
const db_file = "json-db.js"


//paths
module.exports.web = path.posix.join(__dirname);
module.exports.db = path.posix.join(__dirname, db_file);
