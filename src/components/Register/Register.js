import React from 'react';


class Register extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			signUpName:'',
			signUpPassword:'',
			signUpEmail:''
		}
	};

	setEmail = (event) =>{
		this.setState({signUpEmail:event.target.value});
	}

	setPassword = (event)=>{
		this.setState({signUpPassword:event.target.value});
	}

	setName = (event)=>{
		this.setState({signUpName:event.target.value});
	}

	signUpProcess = () => {
		const {signUpEmail, signUpPassword, signUpName} = this.state;
		const errMsg = document.querySelector('.errorMsg');
		const successMsg = document.querySelector('.successMsg');
		const allInputs = document.querySelectorAll('input');

		if((!signUpEmail) || (!signUpPassword) || (!signUpName)){			
			errMsg.textContent="Fill all Fields";
			return;
		}
		fetch('/register',{
			method:'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				email: signUpEmail,
				password: signUpPassword,
				name: signUpName
			})
		})
		.then(response => response.json())
		.then(data => {
			if("error" in data){
				errMsg.textContent=data.error;
				successMsg.textContent=null;
			}
			else{
				successMsg.textContent = "User Registered!";
				errMsg.textContent=null;
				// this.props.onRouteChange('signin');
			}
			allInputs.forEach((input)=>{
					input.value='';
				})
		});	
	}

	render() {
		const {onRouteChange} = this.props;
		return (
			<article className ="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				  <p className="errorMsg"></p>
				  <p className="successMsg"></p>
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f4 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor ="name">Name</label>
				        <input 
				        onChange = {this.setName} 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="text" 
				        name="name"  
				        id="name" />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor ="email-address">Email</label>
				        <input 
				        onChange = {this.setEmail} 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor ="password">Password</label>
				        <input 
				        onChange = {this.setPassword} 
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
				        id="password" />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      	  onClick = { this.signUpProcess  }
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      type="submit" 
					      value="Register" />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={ () => onRouteChange('signin') }className="f6 link dim black db pointer">Login</p>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}
	


export default Register;
