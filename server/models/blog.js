module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    blogTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: {
        args: true,
        message: 'Blog title already exist '
      }
    },
    blogPost: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    }
  });
  Blog.associate = (models) => {
    Blog.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Blog.hasMany(models.Review, {
      foreignKey: 'blogId',
      onDelete: 'CASCADE',
      hooks: true,
    });
    Blog.hasMany(models.Rate, {
      foreignKey: 'blogId'
    });
  };
  return Blog;
};
