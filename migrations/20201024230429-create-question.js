'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      lastModifiedBy: {
        type: Sequelize.INTEGER
      },
      lastModifiedDate: {
        type: Sequelize.DATE
      },
      summary: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      upVotes: {
        type: Sequelize.INTEGER
      },
      downVotes: {
        type: Sequelize.STRING
      },
      answerIds: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('questions');
  }
};