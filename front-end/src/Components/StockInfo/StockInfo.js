import { DatePicker, DatePickerInput } from "carbon-components-react"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import getStocks from "../../Services/getStocks"
import { Loading } from "carbon-components-react";
import "./StockInfo.scss"
import postUserData from "../../Services/saveUserData"



import React, { Component } from 'react';
import CanvasJSReact from '../CandlesChart/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const StockInfo = () => {

   const [searchParams, setSearchParams] = useSearchParams();
   const [stocks, setStocks] = useState();
   const [startDate, setStartDate] = useState(new Date().setDate(new Date().getDate() - 30))
   const [endDate, setEndDate] = useState(new Date());

   //return options parameters to draw chart
   const getChartOpts = (data, compInfo) => {

      let dataPoints = [];

      //reformat data so that chart understands
      for (let i = 0; i < data.o.length; i++) {
         let entry = {
            x: new Date(data.t[i] * 1000),
            y: [data.o[i], data.h[i], data.l[i], data.c[i]]
         }
         dataPoints.push(entry);
      }

      //set option params
      const options = {
         theme: "light2", // "light1", "light2", "dark1", "dark2"

         animationEnabled: true,
         exportEnabled: false,
         title: {
            text: localStorage.getItem("compName") + " Stock Price"
         },
         axisX: {
            valueFormatString: "YYYY MM DD"
         },
         axisY: {
            prefix: "$",
            title: "Price (in USD)"
         },
         data: [{
            type: "candlestick",
            risingColor: "#00ff00",
            fallingColor: "#ed0404",
            showInLegend: true,
            name: localStorage.getItem("compName"),
            yValueFormatString: "$###0.00",
            xValueFormatString: "YYYY MM DD",
            dataPoints: dataPoints
         }]
      }

      return options
   }

   //on date change reload
   useEffect(() => {

      getStocks(
         searchParams.get("symbol"),
         startDate.valueOf().toString().slice(0, -3),
         endDate.valueOf().toString().slice(0, -3))
         .then(response => {
            setStocks(response);
            postUserData({ action: "browsedStock", value: response })
         });

   }, [startDate, endDate])

   const validateSearchInput = str => {
      return /^[A-Za-z\s]*$/.test(str);
   }

   return (

      <div className="datepicker-wrapper trimSpace">
         <DatePicker className="datepicker-style "
            datePickerType="range"
            dateFormat="Y-m-d"
            size="md"
            maxDate={new Date().toISOString()}
            value={[startDate, endDate]}
            onChange={(args) => {
               setStartDate(args[0])
               setEndDate(args[1])
            }}
         >
            <DatePickerInput
               id="date-picker-input-id-start"
               labelText="Start date"
               size="sm"
            />
            <DatePickerInput
               id="date-picker-input-id-finish"
               labelText="End date"
               size="sm"
            />
         </DatePicker>

         {stocks
            ? (stocks.s == "ok"
               ? (localStorage.getItem("compName") != ""
                  ? <div className="chart-spacing">
                     <CanvasJSChart options={getChartOpts(stocks)} />
                  </div>
                  : <div>Not found </div>)
               : <div>Not found </div>)
            : (validateSearchInput(searchParams.get("symbol"))
               ? <Loading className="kek" />
               : <div>Invalid input </div>
            )
         }

      </div>

   );
}

export default StockInfo;