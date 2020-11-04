const db = require('../config/database');
const { DataTypes } = require('sequelize');

const Post = db.define('Post', {
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
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    tableName: 'posts'
  });
  
  // `sequelize.define` also returns the model
  console.log(db.models.Post); // true

  module.exports = Post;