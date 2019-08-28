// import { AnnouncementCard, TodosCard } from 'components/Card';
// import HorizontalAvatarList from 'components/HorizontalAvatarList';
// import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import axios from 'axios';
// import ProductMedia from 'components/ProductMedia';
// import SupportTicket from 'components/SupportTicket';
// import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
// import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
// import {avatarsData,chartjs,productsData,supportTicketsData,todosData,userProgressTableData,} from 'demos/dashboardPage';
import React from 'react';
import { Bar, Line , Pie ,Polar ,Bubble,Doughnut  } from 'react-chartjs-2';
import {MdBubbleChart,MdInsertChart,MdPersonPin,MdPieChart,MdRateReview,MdShare,MdShowChart,MdThumbUp,} from 'react-icons/md';
import {Badge,Button,Card,CardBody,CardDeck,CardGroup,CardHeader,CardTitle,Col,ListGroup,ListGroupItem,Row,} from 'reactstrap';
import { getColor } from 'utils/colors';

import { randomNum } from 'utils/demos';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class DashboardPage extends React.Component {
  state={}

  componentWillMount(){
    axios.get(`/api/salesorder/details`)
      .then(res => {
        // console.log(res.data[0]);
        let newState={
          ...this.state,
          salesOrder:res.data[0]
        }
        this.setState(newState);
      })

    axios.get(`/api/productiondelivery/details`)
     .then(res => {
       let newState={
          ...this.state,
          production:res.data[0]
        }
        // console.log(res.data[0]);
      this.setState(newState);
    })
     axios.get(`/api/purchaseinvoice/details`)
     .then(res => {
       let newState={
          ...this.state,
          purchaseinvoice:res.data[0]
        }
        // console.log(res.data[0]);
      this.setState(newState);
    })

     axios.get(`/api/employeeAttendance/details`)
     .then(res => {
       let newState={
          ...this.state,
          employeeAttendance:res.data[0]
        }
        // console.log(res.data[0]);
      this.setState(newState);
    })

     axios.get(`/api/collection/details`)
     .then(res => {
       let newState={
          ...this.state,
          collection:res.data[0]
        }
      this.setState(newState);
        // console.log(this.state);
    })
      axios.get(`/api/hrupdate/details`)
      .then(res => {
        let newState={
           ...this.state,
           hrupdate:res.data[0]
         }
       this.setState(newState);
         // console.log(this.state);
     })
      axios.get(`/api/rawstor/details`)
      .then(res => {
        let newState={
           ...this.state,
           rawstor:res.data[0]
         }
       this.setState(newState);
     })
      axios.get(`/api/rawincoming/details`)
      .then(res => {
        let newState={
           ...this.state,
           rawincoming:res.data[0]
         }
       this.setState(newState);
         // console.log(this.state);
     })
      axios.get(`/api/productionbudget/details`)
      .then(res => {
        let newState={
           ...this.state,
           productionbudget:res.data[0]
         }
       this.setState(newState);
         // console.log(this.state);
     })
    axios.get(`/api/budgetachievement/details`)
      .then(res => {
        let newState={
          ...this.state,
          budgetachievement:res.data[0]
      }
     this.setState(newState);
    })
    axios.get(`/api/inflowoutflow/details`)
      .then(res => {
        let newState={
          ...this.state,
          inflowoutflow:res.data[0]
        }
      this.setState(newState);
        // console.log(this.state);
    })
    axios.get(`/api/creditupdate/details`)
     .then(res => {
       let newState={
          ...this.state,
          creditupdate:res.data[0]
        }
      this.setState(newState);
    })
    axios.get(`/api/recipe/details`)
     .then(res => {
       let newState={
          ...this.state,
          recipe:res.data[0]
        }
      this.setState(newState);
    })
  }

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }
  render() {

    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');
    let value=this.state.ad_client_id;
    const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const DAYS=Array.from({length: 30}, (v, k) => k+1);
    const saleData=[];
    const collectionData=[];
    const salesAndCollectionDate=[];
    const deleveryQty=[];
    const productionQty=[];
    const productionVsDeliveryDate=[];
    const purchaseData=[];
    const invoiceData=[];
    const purchaseinvoiceDate=[];
    const totalEmpData=[];
    const attendenceData=[];
    const totalCollection=[];
    const collectionDate= [];
    const myFormatDate=[];
    const hrDepartmentName=[];
    const hrAttend=[];
    const hrTotal=[];
    const storName=[];
    const storQty=[];
    const rawIncomingDate=[];
    const rawIncomingTotal=[];
    const rawIncomingMonth=[];
    const renderColor=[];
    let lastMonthSales='';
    const newName=[];
    const budgetAmount=[];
    const bproductionQty=[];
    const budgetDate =[];
    const budgetProductionDate=[];
    const salesBudget=[];
    const salesAchievement=[];
    const budgetTime=[];
    const debitInflow=[];
    const creditInflow=[];
    const creditUpdate=[];
    const recipeProductName=[];
    const recipeDataset=[];
    const recipenamearray=[];
    const recipeClinker=[];
    const recipeFlyash=[];
    const receipeGypsum=[];
    const recipeLimestone=[];
    const recipeSlag=[];


    const gotosalesvscollection=()=>{
      this.props.history.push('/salesvscollection');
    }
    
    const gotopurchasevsinvoice=()=>{
      this.props.history.push('/purchasevsinvoice');
    }
    
    const gotoattendance=()=>{
      this.props.history.push('/attendance');
    }
    const budgetachievement=()=>{
      this.props.history.push('/budgetachievement');
    }

    if (this.state.salesOrder) {
      let month=[];
      this.state.salesOrder.map((item)=>{
        saleData.push(item.sales);
        collectionData.push(item.collection);
        lastMonthSales=item.sales;
        month.push(item.dateacct);
      })
      month.map((item)=>{
        var myDate;
        let result =item.slice(0,10); 
        let t = result.split("-");
        if(t[2]) {
          myDate = new Date(t[0], t[1]-1, t[2]);
          salesAndCollectionDate.push(MONTHS[myDate.getMonth()+1]);
        }
      })
    }

    if (this.state.production) {
      let month=[];
      this.state.production.map((item)=>{
          deleveryQty.push(Math.floor(item.deliveryqty));
          productionQty.push(Math.floor(item.productionqty));
          month.push(item.productiondate);
      })
      month.map((item)=>{
        var myDate;
        let result =item.slice(0,10); 
        let t = result.split("-");
        if(t[2]) {
          myDate = new Date(t[0], t[1]-1, t[2]);
          productionVsDeliveryDate.push(MONTHS[myDate.getMonth()+1]);
        }
      })
      console.log(productionVsDeliveryDate)
    }

    if (this.state.purchaseinvoice) {
      let month=[];
      this.state.purchaseinvoice.map((item)=>{
        purchaseData.push(item.invgrandtotal);
        invoiceData.push(item.pograndtotal);
        month.push(item.podate)
      })
      month.map((item)=>{
        var myDate;
        let result =item.slice(0,10); 
        let t = result.split("-");
        if(t[2]) {
          myDate = new Date(t[0], t[1]-1, t[2]);
          purchaseinvoiceDate.push(MONTHS[myDate.getMonth()+1]);
        }
      })
    }

    if (this.state.employeeAttendance) {
      this.state.employeeAttendance.map((item)=>{
        totalEmpData.push(item.totalemp);
        attendenceData.push(item.totalattend)
      })
    }

    if (this.state.collection) {
      this.state.collection.map((item)=>{
        totalCollection.push(item.total_amt);
        collectionDate.push(item.dateacct);
      })
      collectionDate.map((item)=>{
        var myDate;
        let result =item.slice(0,10); 
        let t = result.split("-");
        if(t[2]) {
          myDate = new Date(t[0], t[1]-1, t[2]);
          myFormatDate.push(MONTHS[myDate.getMonth()+1]);
        }
      })
    }

    if (this.state.hrupdate) {
      this.state.hrupdate.map((item)=>{
        hrDepartmentName.push(item.name);
        hrTotal.push(item.employeecount);
        hrAttend.push(item.attendcount);
      })
      hrDepartmentName.map((item)=>{
        // console.log(item);
        if (item!==null) {
          newName.push(item.split(" ").map((i)=>i.charAt(0)).join(""));
          // console.log('hello')
        }
      })
    }
    if (this.state.rawstor) {
      this.state.rawstor.map((item)=>{
        storName.push(item.storname);
        storQty.push(item.storqty);
        renderColor.push(`rgba(${Math.floor(Math.random() * 255)+1},${Math.floor(Math.random() * 255)+1},${Math.floor(Math.random() * 255)+1},1)`);
      })
    }
    if (this.state.rawincoming) {
      this.state.rawincoming.map((item)=>{
        rawIncomingDate.push(item.date);
        rawIncomingTotal.push(item.total);
      })
      rawIncomingDate.map((item)=>{
        var myDate;
        let result =item.slice(0,10); 
        let t = result.split("-");
        if(t[2]) {
          myDate = new Date(t[0], t[1]-1, t[2]);
          rawIncomingMonth.push(MONTHS[myDate.getMonth()+1]);
        }
      })
    }

    if (this.state.productionbudget) {
      this.state.productionbudget.map((item)=>{
        budgetAmount.push(item.budgetamount);
        bproductionQty.push(item.productionqty);
        budgetDate.push(item.date);
      })
      
        budgetDate.map((item)=>{
          if (item) {
            var myDate;
            let result =item.slice(0,10); 
            let t = result.split("-");
            if(t[2]) {
              myDate = new Date(t[0], t[1]-1, t[2]);
              budgetProductionDate.push(MONTHS[myDate.getMonth()+1]);
            }
          }
        })
      
    }
    if (this.state.budgetachievement) {
      this.state.budgetachievement.map((item)=>{
        salesBudget.push(item.budget);
        salesAchievement.push(item.achievement);
        budgetTime.push(item.name);
      })
    }

    if (this.state.inflowoutflow) {
      this.state.inflowoutflow.map((item)=>{
        debitInflow.push(item.totaldebit_amt);
        creditInflow.push(item.total_credit_amt);
      })
    }
    if (this.state.creditupdate) {
      this.state.creditupdate.map(item=>{
        creditUpdate.push(parseFloat(item.creditupdate));
      })
    }
    

    if (this.state.recipe) {
      console.log(this.state.recipe);
        this.state.recipe.map(item=>{
          recipeProductName.push(item.prodname);
          recipeClinker.push(item.clinkerqty);
          recipeFlyash.push(item.flyashqty);
          receipeGypsum.push(item.gypsumqty);
          recipeLimestone.push(item.limestoneqty);
          recipeSlag.push(item.slagqty)
        })
    }

    const salesandcollectionData={
      labels:salesAndCollectionDate,
      datasets:[
        {
          label: 'Sales',
          backgroundColor: getColor('primary'),
          borderColor: getColor('primary'),
          borderWidth: 1,
          data: saleData,
        },
        {
          label: 'Collection',
          backgroundColor: getColor('secondary'),
          borderColor: getColor('secondary'),
          borderWidth: 1,
          data: collectionData,
        },
      ]
    }
    const productDeleveryData={
      data: {
        labels: productionVsDeliveryDate,
        datasets: [
          {
            label: 'Delivery for this month',
            backgroundColor: '#6a82fb',
            stack: 'Expense',
            data:deleveryQty,
          },
          {
            label: 'Production for last month',
            backgroundColor: '#fc5c7d',
            stack: 'Expense',
            data: productionQty,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [{
            fontSize: 40
          }]
         }
      },
      getDatasetAtEvent:(event,history)=>{
        // browserHistory.push("/home");
        this.props.history.push('/productiondelivery');
      }
    };
    const genLineData = (moreData = {}, moreData2 = {}) => {
      return {
        labels: MONTHS,
        datasets: [
          {
            label: 'Sales',
            backgroundColor: getColor('primary'),
            borderColor: getColor('primary'),
            borderWidth: 1,
            data: saleData,
            ...moreData,
          },
          {
            label: 'Collection',
            backgroundColor: getColor('secondary'),
            borderColor: getColor('secondary'),
            borderWidth: 1,
            data: collectionData,
            ...moreData2,
          },
        ],
      };
    };
    const Attendance= (moreData = {}, moreData2 = {}) => {
      return {
        labels: DAYS,
        datasets: [
          {
            label: 'Attendance',
            backgroundColor: getColor('primary'),
            borderColor: getColor('primary'),
            borderWidth: 1,
            data: attendenceData,
            ...moreData2,
          },
        ],
      };
    };
    const purchaseinvoiceLineData = (moreData = {}, moreData2 = {}) => {
      return {
        labels: purchaseinvoiceDate,
        datasets: [
          {
            label: 'Purchase',
            backgroundColor: getColor('primary'),
            borderColor: getColor('primary'),
            borderWidth: 1,
            data: purchaseData,
            ...moreData,
          },
          {
            label: 'Invoice',
            backgroundColor: getColor('secondary'),
            borderColor: getColor('secondary'),
            borderWidth: 1,
            data: invoiceData,
            ...moreData2,
          },
        ],
      };
    };

    const genPieData = () => {
      return {
        datasets: [
          {
            data:totalCollection,
            backgroundColor: [
              getColor('primary'),
              getColor('secondary'),
              getColor('success'),
              getColor('info'),
              getColor('danger'),
            ],
            label: 'Dataset 1',
          },
        ],
        labels:myFormatDate,
      };
    };

    const rawstordata={
      labels:storName,
      datasets: [
        {
          data:storQty,
          backgroundColor:renderColor,
          label: 'Dataset 1',
        }
      ],
    }

    const hrupdateLineData = {
        labels: newName,
        datasets: [
          {
            label: 'Total Employee',
            backgroundColor: getColor('primary'),
            borderColor: getColor('primary'),
            borderWidth: 1,
            data: hrTotal,
            fill:false
          },
          {
            label: 'Attendance Employee',
            backgroundColor: getColor('secondary'),
            borderColor: getColor('secondary'),
            borderWidth: 1,
            data: hrAttend,
            fill:false
          },
        ],
        options: {
          scales: {
            xAxes: [{
              ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 90
              }
            }]
          }
        }
    };
    const rawIncomingBubbleData= (moreData = {}, moreData2 = {}) => {
      return {
        labels: rawIncomingMonth,
        datasets: [
          {
            label: 'Raw Incoming',
            backgroundColor: getColor('primary'),
            borderColor: getColor('primary'),
            borderWidth: 1,
            data: rawIncomingTotal,
            ...moreData2,
          },
        ],
      };
    };

    const productionBudgetData={
      labels: budgetProductionDate,
      datasets: [
        {
          label: 'Budget',
          backgroundColor: getColor('primary'),
          borderColor: getColor('primary'),
          borderWidth: 1,
          data: budgetAmount
        },
        {
          label: 'Production Quantity',
          backgroundColor: getColor('secondary'),
          borderColor: getColor('secondary'),
          borderWidth: 1,
          data: bproductionQty
        },
      ],    
    }
    
    const budgetAchievementData = (moreData = {}, moreData2 = {}) => {
      return {
        labels: budgetTime,
        datasets: [
          {
            label: 'Budget',
            backgroundColor: getColor('primary'),
            borderColor: getColor('primary'),
            borderWidth: 1,
            data: salesBudget,
            ...moreData,
          },
          {
            label: 'Achievement',
            backgroundColor: getColor('secondary'),
            borderColor: getColor('secondary'),
            borderWidth: 1,
            data:salesAchievement,
            ...moreData2,
          },
        ],
      };
    };

    const cashInflowVsOutflow = {
        labels: myFormatDate,
        datasets: [
          {
            label: 'Inflow',
            backgroundColor: getColor('primary'),
            borderColor: getColor('primary'),
            borderWidth: 1,
            data: debitInflow,
            fill:false
          },
          {
            label: 'Outflow',
            backgroundColor: getColor('secondary'),
            borderColor: getColor('secondary'),
            borderWidth: 1,
            data: creditInflow,
            fill:false
          },
        ],
        options: {
          scales: {
            xAxes: [{
              ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 90
              }
            }]
          }
        }
    };
    const creditUpdateData = () => {
      return {
        datasets: [
          {
            data:creditUpdate,
            backgroundColor: [
              getColor('primary'),
              getColor('secondary'),
              getColor('success'),
              getColor('info'),
              getColor('danger'),
            ],
            label: 'Total Credit',
            toolTipContent:`heidh0p`,
            value : 30,
            color : "#F38630",
            label : 'Sleep',
            labelColor : 'white',
            labelFontSize : '10',
            labelAlign : 'left'
          },
        ],
        // labels:myFormatDate,
        labels:[`Total Credit ${creditUpdate[0]}`],
        options: {
        centerText: {
            display: true,
            text: `90%`
          }
        },
         text: '23%'
      };
    };

    const recipeData={
      data: {
        labels: recipeProductName,
        datasets: [
          {
            label: 'Clinker',
            backgroundColor: '#6a82fb',
            stack: 'Expense',
            data:recipeClinker,
          },
          {
            label: 'Gypsum',
            backgroundColor: '#fc5c7d',
            stack: 'Expense',
            data: receipeGypsum,
          },
          {
            label: 'Limestone',
            backgroundColor: '#630094',
            stack: 'Expense',
            data: recipeLimestone,
          },
          {
            label: 'Flyash',
            backgroundColor: '#009488',
            stack: 'Expense',
            data: recipeFlyash,
          },
          {
            label: 'Slag',
            backgroundColor: '#943800',
            stack: 'Expense',
            data: recipeSlag,
          },
        ],
      }
    };

    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Sales"
              subtitle="This month"
              number={lastMonthSales}
              color="secondary"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Purchase"
              subtitle="This month"
              number="5,400"
              color="secondary"
              progress={{
                value: 45,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Collection"
              subtitle="This month"
              number="3,400"
              color="secondary"
              progress={{
                value: 90,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Production"
              subtitle="This month"
              number="38%"
              color="secondary"
              progress={{
                value: 60,
                label: 'Last month',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="6" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                Total Sales And Collection
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
                <Bar data={salesandcollectionData} onElementsClick={()=>gotosalesvscollection()} />
              </CardBody>
            </Card>
          </Col>

          <Col lg="6" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                Total Purchase Vs Invoice{' '}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
                <Bar data={purchaseinvoiceLineData} onElementsClick={()=>gotopurchasevsinvoice()}/>
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Attendance (Total Employees : {totalEmpData[0]})</CardHeader>
              <CardBody>
                <Bar data={Attendance({ type: 'line', fill: false })} onElementsClick={()=>gotoattendance()}/>
              </CardBody>
            </Card>
          </Col>

          <Col lg="6" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Production vs Delivery</CardHeader>
              <CardBody>
                <Bar data={productDeleveryData.data}   onElementsClick={(dataset)=>productDeleveryData.getDatasetAtEvent(dataset)}/>
              </CardBody>
              {/*
                <ListGroup flush>
                  <ListGroupItem>
                    <MdInsertChart size={25} color={primaryColor} /> Cost of sales{' '}
                    <Badge color="secondary">{value}</Badge>
                  </ListGroupItem>
                  <ListGroupItem>
                    <MdBubbleChart size={25} color={primaryColor} /> Management
                    costs <Badge color="secondary">$1200</Badge>
                  </ListGroupItem>
                  <ListGroupItem>
                    <MdShowChart size={25} color={primaryColor} /> Financial costs{' '}
                    <Badge color="secondary">$800</Badge>
                  </ListGroupItem>
                  <ListGroupItem>
                    <MdPieChart size={25} color={primaryColor} /> Other operating
                    costs <Badge color="secondary">$2400</Badge>
                  </ListGroupItem>
                </ListGroup> 
              */}
            </Card>
          </Col>

          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Collection</CardHeader>
              <CardBody>
                <Pie data={genPieData()} />
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={12} md={12}>
            <Card>
               <CardBody>
                 Row Incoming
               </CardBody> 
               <CardBody>
                 <Line data={rawIncomingBubbleData} />
               </CardBody>
            </Card>
          </Col>

          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardHeader>HR Update</CardHeader>
              <CardBody>
                <Line data={hrupdateLineData} />
              </CardBody>
            </Card>
          </Col>

          <Col xl={12} lg={12} md={12} sm={12}>
            <Card>
              <CardHeader>RAW Store</CardHeader>
              <CardBody>
                <Polar data={rawstordata} />
              </CardBody>
            </Card>
          </Col>

          <Col lg="6" md="12" sm="12" xs="12" sm={12}>
            <Card>
              <CardHeader>
                Production Vs Budget
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
                <Bar data={productionBudgetData} />
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={12} md={12} sm={12}>
            <Card>
               <CardBody>
                 Sales - Budget Vs Achievement
               </CardBody> 
               <CardBody>
                 <Line data={budgetAchievementData()} onElementsClick={()=>budgetachievement()} />
               </CardBody>
            </Card>
          </Col>

          <Col xl={12} lg={12} md={12} sm={12}>
            <Card>
              <CardHeader>Cash Inflow And Outflow</CardHeader>
              <CardBody>
                <Line data={cashInflowVsOutflow} />
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={12} md={12} sm={12}>
            <Card>
              <CardHeader>Credit Update</CardHeader>
              <CardBody>
                <Doughnut data={creditUpdateData()} options={creditUpdateData().options} />
              </CardBody>
            </Card>
          </Col>

          <Col lg="6" md="12" sm="12" xs="12" sm={12}>
            <Card>
              <CardHeader>Production vs Delivery</CardHeader>
              <CardBody>
                <Bar data={recipeData.data} />
              </CardBody>
            </Card>
          </Col>

        </Row>

        

        {/*<Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>New Products</CardHeader>
              <CardBody>
                {productsData.map(
                  ({ id, image, title, description, right }) => (
                    <ProductMedia
                      key={id}
                      image={image}
                      title={title}
                      description={description}
                      right={right}
                    />
                  ),
                )}
              </CardBody>
            </Card>
          </Col>

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>New Users</CardHeader>
              <CardBody>
                <UserProgressTable
                  headers={[
                    <MdPersonPin size={25} />,
                    'name',
                    'date',
                    'participation',
                    '%',
                  ]}
                  usersData={userProgressTableData}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={4} md={4} sm={12} xs={12}>
            <Card>
              <Line
                data={getStackLineChart({
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                  ],
                  data: [0, 13000, 5000, 24000, 16000, 25000, 10000],
                })}
                options={stackLineChartOptions}
              />
              <CardBody
                className="text-primary"
                style={{ position: 'absolute' }}
              >
                <CardTitle>
                  <MdInsertChart /> Sales
                </CardTitle>
              </CardBody>
            </Card>
          </Col>

          <Col lg={4} md={4} sm={12} xs={12}>
            <Card>
              <Line
                data={getStackLineChart({
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                  ],
                  data: [10000, 15000, 5000, 10000, 5000, 10000, 10000],
                })}
                options={stackLineChartOptions}
              />
              <CardBody
                className="text-primary"
                style={{ position: 'absolute' }}
              >
                <CardTitle>
                  <MdInsertChart /> Revenue
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12}>
            <Card>
              <Line
                data={getStackLineChart({
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                  ],
                  data: [0, 13000, 5000, 24000, 16000, 25000, 10000].reverse(),
                })}
                options={stackLineChartOptions}
              />
              <CardBody
                className="text-primary"
                style={{ position: 'absolute', right: 0 }}
              >
                <CardTitle>
                  <MdInsertChart /> Profit
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="4" md="12" sm="12" xs="12">
            <InfiniteCalendar
              selected={today}
              minDate={lastWeek}
              width="100%"
              theme={{
                accentColor: primaryColor,
                floatingNav: {
                  background: secondaryColor,
                  chevron: primaryColor,
                  color: '#FFF',
                },
                headerColor: primaryColor,
                selectionColor: secondaryColor,
                textColor: {
                  active: '#FFF',
                  default: '#333',
                },
                todayColor: secondaryColor,
                weekdayColor: primaryColor,
              }}
            />
          </Col>

          <Col lg="8" md="12" sm="12" xs="12">
            <Card inverse className="bg-gradient-primary">
              <CardHeader className="bg-gradient-primary">
                Map with bubbles
              </CardHeader>
              <CardBody>
                <MapWithBubbles />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <CardDeck style={{ marginBottom: '1rem' }}>
          <Card body style={{ overflowX: 'auto','paddingBottom':'15px','height': 'fit-content','paddingTop': 'inherit'}}>
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
            />
          </Card>

          <Card body style={{ overflowX: 'auto','paddingBottom':'15px','height': 'fit-content','paddingTop': 'inherit'}}>
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
              reversed
            />
          </Card>
        </CardDeck>

        <Row>
          <Col lg="4" md="12" sm="12" xs="12">
            <AnnouncementCard
              color="gradient-secondary"
              header="Announcement"
              avatarSize={60}
              name="Jamy"
              date="1 hour ago"
              text="Lorem ipsum dolor sit amet,consectetuer edipiscing elit,sed diam nonummy euismod tinciduntut laoreet doloremagna"
              buttonProps={{
                children: 'show',
              }}
              style={{ height: 500 }}
            />
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Support Tickets</span>
                  <Button>
                    <small>View All</small>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {supportTicketsData.map(supportTicket => (
                  <SupportTicket key={supportTicket.id} {...supportTicket} />
                ))}
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <TodosCard todos={todosData} />
          </Col>
        </Row>*/}
      </Page>
    );
  }
}
export default DashboardPage;
