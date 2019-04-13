const chalk = require("chalk");

const envLogLevel = process.env.LOGLEVEL;

const logLevels = {
	trace: 0,
	debug: 1,
	info: 2,
	warn: 3,
	error: 4,
	fatal: 5,
};

function getFormatedDateTime() {
	let currentDateTime = new Date();
	// time
	let h = currentDateTime.getHours();
	let min = currentDateTime.getMinutes();
	min = min < 10 ? "0" + min : min;
	let tz = currentDateTime.getTimezoneOffset() / 60;
	tz = "UTC" + (tz > 0 ? "-" : "+") + tz;
	let time = h + ":" + min + " " + tz;
	//
	return time;
}

function getLogOutput(msg, logLevel) {
	//
	let d = getFormatedDateTime();
	let ret = `${d}:${logLevel}: ${msg}`;
	//
	if (logLevel == "trace") return chalk.white(`${ret}`);
	else if (logLevel == "info") return chalk.blue(`${ret}`);
	else if (logLevel == "warn") return chalk.yellow(`${ret}`);
	else if (logLevel == "error") return chalk.red(`${ret}`);
}

module.exports = {
	log: function(msg, logLevel) {
		if (logLevels[envLogLevel] > logLevels[logLevel]) return;
		let output = getLogOutput(msg, logLevel);
		console.log(output);
	},
};
