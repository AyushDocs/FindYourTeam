/** @format */

import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
	const handleClick = () => console.log('clicked btn');
	return (
		<>
			<Navbar />
			<div className='find-search-container'>
				<button onClick={handleClick} className='find-one'>
					Find Your Partner
				</button>
				<button onClick={handleClick} className='find-team'>
					Find your Team
				</button>
			</div>
			<div className='cards-container'>
				<div className='card'>vg</div>
				<div className='card'>vg</div>
				<div className='card'>vg</div>
			</div>
		</>
	);
};

export default Home;
