'use strict';
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    UserId: {
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true, 
      allowNull: false
    },
    FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      Email: {
        type: DataTypes.STRING,
        unique: true
      },
      Username: {
        type: DataTypes.STRING,
        unique: true
      },
      Password: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );
  users.associate = function(models) {
    // associations can be defined here
  };

  users.prototype.comparePassword = function (plainTextPassword) {
    let user = this;
    return bcrypt.compareSync(plainTextPassword, user.Password)
  };

  return users;
};