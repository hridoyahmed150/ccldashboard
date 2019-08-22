const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');


const db=require('../config/database');

const employeeAttendance=`select dept.name,count(coalesce(attend.cdate,attend.mindatetime,attend.maxdatetime)) attendcount,count(bp.*) employeecount from C_BPartner bp
left join HR_Employee emp on(bp.C_BPartner_id=emp.C_BPartner_id)
left join HR_Department dept on(emp.hr_department_id=dept.hr_department_id)
left join c_pay_daily_attend attend on (attend.C_BPartner_id=bp.C_BPartner_id 
and to_char(coalesce(attend.cdate,attend.mindatetime,attend.maxdatetime),'ddMMyyyy')=to_char(current_date,'ddMMyyyy'))
where bp.isemployee ='Y' 
and bp.isactive ='Y'
group by 1
order by dept.name`;
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