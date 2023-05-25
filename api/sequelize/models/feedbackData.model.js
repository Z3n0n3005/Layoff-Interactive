const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('feedbackData', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		Name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
		Content: {
            type: DataTypes.STRING,
            allowNull: false
        },
	});
};
