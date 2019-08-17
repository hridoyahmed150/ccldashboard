const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');


const db=require('../config/database');

// const productionDeliveryQuery="select p.productiondate,del.deliverydate,coalesce(p.pqty,0) prod,coalesce(del.mqty,0) mqty from (SELECT date_trunc('month', p.movementdate) productiondate,sum(pl.achievedqty) as pqty from M_ProductionPlan pl left join M_Production p on (pl.M_Production_id=p.M_Production_id) where p.AD_Client_ID=1000000  and pl.m_product_id in(select m_product_id from m_product where ad_client_id=1000000 and isactive='Y' and M_Product_Category_ID in (1000099,1000098,1000100)) group by 1 order by 1 desc) p full join (SELECT date_trunc('month', m.movementdate) deliverydate,sum(ml.movementqty) as mqty from m_inoutline ml left join M_inout m on (ml.M_inout_id=m.M_inout_id) where m.AD_Client_ID=1000000  and m.docstatus in ('CO','CL') group by 1 order by 1 desc) del on p.productiondate=del.deliverydate";


const productionVsDelivery="select p.productiondate,del.deliverydate,coalesce(p.pqty,0) productionqty,coalesce(del.mqty,0) deliveryqty from (SELECT date_trunc('month', p.movementdate) productiondate,sum(pl.achievedqty) as pqty from M_ProductionPlan pl  left join M_Production p on (pl.M_Production_id=p.M_Production_id) where p.AD_Client_ID=1000000 and pl.m_product_id in(select m_product_id from m_product where ad_client_id=1000000 and isactive='Y' and M_Product_Category_ID in (1000099,1000098,1000100)) group by 1 order by 1 desc limit 6 ) p full join (SELECT date_trunc('month', m.movementdate) deliverydate,sum(ml.movementqty) as mqty from m_inoutline ml left join M_inout m on (ml.M_inout_id=m.M_inout_id)  where m.AD_Client_ID=1000000 and m.docstatus in ('CO','CL') group by 1 order by 1 desc limit 6 ) del on p.productiondate=del.deliverydate";
router.get('/details',(req,res)=>{

	// res.send('hello');
	db
  .query(productionVsDelivery, { raw: true })
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