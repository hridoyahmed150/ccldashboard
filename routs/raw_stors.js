const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');

const db=require('../config/database');
const SalesOrder=require('../models/SalesOrder');

const rawStors=`
select locator.value storname,ROUND(sum(tns.movementqty),2) storqty from M_Transaction tns
left join m_product pro on (pro.m_product_id=tns.m_product_id)
left join M_Locator locator on (locator.m_locator_id=tns.m_locator_id)
left join M_Product_Category pc on (pc.M_Product_Category_id=pro.M_Product_Category_id)
where pc.value like '%RawMaterial%'
group by locator.value`;
router.get('/details',(req,res)=>{
	db
  .query(rawStors, { raw: true })
  .then(projects => {
    res.json(projects);
  })
})

module.exports=router;