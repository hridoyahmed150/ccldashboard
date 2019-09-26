import React from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';
import {Card,CardBody,Col,Row,} from 'reactstrap';
import { getColor } from 'utils/colors';
import Page from 'components/Page';

class Attendance extends React.Component{
  state = {
   selectedOption: {value: "details", label: "Quarterly"},
  };

  handleChange = selectedOption => {
        this.setState({ ...this.state,
                        selectedOption
                      });
      };
componentWillMount(){
    axios.get(`/api/budgetachievement/${this.state.selectedOption.value}`)
     .then(res => {
       let newState={
          ...this.state,
          budgetachievement:res.data[0]
        }
      this.setState(newState);
    })
  }
  componentDidUpdate(prevState,nextState){
    if (this.state.selectedOption.value !== nextState.selectedOption.value) {
       let apivalue=this.state.selectedOption.value;
       axios.get(`/api/budgetachievement/${apivalue}`)
             .then(res=>{
               let newState={
                 ...this.state,
                 budgetachievement:res.data[0]
               }
               this.setState(newState);
             })
      }
    
  }
  render(){
    const salesBudget=[];
    const salesAchievement=[];
    const budgetTime=[];
    const options = [
      { value: 'monthly', label: 'Monthly' },
      { value: 'quaterly', label: 'Quarterly' },
      { value: 'yearly', label: 'Yearly' },
    ];

    if (this.state.budgetachievement) {
      this.state.budgetachievement.map((item)=>{
        salesBudget.push(item.budget);
        salesAchievement.push(item.achievement);
        let labels=item.labels.slice(0,10)
        budgetTime.push(labels);
      })
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

    return(
        <Page
        className="Attendance"
        title="Production and Delivery"
        breadcrumbs={[{ name: 'Attendance', active: true }]}
        >
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Select
                      options={options}
                      onChange={this.handleChange}
                    />
            </Col>
            <Col xl={12} lg={12} md={12}>
              <Card>
                <CardBody>
                  Sales - Budget Vs Achievement
                </CardBody> 
                <CardBody>
                  <Line data={budgetAchievementData()} />  
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Page>
      )
  }
}
export default Attendance;
