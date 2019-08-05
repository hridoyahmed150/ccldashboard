const express= require('express');
const exph= require('express-handlebars');
const bodyParser= require('body-parser');
const path= require('path');

const db=require('./config/database');

// db conncetion test

db
.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const app=express();

app.use('/api/salesorder',require('./routs/sales_order'));
app.use('/api/productiondelivery',require('./routs/production_deliverydate'));
app.use('/api/purchaseinvoice',require('./routs/purchase_vs_invoice'));
app.use('/api/employeeAttendance',require('./routs/employee_attendance'));
 
const PORT=process.env.PORT || 5000;

app.listen(PORT , console.log(`Server start on Port ${PORT}`))