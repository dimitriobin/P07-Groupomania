const db = require('../config/database');
const { DataTypes } = require('sequelize');

const User = db.define('User', {
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
    tableName: 'users'
});

module.exports = User;