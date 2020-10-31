module.exports = (sequelize, DataTypes) => {
    const table = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: DataTypes.STRING
    }, {
        tableName: "users",
        timestamps: false,
    });

    table.associate = models => {
        table.hasMany(models.Todo, { foreignKey: "user_id" });
    };

    return table;
}