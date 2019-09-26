const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');


const db=require('../config/database');

const employeeAttendance=`SELECT date_trunc('day',coalesce(cdate,mindatetime,maxdatetime)) days, count(*) totalattend, (SELECT COUNT(bp.*) total 
FROM C_BPartner bp WHERE bp.IsActive='Y' and bp.isemployee='Y') totalemp 
FROM c_pay_daily_attend 
where date_trunc('months', coalesce(cdate,mindatetime,maxdatetime))=date_trunc('months',current_date)
GROUP BY 1 ORDER BY 1 DESC`;
router.get('/details',(req,res)=>{
	db
  .query(employeeAttendance, { raw: true })
  .then(projects => {
  	console.log(projects);
    res.json(projects);
  })
})

module.exports=router;