const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');


const db=require('../config/database');

const employeeAttendance="SELECT date_trunc('day',coalesce(cdate,mindatetime,maxdatetime)) days, count(*) totalattend, (SELECT COUNT(bp.*) total FROM C_BPartner bp WHERE bp.IsActive='Y' and bp.isemployee='Y') totalemp FROM c_pay_daily_attend GROUP BY 1 ORDER BY 1 DESC limit 30";
router.get('/details',(req,res)=>{
	db
  .query(employeeAttendance, { raw: true })
  .then(projects => {
    res.json(projects);
  })
})

module.exports=router;