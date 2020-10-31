module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Person', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            notNull: true,
        },
        name: DataTypes.STRING,
        age: DataTypes.INTEGER,
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'persons',
        timestamps: false,
    });

    model.associate = (models) => {
        model.hasMany(models.Todo, { foreignKey: "person_id" })
    }

    return model;
}

