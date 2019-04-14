const testStartTime = new Date();
process.env.ENVIRONMENT = "test";
process.env.LOGLEVEL = "nolog";

module.exports = {
	testStartTime
};
