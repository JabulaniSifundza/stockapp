import axios from 'axios';


const TOKEN = "cck26jqad3i2ngrq2nv0cck26jqad3i2ngrq2nvg";
export default axios.create({
	baseURL: "https://finnhub.io/api/v1",
	params:{
		token: TOKEN,
	}
})