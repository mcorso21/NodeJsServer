module.exports = (DB, DataTypes) => {
	const UserProfile = DB.define("UserProfile", {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		status: DataTypes.STRING,
	});

	return UserProfile;
};
