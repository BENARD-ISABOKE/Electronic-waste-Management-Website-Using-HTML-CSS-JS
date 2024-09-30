'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContactSubmission.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
      validate: {
        isEmail: true, // Ensures the email is valid
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false, // Required field
    }
  }, {
    sequelize,
    modelName: 'ContactSubmission',
  });

  return ContactSubmission;
};