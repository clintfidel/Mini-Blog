

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Blogs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    blogTitle: {
      type: Sequelize.STRING
    },
    blogPost: {
      type: Sequelize.STRING
    },
    views: {
      type: Sequelize.INTEGER
    },
    rate: {
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
  down: queryInterface => queryInterface.dropTable('Blogs')
};
