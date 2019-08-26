import React from 'react';
import axios from 'axios';
import { Bar} from 'react-chartjs-2';
import {Card,CardBody,CardHeader,Col,Row,} from 'reactstrap';
import { getColor } from 'utils/colors';
import Page from 'components/Page';

class Attendance extends React.Component{
   state={};
  componentWillMount(){
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
  render(){
    const totalEmpData=[];
    const attendenceData=[];
    const DAYS=Array.from({length: 30}, (v, k) => k+1);


    if (this.state.employeeAttendance) {
      this.state.employeeAttendance.map((item)=>{
        totalEmpData.push(item.totalemp);
        attendenceData.push(item.totalattend)
      })
    }

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

    return(
        <Page
        className="Attendance"
        title="Production and Delivery"
        breadcrumbs={[{ name: 'Attendance', active: true }]}
        >
          <Row>
            <Col xl={12} lg={12} md={12}>
              <Card>
                <CardHeader>Attendance (Total Employees : {totalEmpData[0]})</CardHeader>
                <CardBody>
                  <Bar data={Attendance({ type: 'line', fill: false })} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Page>
      )
  }
}
export default Attendance;
