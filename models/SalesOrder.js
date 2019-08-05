const Sequelize = require('sequelize');
const db = require('./../config/database');

const SalesOrder= db.define('c_sales_order',{
	description:{type:Sequelize.STRING}
})



module.exports=SalesOrder;