'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('users', 'Admin', Sequelize.BOOLEAN, {
       defaultValue: 0
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn('users', 'Admin')];
  }
};