import React from 'react';
import myLogo from '../images/LogoRed.png';

const Header = () =>{
	return (
		<header>
			<img src={myLogo} alt="JB Logo" className="headerImage"/>
			<div className="headerText">
				<h3>Stock Watchlist App</h3>
			</div>
		</header>
	)
}


export default Header;