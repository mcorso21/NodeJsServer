module.exports = (DB, DataTypes) => {
	const User = DB.define("User", {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
		},
		password: DataTypes.STRING,
		salt: DataTypes.STRING,
	});

	User.createAssocations = function(models) {
		User.belongsToMany(models["Profile"], {
			through: models["UserProfile"],
		});
	};

	return User;
};
