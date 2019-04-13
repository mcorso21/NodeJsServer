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
const { dbs } = require("./_db");
const path = require("path");

// Build Databases
log("Building Databases...", "trace");
let dbsCreated = 0;

Object.keys(dbs).forEach(function(key) {
	try {
		dbs[key].sync({ force: true });
		log(`Successfully built '${dbs[key].config.database}'...`, "info");
	} catch (ex) {
		log(`Failed to build '${dbs[key].config.database}'`, "error");
		process.exit();
	}
});

function initServer() {}
