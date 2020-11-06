const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  // Model attributes are defined here
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  post_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  subject_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  parent_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, {
  freezeTableName: true
});

module.exports = Comment;