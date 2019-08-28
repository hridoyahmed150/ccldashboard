const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');


const db=require('../config/database');


const inflowVsOutflow=`
SELECT date_trunc('month',dateacct) dateacct,SUM(debitamt) totaldebit_amt,SUM(creditamt) total_credit_amt FROM c_acct_bank 
where c_doctype_id in (1000008,1000009) and docstatus in ('CO','CL') 
group by 1 
order by 1 desc 
limit 12
`
router.get('/details',(req,res)=>{
	db
  .query(inflowVsOutflow, { raw: true })
  .then(projects => {
    res.json(projects);
  })
})

module.exports=router;