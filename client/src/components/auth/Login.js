import React, { Component } from 'react';
import PropTypes from "prop-types";
import classname from "classnames";
import {connect } from "react-redux";
import {loginUser} from "../../actions/authAction";

class Login extends Component {
	state={
		name:"",
		password:'',
		errors:{}
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard')
		}
		if (nextProps.errors) {
			this.setState({errors:nextProps.errors})
		}
	}

	componentDidMount(){
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	onChange=(e)=>{
		this.setState({[e.target.name]:e.target.value})
	}
	onSubmit=(e)=>{
		e.preventDefault();
		let userData={
			name:this.state.name,  
			password:this.state.password
		}
		this.props.loginUser(userData)
	}
	render() {
		const {errors}=this.state;
		return (
			<div className="login">
			  <div className="container">
			    <div className="row">
			      <div className="col-md-8 m-auto">
			        <h1 className="display-4 text-center">Log In</h1>
			        <p className="lead text-center">Sign in to your DevConnector account</p>
			        <form onSubmit={this.onSubmit}>
			          <div className="form-group">
			            <input 
			            type="text" 
			            onChange={this.onChange} 
			            className={classname("form-control form-control-lg",{
			            	'is-invalid':errors.name
			            })}  
			            placeholder="name" 
			            name="name" />

			            {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
			          </div>
			          <div className="form-group">
			            <input 
			            type="password" 
			            onChange={this.onChange} 
			            className={classname("form-control form-control-lg",{
			            	'is-invalid':errors.password
			            })} 
			            placeholder="Password" 
			            name="password" />
			            {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
			          </div>
			          <input type="submit" className="btn btn-info btn-block mt-4" />
			        </form>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}
Login.propTypes={
	loginUser:PropTypes.func.isRequired,
	auth:PropTypes.object.isRequired,
	errors:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
	auth:state.auth,
	errors:state.errors
})
export default connect(mapStateToProps,{loginUser})(Login);