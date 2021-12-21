import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Intro from './pages/Intro';
import Art from './pages/Art/List';
import Main from './pages/Main/Home';

const Root=()=>{
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Header />}>
					<Route index element={<Main />}></Route>
					<Route path="/intro" element={<Intro />}></Route>
					<Route path="/art" element={<Art />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Root;