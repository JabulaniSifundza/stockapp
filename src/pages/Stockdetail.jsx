import React from 'react';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Finnhub from '../apis/Finnhub';
import StockChart from '../components/StockChart';
import StockData from '../components/StockData';

const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index])
    }
  })
}

const Stockdetail = () => {
  const [chartData, setChartData] = useState()
  const { symbol } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const date = new Date()
      const currentTime = Math.floor(date.getTime() / 1000)
      let oneDay;
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 0) {
        oneDay = currentTime - 3 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      }
      const oneWeek = currentTime - 7 * 24 * 60 * 60
      const oneYear = currentTime - 365 * 24 * 60 * 60

      try {
        const responses = await Promise.all([Finnhub.get("/stock/candle", {
          params: {
            symbol,
            from: oneDay,
            to: currentTime,
            resolution: 30
          }
        }), Finnhub.get("/stock/candle", {
          params: {
            symbol,
            from: oneWeek,
            to: currentTime,
            resolution: 60
          }
        }), Finnhub.get("/stock/candle", {
          params: {
            symbol,
            from: oneYear,
            to: currentTime,
            resolution: "W"
          }
        })])
        console.log(responses)

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data)
        })
      } catch (err) {
        console.log(err)
      }




    }
    fetchData()
  }, [symbol])


  return <div>
    {chartData && (
      <div>
        <StockChart chartData={chartData} symbol={symbol} />
        <StockData symbol={symbol} />
      </div>
    )}
  </div>
}

// const chartData = {
//   day: "data for one day",
//   week: "data for a week"
//   year: "data for year"
// }

// const data = [{x: 4, y: 2}, {x: 4, y: 2}]

export default Stockdetail;