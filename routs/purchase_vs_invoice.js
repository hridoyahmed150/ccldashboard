const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');

const db=require('../config/database');

const purchaseVsInvoiceQuery="SELECT po.podate, inv.invdate, po.poGrandTotal, inv.invGrandTotal FROM (select date_trunc('months',o.DateOrdered) podate,sum(o.GrandTotal) poGrandTotal from C_Order o WHERE o.IsSOTrx='N' and o.docstatus in ('CO','CL') GROUP BY 1 ORDER BY 1 desc) po full join(select date_trunc('months',i.DateInvoiced) invdate,sum(i.GrandTotal) invGrandTotal from C_Invoice i WHERE i.IsSOTrx='N' AND i.C_DocType_ID=1000005 and i.docstatus in ('CO','CL') GROUP BY 1 ORDER BY 1 desc) inv on (po.podate=inv.invdate)";
router.get('/details',(req,res)=>{

	// res.send('hello');
	db
  .query(purchaseVsInvoiceQuery, { raw: true })
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