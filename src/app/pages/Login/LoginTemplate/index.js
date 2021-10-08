import React from 'react'
import GoogleButton from '../../../components/GoogleButton';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../../../assets/scss/login.scss';
import { useHistory } from 'react-router';


const LoginTemplate = ({user, setUser, iniciaSesion}) => {

	const { username, password } = user;
	const history = useHistory();

	const handleInputChange = ({ target }) => {
		setUser({
			...user,
			[ target.name ]: target.value,
		});
	}

	const handleLogin = (e) => {
		if (username.length >= 3 && password.length >= 3) {
			iniciaSesion({ username: username, password: password });
		}
	}

	return (
		<>
			<button className="logo p-link p-my-2">
				<img src="gearth-logo.png" style={{ width: '12rem', height: 'auto' }}  alt="gearth-logo" />
			</button>

			<GoogleButton iniciaSesion={iniciaSesion}/>

			<span className="p-my-2" style={{ color: '#ccc' }}>OR</span>

			<InputText
				style={{ background: '#545B67', color: '#eee', border: '1px solid yellow' }}
				value={ username }
				onChange={ handleInputChange }
				id="username"
				name="username"
				placeholder="Username"
				required />

			<InputText
				type="password"
				style={{ background: '#545B67', color: '#eee', border: '1px solid yellow' }}
				value={ password }
				onChange={ handleInputChange }
				id="password"
				name="password"
				placeholder="Password"
				required />

			<Button className="p-button-rounded" onClick={ handleLogin } label="LOGIN" type="button" ></Button>

			<button style={{ color: '#ccc' }} className="p-link forget-password" >Forgot password?</button>

			<p style={{ color: '#eee' }}>
				Don’t you have an account,
				<button value="singup" className="p-link p-ml-1" onClick={ () => { history.push('/register') } }>Sign up</button>
			</p>
		</>
	);
};

export default LoginTemplate;