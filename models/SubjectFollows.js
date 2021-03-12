'use strict'
module.exports = (sequelize, DataTypes) => {
  const SubjectFollows = sequelize.define('SubjectFollows', {
      // Model attributes are defined here
    }, {
      freezeTableName: true,
      timestamps: false
    });

    SubjectFollows.associate = models => {
        SubjectFollows.belongsTo(models.Subject, {foreignKey: {name: 'SubjectId', allowNull: false}});
        SubjectFollows.belongsTo(models.User, {foreignKey: {name: 'UserId', allowNull: false}});
    };

  return SubjectFollows;
};