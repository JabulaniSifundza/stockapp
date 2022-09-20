import logo from './logo.svg';
import './App.css';
import{ BrowserRouter, Routes, Route} from 'react-router-dom';
import Stockoverview from './pages/Stockoverview';
import Stockdetail from './pages/Stockdetail';
import {WatchListContextProvider} from './context/WatchListContext';

function App() {
  return (
	<main className="container">
	<WatchListContextProvider>
		<BrowserRouter>
			<Routes>
			<Route path="/" element={<Stockoverview />}/>
			<Route path="/detail/:symbol" element={<Stockdetail />}/>
			</Routes>
		</BrowserRouter>
		</WatchListContextProvider>
	</main>
   
  );
}

export default App;
