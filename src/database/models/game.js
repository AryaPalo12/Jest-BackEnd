'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Game.belongsTo(models.User);
    }
  }
  Game.init({
    name: DataTypes.STRING,
    description : DataTypes.STRING,
    winner: DataTypes.STRING,
    user1_choice: DataTypes.CHAR,
    user2_choice: DataTypes.CHAR,
    userId1 : DataTypes.INTEGER,
    userId2 : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};