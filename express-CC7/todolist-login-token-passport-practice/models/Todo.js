module.exports = (sequelize, DataTypes) => {
    const table = sequelize.define("Todo", {
        task: DataTypes.STRING
    }, {
        tableName: "todos",
        timestamps: false,
    });

    table.associate = models => {
        table.belongsTo(models.User, { foreignKey: "user_id" });
    };

    return table;
}