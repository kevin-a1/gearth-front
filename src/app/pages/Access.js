import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';

export const Access = (props) => {
	const history = useHistory();

	return (
		<div className="exception-body access">
			<div className="exception-topbar">
				<button id="logolink" onClick={() => history.push('/')} className="layout-topbar-logo p-link">
					<img src="gearth-logo.png" style={{ width: 'auto', height: '40px' }} alt="freya-layout" />
				</button>
			</div>
			<div className="exception-wrapper">
				<div className="exception-content">
					<img src="assets/layout/images/pages/asset-access.svg" alt="freya-layout" />
					<span>Access Denied</span>
					<Button className="p-button-rounded"  label="LOGIN" type="button" ></Button>
				</div>
				<div className="exception-footer">
					<h4 style={{ color: '#FF810E' }}>GEArth</h4>
					<h6>Copyright Ⓒ GEArth Informatics</h6>
				</div>
			</div>
		</div >
	)
}