import { AnnouncementCard, TodosCard } from 'components/Card';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import axios from 'axios';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import {avatarsData,chartjs,productsData,supportTicketsData,todosData,userProgressTableData,} from 'demos/dashboardPage';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
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

  }
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }
  render() {

    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');
    let value=this.state.ad_client_id;
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const DAYS=Array.from({length: 30}, (v, k) => k+1);
    const saleData=[];
    const collectionData=[];
    const deleveryQty=[];
    const productionQty=[];
    const purchaseData=[];
    const invoiceData=[];
    const totalEmpData=[];
    const attendenceData=[];
    let lastMonthSales='';
    if (this.state.salesOrder) {
      this.state.salesOrder.map((item)=>{
        saleData.push(item.sales);
        collectionData.push(item.collection);
        lastMonthSales=item.sales;
      })
    }

    if (this.state.production) {
      this.state.production.map((item)=>{
          deleveryQty.push(Math.floor(item.deliveryqty));
          productionQty.push(Math.floor(item.productionqty));
      })
    }

    if (this.state.purchaseinvoice) {
      this.state.purchaseinvoice.map((item)=>{
        purchaseData.push(item.invgrandtotal);
        invoiceData.push(item.pograndtotal)
      })
    }
    if (this.state.employeeAttendance) {
      this.state.employeeAttendance.map((item)=>{
        totalEmpData.push(item.totalemp);
        attendenceData.push(item.totalattend)
      })
    }


    const productDeleveryData={
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Delevery for this month',
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
        title: {
          display: false,
          text: 'Chart.js Bar Chart - Stacked',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        responsive: true,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              display: false,
            },
          ],
          yAxes: [
            {
              stacked: true,
              display: false,
            },
          ],
        },
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
        labels: MONTHS,
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
                Total Sales And Collection{' '}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
                <Bar data={genLineData} />
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
                <Bar data={purchaseinvoiceLineData} />
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Attendance (Total Employees : {totalEmpData[0]})</CardHeader>
              <CardBody>
                <Bar data={Attendance({ type: 'line', fill: false })} />
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Production vs Delivery</CardHeader>
              <CardBody>
                <Bar data={productDeleveryData.data} options={productDeleveryData.options}  onElementsClick={(dataset)=>productDeleveryData.getDatasetAtEvent(dataset)}/>
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
