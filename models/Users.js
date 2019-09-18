// The User model.
const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');
const db = require('./../config/database');


const User = db.define('ad_user', {
  // attributes
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  isactive:{
    type: Sequelize.STRING  
  }
}, {
  freezeTableName: true,
  timestamps: false,
});
User.removeAttribute('id');

module.exports=User;