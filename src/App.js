import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Intro from './pages/Intro';
import Art from './pages/Art/List';
import Main from './pages/Main/Home';
import Footer from './components/Footer';
import QuickMenu from './components/QuickMenu';

const App=()=>{
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route index element={<Main />}></Route>
				<Route path="/intro" element={<Intro />}></Route>
				<Route path="/art" element={<Art />}></Route>
			</Routes>
			<Footer />
			<QuickMenu />
		</BrowserRouter>
	)
}

export default App;