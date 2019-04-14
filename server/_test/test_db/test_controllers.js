const assert = require("assert");
const { testStartTime } = require("../index");
const { dbs, models, truncateTables } = require("../../_db");
const { Op } = require("sequelize");
var UserController = require("../../_db/controllers/users/UserController");

describe("Testing DBs", async () => {
	before(async () => {
		await Promise.all(
			Object.keys(dbs).forEach(async db => {
				return await dbs[db]
					.sync({ force: false, logging: false })
					.then(async resolve => {})
					.catch(reject => {});
			})
		)
			.then(resolve => {})
			.catch(reject => {});
	});
	describe("Testing Controllers", function() {
		describe("Removing Old Data from Tables", async () => {
			if (process.env.ENVIRONMENT !== "test") return;
			await Promise.all(
				Object.keys(dbs).forEach(db => {
					Object.keys(dbs[db].models).forEach(async model => {
						return await dbs[db].models[model]
							.destroy({
								where: {
									createdAt: {
										[Op.lt]: testStartTime,
									},
								},
								force: true,
								loggin: false,
							})
							.then(resolve => {})
							.catch(reject => {});
					});
				})
			)
				.then(resolve => {})
				.catch(reject => {});
		});
		describe("UserController", () => {
			let testuser = {
				email: "testemail@gmail.com",
			};
			let updateEmail = "testemail2@gmail.com";

			it(`Create`, async () => {
				testuser = await UserController.create(testuser);
				assert.notEqual(
					testuser.id,
					null,
					`Failed to create user: testuser.id = ${testuser.id}`
				);
			});

			it(`Update`, async () => {
				testuser = await UserController.update({ id: testuser.id, email: updateEmail });
				assert.equal(
					testuser.email,
					updateEmail,
					`Failed to update user, testuser.email = ${testuser.email}`
				);
			});

			it(`Query by PK`, async () => {
				let temp = await UserController.queryByPk(testuser.id);
				assert.notEqual(
					temp,
					null,
					`Failed to query testuser, temp = null`
				);
			});
		});
	});
});
