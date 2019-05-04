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
		username: DataTypes.STRING,
		publicalias: DataTypes.STRING,
	});

	User.createAssocations = function(models) {
		User.belongsToMany(models["Profile"], {
			through: models["UserProfile"],
		});
	};

	return User;
};
