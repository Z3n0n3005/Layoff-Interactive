module.exports = (sequelize, Sequelize) => {
    const data = sequelize.define("industryData", {
        Time: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        Industry: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        NumberOfLayOff: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'industryData',
        timestamps: true
    })
    return data;
};