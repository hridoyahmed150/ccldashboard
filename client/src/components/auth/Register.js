import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";

import classname from "classname";
import {connect} from "react-redux";
import { registerUser } from "../../actions/authAction";


class Register extends Component {
	state={
		name:'',
		email:'',
		password:'',
		password2:'',
		errors:{}
	}

	inputChange=(e)=>{
		this.setState({[e.target.name]:e.target.value})
	}

	componetnWillReceiveProps(nextProps){
		if (nextProps.errors) {
			this.setState({errors:nextProps.errors})
		}
	}
	
	componentDidMount(){
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	submitForm=(e)=>{
		e.preventDefault();
		let newUser={
			name:this.state.name,
			email:this.state.email,
			password:this.state.password,
			password2:this.state.password2
		}
		this.props.registerUser(newUser,this.props.history)
	}
	render() {
		let {errors} =this.props

		return (
			<div className="register">
			  <div className="container">
			    <div className="row">
			      <div className="col-md-8 m-auto">
			        <h1 className="display-4 text-center">Sign Up</h1>
			        <p className="lead text-center">Create your DevConnector account</p>
			        <form noValidate onSubmit={this.submitForm} >
			          <div className="form-group">
			            <input 
			            	type="text" 
			            	onChange={this.inputChange} 
			            	className={classname("form-control form-control-lg",{
			            		'is-invalid':errors.name
			            	})} 
			            	placeholder="Name" 
			            	name="name" 
			            />
			            {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
			          </div>
			          <div className="form-group">
			            <input 
			            	type="email" 
			            	onChange={this.inputChange} 
			            	className={classname("form-control form-control-lg",{
			            		'is-invalid':errors.email
			            	})}  
			            	placeholder="Email Address" 
			            	name="email" 
			            />
			            {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
			            <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
			          </div>
			          <div className="form-group">
			            <input 
			            	type="password" 
			            	onChange={this.inputChange} 
			            	className={classname("form-control form-control-lg",{
			            		'is-invalid':errors.password
			            	})}  
			            	placeholder="Password" 
			            	name="password" 
			            />
			            {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
			          </div>
			          <div className="form-group">
			            <input 
			            	type="password" 
			            	onChange={this.inputChange} 
			            	className={classname("form-control form-control-lg",{
			            		'is-invalid':errors.password2
			            	})}   
			            	placeholder="Confirm Password" 
			            	name="password2" 
			            />
			            {errors.password2 && (<div className='invalid-feedback'>{errors.password2}</div>)}
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

Register.propTypes={
	registerUser:PropTypes.func.isRequired,
	auth:PropTypes.object.isRequired,
	errros:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
	auth:state.auth,
	errors:state.errors
})

export default connect(mapStateToProps,{registerUser})(withRouter(Register));
