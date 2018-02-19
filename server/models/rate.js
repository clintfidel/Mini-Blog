module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rate: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  Rate.associate = (models) => {
    Rate.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Rate.belongsTo(models.Blog, {
      foreignKey: 'blogId',
    });
  };
  return Rate;
};
