const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { log } = require("../../../_shared/logger");
const path = require("path");

/* VARIABLES-START */
const { User } = require("../../index").models;
const Entity = User;

/* VARIABLES-END */

module.exports = {
	async queryByPk(recordPk) {
		try {
			log(`In ${path.basename(__filename)}-queryById`, "trace");
			log(`recordPk:${recordPk}`, "trace");
			const record = await Entity.findByPk(recordPk);
			if (record) log(`QueryByPk succeeded for ${Entity.name} with PK: ${recordPk}`, "info");
			else log(`QueryByPk failed for ${Entity.name} with PK: ${recordPk}`, "info");
			return record;
		} catch (ex) {
			log(path.basename(__filename) + "-queryByPk threw: " + ex, "error");
			log(`Failed to query for ${Entity.name} with recordPk:${recordPk}`, "error");
			return {
				error: "Failed to create record.",
			};
		}
	},
	async create(newRecord) {
		try {
			log(
				`In ${path.basename(__filename)}-create\nParams:\newRecord:${JSON.stringify(
					newRecord
				)}`,
				"trace"
			);
			log(`newRecord:\n${JSON.stringify(newRecord)}`, "trace");
			const record = await Entity.create(newRecord);
			log(`Created new ${Entity.name}:\n${JSON.stringify(record)}`, "info");
			return record;
		} catch (ex) {
			log(path.basename(__filename) + "-create threw: " + ex, "error");
			log(`Failed to create new ${Entity.name}:\n${JSON.stringify(newRecord)}`, "error");
			return {
				error: "Failed to create record.",
			};
		}
	},
	async update(updatedRecord) {
		try {
			log(`In ${path.basename(__filename)}-update`, "trace");
			log(`updatedRecord:\n${JSON.stringify(updatedRecord)}`, "trace");
			await Entity.update(updatedRecord, {
				where: {
					id: updatedRecord.id,
				},
			});
			log(`Updated ${Entity.name}:\n${JSON.stringify(updatedRecord)}`, "info");
			return updatedRecord;
		} catch (ex) {
			log(path.basename(__filename) + "-update threw: " + ex, "error");
			log(`Failed to update ${Entity.name}:\n${JSON.stringify(updatedRecord)}`, "error");
			return {
				error: "Failed to update record.",
			};
		}
	},
};
