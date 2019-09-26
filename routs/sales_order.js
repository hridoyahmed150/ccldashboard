const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');

const db=require('../config/database');
const SalesOrder=require('../models/SalesOrder');

const salesAndCollectionQuery=`select s.DateInvoiced,c.dateacct, c.Collection, s.Sales 
from (SELECT date_trunc('month', DateInvoiced) DateInvoiced, SUM(GrandTotal) 
Sales FROM C_Invoice WHERE IsSOTrx='Y' AND docstatus in('CO','CL') group by 1 order by 1 desc) s 
full join (SELECT date_trunc('month',dateacct) dateacct,sum(case when debitamt > 0 then debitamt when creditamt > 0 then creditamt else 0 end)
 Collection FROM c_acct_bank WHERE  docstatus in('CO','CL') and c_doctype_id=1000008 group by 1 order by 1 desc) c
  on (s.DateInvoiced=c.dateacct)limit 6`;
router.get('/details',(req,res)=>{
	db
  .query(salesAndCollectionQuery, { raw: true })
  .then(projects => {
    res.json(projects);
  })
})

module.exports=router;