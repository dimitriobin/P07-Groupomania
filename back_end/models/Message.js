'use strict'
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    // Model attributes are defined here
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true
  });

  Message.associate = models => {
    Message.belongsTo(models.User, {foreignKey: {name: 'sender_id', allowNull: false}});
    Message.belongsTo(models.User, {foreignKey: {name: 'receiver_id', allowNull: false}});
  };

  return Message;
};