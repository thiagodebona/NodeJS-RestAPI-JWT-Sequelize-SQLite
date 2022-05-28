'use strict';

module.exports = (sequelize, DataTypes) => {
  const Audit = sequelize.define('Audits', {
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

  return Audit;
};
