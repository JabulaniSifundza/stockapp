import React from 'react';
import {useState, useEffect} from 'react';
import Finnhub from '../apis/Finnhub';

const Stocklist = () =>{

	const [stock, setStock] = useState()
	const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

	useEffect(()=>{
		let isMounted = true;
		const fetchData = async () =>{
			try{

				const responses = await Promise.all(watchList.map((stock)=>{
					return Finnhub.get("/quote",{
						params:{
							symbol: stock
						}
					})
				}));
				
				

			const data = responses.map((response)=>{
				return {
						data: response.data,
						symbol: response.config.params.symbol
					}
					
				})

				console.log(data);
				if(isMounted){
					setStock(data)
				}
			}
			catch (err){
				
			}
		}
		fetchData();

		return () => (isMounted = false)
	}, [])

	return <div>
	
	Stock List
	
	</div>
}

export default Stocklist;