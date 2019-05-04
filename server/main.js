// Determine environment
process.env.ENVIRONMENT = "dev";
process.env.LOGLEVEL = "TRACE";
process.argv.forEach(function(val, index, array) {
	if (val.includes("environment")) {
		process.env.ENVIRONMENT = val.split("=")[1];
	} else if (val.includes("loglevel")) {
		process.env.LOGLEVEL = val.split("=")[1];
	}
});

// Imports
const { log } = require("./_shared/logger");
//
log(`Environment Variables:`, "trace");
log(`ENVIRONMENT set to '${process.env.ENVIRONMENT}'`, "trace");
log(`LOGLEVEL set to '${process.env.LOGLEVEL}'`, "trace");
//
const config = require("./_shared/config");
const Sequelize = require("sequelize");
const { dbs, models } = require("./_db");
const path = require("path");

// Build Databases
log("Building Databases...", "trace");
let dbPromises = [];

Object.keys(dbs).forEach(function(key) {
	dbPromises.push(
		new Promise((resolve, reject) => {
			try {
				dbs[key].sync({ force: false }).then(() => {
					log(
						`Successfully built '${dbs[key].config.database}'...`,
						"info"
					);
					resolve();
				});
			} catch (ex) {
				log(`Failed to build '${dbs[key].config.database}'`, "error");
				reject();
				process.exit();
			}
		})
	);
});
const UserController = require("./_db/controllers/users/UserController");
Promise.all(dbPromises).then(vals => {
	
	
	return;
});

