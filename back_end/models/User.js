const { readAllPosts } = require("../controllers/posts");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // Model attributes are defined here
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true
  });

  User.associate = models => {
    User.hasMany(models.Post, {foreignKey: {name: 'user_id', allowNull: false}});
    User.hasMany(models.Comment, {foreignKey: {name: 'user_id', allowNull: false}});
  }
  
  return User;
};