module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    isAdmin: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Blog, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Rate, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
