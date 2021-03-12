'use strict'
module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define('Subject', {
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
          }
        }
      }, {
        freezeTableName: true
      });

      Subject.associate = models => {
        Subject.hasMany(models.Post, {foreignKey: {name: 'subject_id', allowNull: false}});
        Subject.belongsToMany(models.User, {through: models.SubjectFollows});
        // Subject.hasMany(models.SubjectFollows);
      };
    
    return Subject;
  };