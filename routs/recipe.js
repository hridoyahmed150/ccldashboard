const express=require('express');
const router=express.Router();
const sequelize=require('sequelize');


const db=require('../config/database');

const recepi=`
select 
b.prodname, bl.recipename, 
sum(case when bl.rprodname='CLINKER' then  bl.qtybom else 0 end ) as clinkerqty,
sum(case when bl.rprodname='GYPSUM' then  bl.qtybom else 0 end ) as GYPSUMqty,
sum(case when bl.rprodname='Slag' then  bl.qtybom else 0 end ) as Slagqty,
sum(case when bl.rprodname='LIME STONE' then  bl.qtybom else 0 end ) as limestoneqty,
sum(case when bl.rprodname='Fly Ash' then  bl.qtybom else 0 end ) as flyashqty
FROM(select
	pb.pp_product_BOM_ID, p.name prodname, 
	( SELECT MIN(PP_product_bom_version_ID) FROM PP_product_bom_version WHERE isactive='Y' and pp_product_BOM_ID=pb.pp_product_BOM_ID) PP_product_bom_version_ID
from pp_product_BOM pb
--left join PP_product_bom_version pbv on (pb.pp_product_BOM_id=pbv.pp_product_BOM_ID)
left join m_product p on (pb.m_product_id=p.m_product_id)) b

join (SELECT
	pbv.PP_product_bom_version_ID, pbl.pp_product_BOM_ID, p.name rprodname, pbl.qtybom , pbv.name recipename
FROM pp_product_bomline pbl
LEFT OUTER JOIN m_product p on (pbl.m_product_ID=p.m_product_ID)
LEFT OUTER JOIN PP_product_bom_version pbv on (pbl.PP_product_bom_version_id=pbv.PP_product_bom_version_ID)
order by 1
) bl on (bl.PP_product_bom_version_ID=b.PP_product_bom_version_ID) 
where b.prodname !='Ready-mix'
group by 1 ,2
order by 1
`;
router.get('/details',(req,res)=>{
	db
  .query(recepi, { raw: true })
  .then(projects => {
    res.json(projects);
  })
})

module.exports=router;