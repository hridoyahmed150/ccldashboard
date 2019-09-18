const express= require('express');
const exph= require('express-handlebars');
const bodyParser= require('body-parser');
const path= require('path');
const passport = require('passport');


const db=require('./config/database');
const users = require('./routs/api/users');

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

// body-parser middleware use

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())

app.use(passport.initialize());

require('./config/passport')(passport)

app.use('/api/salesorder',require('./routs/sales_order'));
app.use('/api/productiondelivery',require('./routs/production_deliverydate'));
app.use('/api/purchaseinvoice',require('./routs/purchase_vs_invoice'));
app.use('/api/employeeAttendance',require('./routs/employee_attendance'));
app.use('/api/collection',require('./routs/collection'));
app.use('/api/hrupdate',require('./routs/hr_update'));
app.use('/api/rawstor',require('./routs/raw_stors'));
app.use('/api/rawincoming',require('./routs/raw_incoming'));
app.use('/api/productionbudget',require('./routs/production_vs_budget'));
app.use('/api/budgetachievement',require('./routs/sales_budget_vs_achievement'));
app.use('/api/inflowoutflow',require('./routs/inflow_vs_outflow'));
app.use('/api/creditupdate',require('./routs/credit_update'));
app.use('/api/recipe',require('./routs/recipe'));
app.use('/api/users', users);

 
const PORT=process.env.PORT || 5000;

app.listen(PORT , console.log(`Server start on Port ${PORT}`))
