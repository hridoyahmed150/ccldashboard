const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');

const db=require('../config/database');
const SalesOrder=require('../models/SalesOrder');

const monthlyBudgetVsAchievement=`
select pre.name labels,sum(mpa.p1amt) budget,
(select sum(productqty) from C_sales_order where DateOrdered between pre.startdate and pre.enddate and docstatus in ('CO','CL')) achievement from C_Mark_Period_Area mpa
left join C_Mark_Period mp on (mpa.C_Mark_Period_id=mp.C_Mark_Period_id)
left join C_Period  pre on (pre.C_period_id=mpa.C_period_id)
where pre.startdate <= current_date
group by 1,pre.C_period_id
order by pre.C_period_id desc limit 12`;

const quarterlyBudgetVsAchievement=`
select labels, sum(budget) budget, sum(achievement) achievement from (
select date_trunc('quarter',coalesce(pre.startdate, pre.enddate)) labels,sum(mpa.p1amt) budget,
(select sum(productqty) from C_sales_order where DateOrdered between pre.startdate and pre.enddate and docstatus in ('CO', 'CL')) achievement from C_Mark_Period_Area mpa
left join C_Mark_Period mp on (mpa.C_Mark_Period_id=mp.C_Mark_Period_id)
left join C_Period  pre on (pre.C_period_id=mpa.C_period_id)
where pre.startdate <= current_date
group by 1,pre.C_period_id
order by pre.C_period_id desc) f
group by 1
`;


const yearlyBudgetVsAchievement = `select labels, sum(budget) budget, sum(achievement) achievement from (
select date_trunc('year',coalesce(pre.startdate, pre.enddate)) labels,sum(mpa.p1amt) budget,
(select sum(productqty) from C_sales_order where DateOrdered between pre.startdate and pre.enddate and docstatus in ('CO', 'CL')) achievement from C_Mark_Period_Area mpa
left join C_Mark_Period mp on (mpa.C_Mark_Period_id=mp.C_Mark_Period_id)
left join C_Period  pre on (pre.C_period_id=mpa.C_period_id)
where pre.startdate <= current_date
group by 1,pre.C_period_id
order by pre.C_period_id desc limit 12) f
group by 1`;

const monthlyyBudgetVsAchievement =`
select labels, sum(budget) budget, sum(achievement) achievement from (
select date_trunc('month',coalesce(pre.startdate, pre.enddate)) labels ,sum(mpa.p1amt) budget,
(select sum(productqty) from C_sales_order where DateOrdered between pre.startdate and pre.enddate and docstatus in ('CO', 'CL')) achievement from C_Mark_Period_Area mpa
left join C_Mark_Period mp on (mpa.C_Mark_Period_id=mp.C_Mark_Period_id)
left join C_Period  pre on (pre.C_period_id=mpa.C_period_id)
where pre.startdate <= current_date
group by 1,pre.C_period_id
order by labels desc) f
group by 1
`;
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
router.get('/quaterly',(req,res)=>{
	db.query(quarterlyBudgetVsAchievement,{raw:true})
	.then(projects=>{
		res.json(projects)
	})
})

router.get('/monthly',(req,res)=>{
	db.query(monthlyyBudgetVsAchievement,{raw:true})
	.then(projects=>{
		res.json(projects)
	})
})

module.exports=router;