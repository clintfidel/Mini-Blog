

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    comments: {
      type: Sequelize.STRING
    },
    blogId: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Reviews')
};
