'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('users', 'Deleted', Sequelize.BOOLEAN, {
        allowNull: true
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn('users', 'Deleted')];
  }
};
