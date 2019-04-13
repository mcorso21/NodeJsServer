module.exports = (DB, DataTypes) => {
	const Profile = DB.define("Profile", {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
	});

	Profile.createAssocations = function(models) {
		Profile.belongsToMany(models["User"], {
			through: models["UserProfile"],
		});
	};

	return Profile;
};
