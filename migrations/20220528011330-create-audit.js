'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Audits', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      updatedTable: {
        allowNull: false,
        type: DataTypes.STRING
      },
      action: {
        allowNull: false,
        type: DataTypes.STRING
      },
      pkValue: {
        allowNull: false,
        type: DataTypes.STRING
      },
      updatedBy: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Audits');
  }
};