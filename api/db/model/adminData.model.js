module.exports = (sequelize, Sequelize) => {
    const data = sequelize.define("adminData", {
        UserName: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        Password: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
    },
    {
        tableName: 'adminData',
        timestamps: true
    })
    return data;
}