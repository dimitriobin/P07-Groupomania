'use strict'
module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
      // Model attributes are defined here
    }, {
      freezeTableName: true,
      timestamps: false
    });

    Participant.associate = models => {
      Participant.belongsTo(models.Conversation);
      Participant.belongsTo(models.User);
    };

  return Participant;
};