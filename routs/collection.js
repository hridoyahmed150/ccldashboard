const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');
const passport=require('passport');


const db=require('../config/database');

const employeeAttendance="SELECT date_trunc('month',dateacct) dateacct,SUM(debitamt) total_amt FROM c_acct_bank where c_doctype_id = 1000008 and docstatus in ('CO','CL') group by 1 order by 1 desc limit 12";
router.get('/details',passport.authenticate('jwt',{session:false}),(req,res)=>{
	db
  .query(employeeAttendance, { raw: true })
  .then(projects => {
    res.json(projects);
  })
})

module.exports=router;