async function main(){
   const response = await fetch('https://api.twelvedata.com/time_series?symbol=AAPL,GME,DIS,BTNX&interval=1min&apikey=3277e72390bf42ac8156df421f8ee63d');
    const result = await response.json();

    const {AAPL, GME, DIS, BNTX} = mockData;
    // let AAPL = result.AAPL
    // let GME = result.GME
    // let DIS = result.DIS
    // let BTNX = result.BTNX
// Bonus Note: 
// Another way to write the above lines would to refactor it as:
   // const {AAPL, GME, DIS, BTNX} = result 
// This is an example of "destructuring" an object
// "Destructuring" creates new variables from an object or an array
    
    const stocks = [AAPL, GME, DIS, BNTX];
 
    const timeChartCanvas = document.getElementById('#time-chart');
    const highestPriceChartCanvas = document.getElementById('#highest-price-chart');
    const averagePriceChartCanvas = document.getElementById('#average-price-chart');

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
    // line chart
    stocks.forEach(stock => stock.values.reverse());
    new Chart(timeChartCanvas.getContext('2d'), {
    type: "line",
    data: {
        labels: stocks[0].values.reverse().map((value) => value.datetime),
        datasets: stocks.map((stock) => ({
        label: stock.meta.symbol,
        data: stock.values.reverse().map((value) => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
            }))
        },
        options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
        }      
    });

}
main();