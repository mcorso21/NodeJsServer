const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../_shared/config");
const { log } = require("../_shared/logger");

// Generate Sequelize objects
log("Configuring Databases...", "trace");
var dbConfigs = config.getDbConfigs();
var dbs = [];
dbConfigs.forEach(db => {
	try {
		if (process.env.ENVIRONMENT === "test") db.options.logging = false;
		dbs.push(new Sequelize(db.database, db.username, db.password, db.options));
		log(`Successfully configured db: '${db.database}'...`, "info");
	} catch (ex) {
		log(`Failed to configure db: '${db.database}'...`, "error");
		log(ex.message, "error");
		process.exit();
	}
});

// Add models
log("Parsing DB models...", "trace");

(function parseModels(dir, depth) {
	fs.readdirSync(dir)
		.filter(fileName => fileName !== "index.js")
		.forEach(fileName => {
			// This is a folder, check for models within it
			if (fs.lstatSync(path.join(dir, fileName)).isDirectory()) {
				if (depth < 3) {
					parseModels(path.join(dir, fileName), depth + 1);
				}
			} else {
				try {
					let potentialDbName = null,
						dbMatches = null,
						actualDbName = null,
						db = null,
						model = null;
					// Try to match folder name with a db name
					// If there's a matching db name use that otherwise use the default (first) db
					potentialDbName = `${process.env.ENVIRONMENT}-${path.basename(dir)}`;

					dbMatches = Object.keys(dbs).filter(key => {
						return (
							`${dbs[key].config.database.toLowerCase()}` ===
							`${potentialDbName.toLowerCase()}`
						);
					});

					actualDbName = dbMatches.length == 1 ? potentialDbName : dbs[0].config.database;

					// Add the model
					db = dbs.find(db => {
						return db.config.database === actualDbName;
					});

					model = db.import(path.join(dir, fileName));
					log(
						`Successfully added model: '${model.name}' to db: '${actualDbName}'`,
						"info"
					);
				} catch (ex) {
					log(
						`Failed to add model: '${path.join(
							dir,
							fileName
						)}' to db: '${actualDbName}'`,
						"error"
					);
					log(ex.message, "error");
					process.exit();
				}
			}
		});
})(path.resolve(__dirname, "models"), 0);

// Set model associations
log("Configuring model associations...", "trace");

let allModels = {};
Object.keys(dbs).forEach(db => {
	Object.keys(dbs[db].models).forEach(model => {
		allModels[dbs[db].models[model].name] = dbs[db].models[model];
	});
});

Object.keys(dbs).forEach(db => {
	log(`Checking for associations in db: '${dbs[db].config.database}'`, "trace");
	Object.keys(dbs[db].models).forEach(model => {
		log(`Checking for associations in model: '${model}'`, "trace");
		if (typeof dbs[db].models[model].createAssocations === "function") {
			try {
				dbs[db].models[model].createAssocations(allModels);
				log(
					`Successfully added associations for model: '${dbs[db].models[model].name}'`,
					"info"
				);
			} catch (ex) {
				log(`Failed to configure association for model: '${model}'`, "error");
				log(ex.message, "error");
				process.exit();
			}
		}
	});
});

module.exports = {
	dbs: dbs,
	models: allModels
};
