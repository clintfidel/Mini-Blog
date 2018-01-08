module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    },
    blogId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Blog',
        key: 'id',
        as: 'blogId'
      }
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true
    }
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Review.belongsTo(models.Blog, {
      foreignKey: 'blogId',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return Review;
};
