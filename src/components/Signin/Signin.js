import React from 'react';

class Signin extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			signInUser:'',
			signInPassword:''
		}
	};

	setEmail = (event) =>{
		this.setState({signInUser:event.target.value});
	}

	setPassword = (event)=>{
		this.setState({signInPassword:event.target.value});
	}

	signInProcess = () => {
		const {signInUser, signInPassword} = this.state;
		const errMsg = document.querySelector('.errorMsg');
		const allInputs = document.querySelectorAll('input');
		if(!signInUser || !signInPassword){			
			errMsg.textContent="Fill all Fields";
			return;
		}
		fetch('/signin',
		{
			method:'post',
			headers:{
						'Content-Type':'application/json',
						'Accept': 'application/json'
					},
			body: JSON.stringify({
				email: signInUser,
				password: signInPassword
			})
		})
		.then(response=>{
			console.log(response);
			return response.json()
		})
		.then(data=>{
			if("error" in data){
				errMsg.textContent="Incorrect Credentials. Please try again."; 
				allInputs.forEach((input)=>{
					input.value='';
				})
				return;
			}else{
				this.props.loadUser(data);
				this.props.onRouteChange('home');
			}
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
							<legend className="f4 fw6 ph0 mh0">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor ="email-address">Email</label>
								<input 
								onChange = {this.setEmail}
								className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
								type="email" 
								name="email-address"  
								id="email-address"/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor ="password">Password</label>
								<input
								onChange = {this.setPassword} 
								className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
								type="password" 
								name="password"  
								id="password"/>
							</div>
						</fieldset>
						<div className="">
							<input
							onClick = { this.signInProcess }
							className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
							type="submit"
							value="Sign in" />
						</div>
						<div className="lh-copy mt3">
							<p onClick = { () => onRouteChange('register') } className="f6 link dim black db pointer">Sign up</p>
						</div>
					</div>
				</main>
			</article>
			);
		}
	}

export default Signin;
