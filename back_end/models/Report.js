'use strict'
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
      post_id: {
        type: DataTypes.INTEGER
      },
      comment_id: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      image_url: {
          type: DataTypes.STRING,
          validate: {
              isUrl: true
          }
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