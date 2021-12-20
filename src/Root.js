import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Intro from './pages/Intro';
import Art from './pages/Art';

const Root=()=>{
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Header />}>
					<Route index element={<Home />}></Route>
					<Route path="/intro" element={<Intro />}></Route>
					<Route path="/art" element={<Art />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Root;