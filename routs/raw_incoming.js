const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');

const db=require('../config/database');
const SalesOrder=require('../models/SalesOrder');

const rawIncoming=`
select date_trunc('month',io.MovementDate) date ,sum(iol.QtyEntered) total from M_InOutLine iol 
left join M_InOut io on (io.M_InOut_id=iol.M_InOut_id)
left join m_product pro on (pro.m_product_id=iol.m_product_id)
left join M_Product_Category pc on (pc.M_Product_Category_id=pro.M_Product_Category_id)
where io.issotrx='N' 
and io.ad_client_id=1000000
and pc.value like '%RawMaterial%'
group by 1
order by 1 desc`;
router.get('/details',(req,res)=>{

	// res.send('hello');
	db
  .query(rawIncoming, { raw: true })
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