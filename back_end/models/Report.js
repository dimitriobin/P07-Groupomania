'use strict'
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
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