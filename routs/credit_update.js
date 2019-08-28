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
	db
  .query(creditUpdate, { raw: true })
  .then(projects => {
    res.json(projects);
  })
})

module.exports=router;