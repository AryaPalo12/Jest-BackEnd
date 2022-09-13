"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Post, { 
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      //   foreignKey: {
      //     type: DataTypes.UUID,
      //     allowNull: false
      //   }
      // });
    }
  }
  User.init(
    {
      fullname: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
