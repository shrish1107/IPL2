function start()
{
    document.querySelector(".select-button").addEventListener("click", fetchAndRenderEconomyRatesForYear);
}

function fetchAndRenderEconomyRatesForYear()
{
  var t = document.querySelector(".choose").value;
  console.log("Value of t",t);
  (t = parseInt(t)) < 2008 || 2019 < t ? document.querySelector(".input-container > .error").classList.value = "error" : (document.querySelector(".input-container > .error").classList = "error invisible",
  console.log(t),
  fetch("./data.json").then(function(e) {
      return e.json()
  }).then(function(e) {
      document.querySelector("#dynamic-economical-bowler-data").innerHTML = "",
      visualizeDynamic(e.dynamicEconomicalBowlersData[t],t)
  }))
}

function visualizeDynamic(data,t)
{
  Highcharts.chart("dynamic-economical-bowler-data", {

    title: {
        text: 'TOP TEN ECONOMICAL BOWLERS IN '+t
    },
   xAxis: {
      categories: Object.keys(data),
      crosshair: true
    }
  , yAxis: {
    min: 0,
    title: {
      text: "Economy Rate"
    }
  }
  ,
  
    series: [
      {
        name: "Economy Rate",
        data: Object.values(data)
      }
    ]
  
  
  });
}
///////////////////////////////////////
function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(data => 
      {
    
        totalMatchesYearwiseArray = data.matchesPlayedPerYear;
        matchesWonPerTeamPerYearArray = data.matchesWonByEachTeam;
        visualizeMatchesPlayedPerYear(totalMatchesYearwiseArray);
      visualizeData1(matchesWonPerTeamPerYearArray);
        visualizeData2(data.extraRunsPerTeam);
        visualizeData3(data.topTenEconomicalBowlerData);
        visualizeStoryData(data.storyData);
      });
    
}
/////////
start();
fetchAndVisualizeData();
function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}
  function visualizeData1(data) {
    let teamobj = {};
    let count = 0;
    for (let eachyear in data) {
      count++;
      for (let eachteam in data[eachyear]) {
        if (eachteam in teamobj) {
          teamobj[eachteam].push(data[eachyear][eachteam]);
          console.log(data[eachyear][eachteam]);
        } else {
          teamobj[eachteam] = [];
          for (let i = 1; i < count; i++) {
            teamobj[eachteam].push(0);
          }
          teamobj[eachteam].push(data[eachyear][eachteam]);
        }
      }
    }
  console.log("teamobj=",teamobj);
    let arr = [];
    for (let each in teamobj) {
      let x = {};
      x["name"] = each;
      x["data"] = teamobj[each];
      arr.push(x);
    }
    console.log("arr=",arr);

Highcharts.chart("matchesWonByEachTeam", {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Matches Won By Each Team'
  },
  subtitle: {
      text: 'Source: WorldClimate.com'
  },
  xAxis: {
      categories: Object.keys(data),
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: "Matches Won"
      }
  },
  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} matches</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  series: arr
});

}
function visualizeData2(data)
{
  var chart = Highcharts.chart("extraRunsPerTeam", {

    title: {
        text: "Extra runs conceded by Teams in 2016"
    },
  
    subtitle: {
        text: "Source: Csv data released by IPL"
    },
  
    xAxis: {
      categories: Object.keys(data),
      crosshair: true
    }
  , yAxis: {
    min: 0,
    title: {
      text: "Runs"
    }
  }
  ,
  
    series: [
      {
        name: "Extra runs conceded",
        data: Object.values(data)
      }
    ]
  
  
  });
  
  
  
}
function visualizeData3(data)
{console.log("Eco data",data);
Highcharts.chart("topTenEconomicalBowler", {
  chart: {
      type: 'column'
  },
  title: {
      text: 'TOP TEN ECONOMICAL BOWLERS IN 2015'
  },
  subtitle: {
      text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
  },
  xAxis: {
      categories:Object.keys(data),
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Economy Rate'
      }
  },
  legend: {
      enabled: false
  },
  
  series:[{
    data: Object.values(data),
    name: 'Economy Rate',
    showInLegend: true,
    dataLabels: {
        enabled: true,
        rotation: 360,
        color: '#FFFFFF',
        align: 'right',
       // format: '{point.y:.1f}', // one decimal
        y: 10}
}]
  
});
}
function visualizeStoryData(data)
{
  
  const seriesData = [];
    for (let player in data) {
      seriesData.push([player, data[player]]);
    }
    console.log(seriesData);
  Highcharts.chart('story', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y} times</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
      name: 'Matches Played',
      colorByPoint: true,
      data: seriesData
  }]
});
              
}

