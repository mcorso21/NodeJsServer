module.exports = (DB, DataTypes) => {
	const UserPrivate = DB.define("UserPrivate", {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		password: DataTypes.STRING,
		salt: DataTypes.STRING,
		lastLogin: DataTypes.DATE, 
		lastLoginLocation: DataTypes.STRING, 
		lastLoginIp: DataTypes.STRING,
		previousLoginInfo: DataTypes.TEXT
	});

	UserPrivate.createAssocations = function(models) {
		UserPrivate.belongsTo(models["User"]);
	};

	return UserPrivate;
};
