module.exports = (sequelize, Sequelize) => {
    const data = sequelize.define("data", {
        x:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        y: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'data',
        timestamps: true
    })
    return data;
};