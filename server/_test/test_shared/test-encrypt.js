const assert = require("assert");
const encrypt = require("../../_shared/encrypt");

describe("Testing _shared/encrypt.js", function() {
	let algo = "sha256";
	let unHashed = `${Math.random()
		.toString(36)
		.slice(-8)}
		${Math.random()
			.toString(36)
			.slice(-8)}`;
	let salt = "";
	let hashedPw = "";

	describe("encrypt.hash()", function() {
		before(function() {
			let temp = encrypt.hash(algo, unHashed);
			salt = temp.salt;
			hashedPw = temp.hashedPw;
		});

		it("salt != ''", function() {
			assert.notEqual(salt, "", `salt = ${salt}`);
		});

		it("hashedPw != ''", function() {
			assert.notEqual(hashedPw, "", `hashedPw = ${hashedPw}`);
		});

		it("unHashed != hashedPw", function() {
			assert.notEqual(
				hashedPw,
				unHashed,
				`hashedPw = ${hashedPw}, unHashed = ${unHashed}`
			);
		});
	});

	describe("encrypt.compare()", function() {
		it("correct password", function() {
			assert.equal(
				encrypt.compare(algo, unHashed, salt, hashedPw),
				true,
				`algo = ${algo}, unHashed = ${unHashed}, salt = ${salt}, hashedPw = ${hashedPw}`
			);
		});

		it("incorrect password", function() {
			assert.notEqual(
				encrypt.compare(algo, "pw", salt, hashedPw),
				true,
				`algo = ${algo}, unHashed = ${unHashed}, salt = ${salt}, hashedPw = ${hashedPw}`
			);
		});

		it("incorrect salt", function() {
			assert.notEqual(
				encrypt.compare(algo, unHashed, "salt", hashedPw),
				true,
				`algo = ${algo}, unHashed = ${unHashed}, salt = ${salt}, hashedPw = ${hashedPw}`
			);
		});
	});
});
