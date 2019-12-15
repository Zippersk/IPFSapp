$(document).ready(function() {
  // @ts-ignore
  var chart =  Highcharts.chart('container', {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'Bandwidth over time'
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
        },
        title: {
            text: 'Date'
        }
    },
    yAxis: {
        title: {
            text: 'bandwidth (b/s)'
        },
        min: 0
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} b/s'
    },

    plotOptions: {
        series: {
            marker: {
                enabled: true
            }
        }
    },

    colors: ['#6CF', '#39F', '#06C', '#036', '#000'],


    series: [{
        name: "Outgoing",
        data: [
          
        ]
    }, {
        name: "Incoming",
        data: [
         
        ]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                plotOptions: {
                    series: {
                        marker: {
                            radius: 2.5
                        }
                    }
                }
            }
        }]
    }
  });

  setInterval(() => {

    $.ajax({
      url: '/api/stats',
      success: function(data) {
          $('#repoNumObjects').text(data.repo.numObjects);
          $('#repoSize').text(data.repo.repoSize);
          $('#peers').text(data.peers.map(p => p.peer.id + "\n"));
          chart.series[0].addPoint([ new Date().getTime(), parseFloat(data.bandwidth.rateOut)])
          chart.series[1].addPoint([ new Date().getTime(), parseFloat(data.bandwidth.rateIn)])
          $('#rateIn').text(data.bandwidth.rateIn);
          $('#rateOut').text(data.bandwidth.rateOut);
          $('#totalIn').text(data.bandwidth.totalIn);
          $('#totalOut').text(data.bandwidth.totalOut);
      }
  });



  }
    
    , 2000)


 

});