async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');


    const request = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX,TRP:TSX&interval=1min&apikey=4887278d90ca4575b8e7b64fae5a77f4');
    const response = await request.json();
    console.log(response);
    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];

 
// /var Chart = require('chart.js');
// var myChart = new Chart(ctx, {...});
   
   var myChart=await new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: stocks[0].values.map(value => value.datetime),
        datasets: stocks.map( stock => ({
            label: stock.meta.symbol,
            data: stock.values.map(value => parseFloat(value.high)),
            backgroundColor:  getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
        }))
    }
});
function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}



console.log(stocks[0].values)   


const myChart2 =await  new Chart(highestPriceChartCanvas.getContext('2d'), {
    type: 'bar',
    data: {
     
            labels: stocks[0].values.map(value => value.datetime),
        datasets: stocks.map( stock => ({
            label: stock.meta.symbol,
            data: stock.values.map(value => parseFloat(value.high)),
            backgroundColor:  getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
            borderWidth: 1
        })),
           
        
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
console.log(stocks[1].meta.symbol)
}

main()