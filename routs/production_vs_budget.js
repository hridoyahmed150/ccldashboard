const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');

const db=require('../config/database');
const SalesOrder=require('../models/SalesOrder');

const rawStors=`
select CASE WHEN budget.budgetdate is null THEN production.productiondate
WHEN budget.budgetdate IS NOT NULL Then budget.budgetdate
END AS date,budget.budgetamount,production.productionqty from (select date_trunc('month',pp.budget_date) budgetdate, sum(pp.p1amt) budgetamount --,ppb.plan_date,ppb.* 
from m_production_plan_budget3 pp
left join M_Production_Plan_Budget ppb on (pp.M_production_plan_budget_id= ppb.M_production_plan_budget_id)
GROUP BY 1) budget
full join (select date_trunc('month', p.movementdate) productiondate , sum(pp.productionqty) productionqty from M_ProductionPlan pp
left join M_Production p on (p.m_production_id=pp.M_production_id) 
GROUP BY 1) production on (production.productiondate=budget.budgetdate)
order by 1 desc`;
router.get('/details',(req,res)=>{
	db
  .query(rawStors, { raw: true })
  .then(projects => {
    res.json(projects);
  })
})

module.exports=router;