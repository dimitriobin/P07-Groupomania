module.exports = (sequelize, DataTypes) => {
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
        }
      }, {
        freezeTableName: true
      });

      Post.associate = models => {
        Post.belongsTo(models.User, {foreignKey: {name: 'user_id', allowNull: false}});
        Post.belongsTo(models.Subject, {foreignKey: {name: 'subject_id', allowNull: false}});
        Post.hasMany(models.Comment, {foreignKey: {name: 'post_id', allowNull: false}});
      };

    return Post;
  };