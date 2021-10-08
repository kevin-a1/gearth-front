import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLogin } from '../../../redux/hooks/useUser';
import { Button } from 'primereact/button';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import FacebookLogin from 'react-facebook-login';
import LoginTemplate from './LoginTemplate';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/open-animation.css';

export const Login = (props) => {

	const history = useHistory();
	const { login, iniciaSesion } = useLogin();
	const [ user, setUser ] = useState({ username: 'Andr3s', password: 'andr3ssapatanga', });
	
	useEffect(() => {
		if (login) {
			history.push('/');
		}
	}, [login])

	return (
		<div className="p-grid" style={{ padding: '0px', margin: '0px' }}>

			<div className="p-col" style={{ padding: '0px', margin: '0px', minWidth: '300px' }}>
				{ slider() }
			</div>

			<div className="p-col" style={{ padding: '0px', margin: '0px', minWidth: '300px' }}>
				<div className="login-body" style={{ background: '#3E4754' }}>
					<div className="login-wrapper">
						<div className="login-panel card p-shadow-10 p-mx-5 p-mt-4" style={{ width: '90%', background: '#293241' }}>
							<LoginTemplate 
								user={ user } setUser={ setUser } 
								iniciaSesion={ iniciaSesion } />
						</div>
						<div className="login-footer p-pb-3">
							<h4 style={{ color: '#FF810E' }}>GEArth</h4>
							<h6 style={{ color: 'gray' }}>Copyright Ⓒ GEArth Informatics</h6>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const facebookBtn = (iniciaSesion) => {

	const responseFacebook = (response) => {

		console.log(response);

		if (response.accessToken) {
			iniciaSesion({ username: 'Andr3s', password: 'andr3ssapatanga', });
		}
	}

	return (
		<>
			<FacebookLogin
				appId="547555126684093"
				autoLoad={false}
				fields="name,email,picture"
				scope="public_profile,user_friends"
				callback={ responseFacebook }
				icon="fa-facebook"
				cssClass="p-button p-button-rounded facebook-button"
			/>
		</>
	);
}



//https://reactjsexample.com/react-component-that-renders-a-media-gallery-slider-carousel/
const slider = () => {

	const AutoplaySlider = withAutoplay(AwesomeSlider);

	return (
		<AutoplaySlider
			className="p-shadow-15"
			style={{ height: '100%', background: '#3E4754' }}
			bullets={false}
			play={true}
			cancelOnInteraction={false}
			interval={5000}
			animation="fallAnimation">

			<div data-src="https://1.bp.blogspot.com/-GQJ7uTsjGug/XJOlhgWzKOI/AAAAAAAAC8k/eCEVwTYpOtUsuYRzfoxt4mz_nkbehRjMACLcBGAs/s1600/Tecnologia%2B%25281%2529.jpg" style={{ background: '#3E4754' }}>
				<Button className="button-slider p-button-rounded p-component p-button-warning p-px-6 p-py-3">
					<b>START NOW</b>
				</Button>
			</div>
			<div data-src="https://i.ibb.co/J7V0FbC/GEArth-logo.png" style={{ background: '#3E4754' }}>
				<Button className="button-slider p-button-rounded p-component p-button-warning p-px-6 p-py-3">
					<b>MORE INFO</b>
				</Button>
			</div>
			<div data-src="https://www.cainco.org.bo/empresaydesarrollo/wp-content/uploads/2019/03/2.jpg">

			</div>
			<div data-src="https://image.freepik.com/vector-gratis/tecnologia-mundial_46706-570.jpg">

			</div>

			<div data-src="https://static.vecteezy.com/system/resources/previews/001/835/205/non_2x/future-and-technology-blue-hologram-background-with-world-map-vector.jpg">
			</div>

		</AutoplaySlider>
	)
};



export default Login;