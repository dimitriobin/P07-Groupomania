'use strict'
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
      item_id: {
        type: DataTypes.INTEGER
      },
      item_type: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isIn: [['post', 'comment']]
        }
      },
      message: {
          type: DataTypes.TEXT,
          allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending'
      }
    }, {
      freezeTableName: true
    });

  return Report;
};