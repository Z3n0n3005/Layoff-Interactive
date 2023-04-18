module.exports = (sequelize, Sequelize) => {
    const data = sequelize.define("companyData", {
        Time: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        Company: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        NumberOfLayOff: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'companyData',
        timestamps: true
    })
    return data;
};