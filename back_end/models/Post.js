const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  subject_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, {
  freezeTableName: true
});

module.exports = Post;