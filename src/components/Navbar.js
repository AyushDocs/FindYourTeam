/** @format */
import React from 'react';
import search from '../assets/header/search.png';
import themeSwitch from '../assets/header/theme-switch.png';
import './Navbar.css';
const Navbar = () => {
	return (
		<div className='header'>
			<div className='hamburger'>
				<div className='line'></div>
				<div className='line'></div>
				<div className='line'></div>
		</div>
			<div className='search-container'>
				<div className='search-icon'>
					<img src={search} alt='' />
				</div>
				<input type='text' placeholder='Enter what you want' className='search-input' />
			</div>
			<div className='theme-swith-container'>
				<img src={themeSwitch} alt='' />
			</div>
			<div className='auth-container'>
				<div className='auth-btn login'>Login</div>
				<div className='auth-btn signup'>Signup</div>
			</div>
		</div>
	);
};

export default Navbar;
