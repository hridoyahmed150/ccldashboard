import React from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import {Badge,Button,Card,CardBody,CardDeck,CardGroup,CardHeader,CardTitle,Col,ListGroup,ListGroupItem,Row,} from 'reactstrap';
import { getColor } from 'utils/colors';
import Page from 'components/Page';

class SalesvsCollection extends React.Component{
   
   state={};

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
  }
  render(){
    const saleData=[];
    const collectionData=[];
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    

    let lastMonthSales='';
    if (this.state.salesOrder) {
      this.state.salesOrder.map((item)=>{
        saleData.push(item.sales);
        collectionData.push(item.collection);
        lastMonthSales=item.sales;
      })
    }

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

    return(
      <Page
      className="SalesvsCollection"
      title="Sales vs Collection"
      breadcrumbs={[{ name: 'SalesvsCollection', active: true }]}
      >
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
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
        </Row>
      </Page>
    )
  }
}
export default SalesvsCollection;
