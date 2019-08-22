const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');


const db=require('../config/database');

const employeeAttendance="SELECT date_trunc('month',dateacct) dateacct,SUM(debitamt) total_amt FROM c_acct_bank where c_doctype_id = 1000008 and docstatus in ('CO','CL') group by 1 order by 1 desc limit 12";
router.get('/details',(req,res)=>{

	// res.send('hello');
	db
  .query(employeeAttendance, { raw: true })
  .then(projects => {
    res.json(projects);
  })
	//db.query("SELECT * FROM `t_transport_type`", { type: db.QueryTypes.SELECT})
	// SalesOrder.findAll()
	// .then((salesorder)=>{console.log(salesorder)})
	// .catch((err)=>{
	// 	console.log(err);
	// })
})

module.exports=router;