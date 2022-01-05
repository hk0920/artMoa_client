import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Intro from './pages/Intro';
import Main from './pages/Main/Home';
import Footer from './components/Footer';
import QuickMenu from './components/QuickMenu';
import FaqList from './pages/Faq/List';
import ArtList from './pages/Art/List';
import ArtDetail from './pages/Art/Detail';
import NoticeList from './pages/Notice/List';
import NoticeDetail from './pages/Notice/Detail';
import LoginForm from './pages/Member/LoginForm';
import JoinForm from './pages/Member/JoinForm';

const App=()=>{
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route index exact path="/" element={<Main />}></Route>
				<Route path="/intro" element={<Intro />}></Route>
				<Route path="/art" element={<ArtList />}></Route>
				<Route path="/art/detail/:seq" element={<ArtDetail />}></Route>
				<Route path="/faq" element={<FaqList />}></Route>
				<Route path="/notice" element={<NoticeList />}></Route>
				<Route path="/notice/detail" element={<NoticeDetail />}></Route>
				<Route path="/login" element={<LoginForm />}></Route>
				<Route path="/join" element={<JoinForm />}></Route>
			</Routes>
			<Footer />
			<QuickMenu />
		</BrowserRouter>
	)
}

export default App;