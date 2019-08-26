import React from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {Card,CardBody,CardHeader,Col,Row,} from 'reactstrap';
import { getColor } from 'utils/colors';
import Page from 'components/Page';

class ProductionDelivery extends React.Component{
   state={};
  componentWillMount(){
    

    axios.get(`/api/productiondelivery/details`)
     .then(res => {
       let newState={
          ...this.state,
          production:res.data[0]
        }
        // console.log(res.data[0]);
      this.setState(newState);
    })
  }
  render(){
    const deleveryQty=[];
    const productionQty=[];



    if (this.state.production) {
      this.state.production.map((item)=>{
          deleveryQty.push(Math.floor(item.deliveryqty));
          productionQty.push(Math.floor(item.productionqty));
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
          display: true,
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              display: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
              display: true,
            },
          ],
        },
      },
    };

    return(
        <Page
        className="productiondelivery"
        title="Production and Delivery"
        breadcrumbs={[{ name: 'productiondelivery', active: true }]}
        >
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
            <Card>
              <CardHeader>Production vs Delivery</CardHeader>
              <CardBody>
                <Bar data={productDeleveryData.data} options={productDeleveryData.options} height={100}/>
              </CardBody>
            </Card>
          </Col>
          </Row>
        </Page>
      )
  }
}
export default ProductionDelivery;
