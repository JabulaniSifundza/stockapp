import React from 'react';
import {useState, useEffect} from 'react';
import Finnhub from '../apis/Finnhub';
import {useContext} from 'react';
import {WatchListContext} from '../context/WatchListContext';

const Autocomplete = () =>{
	const [search, setSearch] = useState("")
	const [results, setResults] = useState([])

	const {addStock} = useContext(WatchListContext)

	const renderDropdown = () =>{
		const dropDownClass = search ? "show" : null;
		return (
			<ul style={{height:"500px",
			overflowY:"scroll",
			overflowX:"hidden",
			cursor: "pointer"
		}} 
		className={`dropdown-menu ${dropDownClass}`}>
				{results.map((result)=>{
					return (
						<li onClick={()=> {
							addStock(result.symbol)
							setSearch("")
						}} key={result.symbol} className="dropdown-item" sty>{result.description}({result.symbol})</li>
					)
				})}
			</ul>
		)
	}

	useEffect(()=>{
		let isMounted = true;
		const fetchData = async ()=>{
			try{
				const response = await Finnhub.get("/search", {
					params:{
						q: search
					}
				})
				
				if(isMounted){
					setResults(response.data.result)
					
				}
			}
			catch(err){


			}
		}
		if(search.length > 2){
			fetchData();
		}
		else{
			setResults([])
		}
		return () => (isMounted = false)
	}, [search])
	return <div className="w-50 p-5 rounded mx-auto">
		<div className="form-floating dropdown">
			<input style={{backgroundColor:"rgba(145, 258, 171, 0.04)"}} id="search" type="text" className="form-control" placeholder="Search" autoComplete="off" value={search} onChange={(e)=> setSearch(e.target.value)}></input>
			<label htmlFor="search">Search</label>
			{renderDropdown()}
		</div>
	</div>
}

export default Autocomplete;