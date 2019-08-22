const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');

const db=require('../config/database');
const SalesOrder=require('../models/SalesOrder');

const monthlyBudgetVsAchievement=`
select pre.name,sum(mpa.p1amt) budget,
(select sum(productqty) from C_sales_order where DateOrdered between pre.startdate and pre.enddate) achievement from C_Mark_Period_Area mpa
left join C_Mark_Period mp on (mpa.C_Mark_Period_id=mp.C_Mark_Period_id)
left join C_Period  pre on (pre.C_period_id=mpa.C_period_id)
where pre.startdate <= current_date
group by 1,pre.C_period_id
order by pre.C_period_id desc limit 12`;
const yearlyBudgetVsAchievement=`
select pre.name,sum(mpa.p1amt) budget,
(select sum(productqty) from C_sales_order where DateOrdered between pre.startdate and pre.enddate) achievement from C_Mark_Period_Area mpa
left join C_Mark_Period mp on (mpa.C_Mark_Period_id=mp.C_Mark_Period_id)
left join C_Period  pre on (pre.C_period_id=mpa.C_period_id)
where pre.startdate <= current_date
group by 1,pre.C_period_id
order by pre.C_period_id desc limit 12
`
router.get('/details',(req,res)=>{
	db
  .query(monthlyBudgetVsAchievement, { raw: true })
  .then(projects => {
    res.json(projects);
  })
})

router.get('/yearly',(req,res)=>{
	db.query(yearlyBudgetVsAchievement,{raw:true})
	.then(projects=>{
		res.json(projects)
	})
})

module.exports=router;