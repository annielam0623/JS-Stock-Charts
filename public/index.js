// async function main(){
//    const response = await fetch("https://api.twelvedata.com/time_series?symbol=AAPL,GME,DIS,BNTX&apikey=3277e72390bf42ac8156df421f8ee63d");
//     const result = await response.json();
//  
// ( "code": 400,
// "message": "Invalid **interval** provided: . Supported intervals: 1min, 5min, 15min, 30min, 45min, 1h, 2h, 4h, 8h, 1day, 1week, 1month",
// "status": "error",
// "meta": {
//     "symbol": "AAPL,GME,DIS,BNTX",
//     "interval": "",
//     "exchange": ""
// })
// Due to the 404 erro,  use mockData intead of async fetch.

    function main(){

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // let AAPL = result.AAPL
    // let GME = result.GME
    // let DIS = result.DIS
    // let BNTX = result.BNTX

    const {AAPL, GME, DIS, BNTX} = mockData; 

    const stocks = [AAPL, GME, DIS, BNTX];

    stocks.forEach( stock => stock.values.reverse())

    //set stock symbo into different color
    function getColor(stock){
        if(stock === "AAPL"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "GME"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

  

    // Time chart
  
    new Chart(timeChartCanvas.getContext("2d"), {
    type: "line",
    data: {
        labels: stocks[0].values.map(value => value.datetime),
        datasets: stocks.map(stock => ({
        label: stock.meta.symbol,
        data: stock.values.map(value => parseFloat(value.close)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
            })),
        },
        options: {
            scales: {
              y: {
                beginAtZero: true
              },
            },
        },   
    });

    // Highest Stock Chart
    function findHighest(values) {
        let highest = 0;
        values.forEach(value => {
            if (parseFloat(value.high) > highest) {
                highest = value.high
            }
        })
        return highest
    }

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    findHighest(stock.values)
                ))
            }]
        }
    });



    // Average Chart

    function calculateAverage(values) {
        let total = 0;
        values.forEach(value => {
            total += parseFloat(value.high)
        })
        return total / values.length
    }

    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Average',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    calculateAverage(stock.values)
                ))
            }]
        }
    });
}

main()