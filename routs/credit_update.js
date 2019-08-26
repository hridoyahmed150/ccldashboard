const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');


const db=require('../config/database');


const creditUpdate=`
select sum(so_creditlimit) creditupdate from c_bpartner
where isCustomer='Y'
and isActive='Y'
`
router.get('/details',(req,res)=>{

	// res.send('hello');
	db
  .query(creditUpdate, { raw: true })
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