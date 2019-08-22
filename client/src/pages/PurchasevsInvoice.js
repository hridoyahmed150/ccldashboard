import React from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import {Badge,Button,Card,CardBody,CardDeck,CardGroup,CardHeader,CardTitle,Col,ListGroup,ListGroupItem,Row,} from 'reactstrap';
import { getColor } from 'utils/colors';
import Page from 'components/Page';

class PurchasevsInvoice extends React.Component{
   state={};
  componentWillMount(){
    axios.get(`/api/purchaseinvoice/details`)
     .then(res => {
       let newState={
          ...this.state,
          purchaseinvoice:res.data[0]
        }
        // console.log(res.data[0]);
      this.setState(newState);
    })
  }
  render(){
    const purchaseData=[];
    const invoiceData=[];

    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    

    if (this.state.purchaseinvoice) {
      this.state.purchaseinvoice.map((item)=>{
        purchaseData.push(item.invgrandtotal);
        invoiceData.push(item.pograndtotal)
      })
    }

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

    return(
        <Page
        className="PurchasevsInvoice"
        title="Production and Delivery"
        breadcrumbs={[{ name: 'PurchasevsInvoice', active: true }]}
        >
          <Row>
            <Col lg="12" md="12" sm="12" xs="12">
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
          </Row>
        </Page>
      )
  }
}
export default PurchasevsInvoice;
