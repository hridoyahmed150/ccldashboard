const validator=require('validator');
const isEmpty=require('./is-empty');

const validateLoginInput=(data)=>{
	let errors={};

	data.name = !isEmpty(data.name) ? data.name: '';
	data.password = !isEmpty(data.password) ? data.password: '';

	if (validator.isEmpty(data.name)) {
		errors.name='name is required';
	}

	if (validator.isEmpty(data.password)) {
		errors.password='password is required';
	}

	return {
		errors,
		isValid:isEmpty(errors)
	}
}

module.exports=validateLoginInput;