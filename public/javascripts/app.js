'use strict';
var refusalCheck = angular.module('refusalCheck',['ui.router','ui.bootstrap','ui.grid']);

refusalCheck.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: 'homeController'
    })    
    .state('results', {
      url: "/results?q&query",
      templateUrl: "partials/results.html",
      controller: 'resultsController'
    })    
});

function homeController($scope,$state,$http,$timeout) {
    $scope.search = function () {
      console.log($scope.queryString) 
      $state.transitionTo('results', {'query':$scope.query,'q':$scope.queryString});          
    };

    $scope.getTypes = function(val) {      
      return $http.get('/refusalCheck/autoComplete', {
        params: {
          type: val
        }
      }).then(function(res){
       
        return res.data.results.map(function(item){          
            return item;
        }); 
      });    
    };   

    $scope.onSelect = function ($item, $model, $label) {                
                $scope.queryString = $item.type+'-'+$item.code;
    };    
}

function resultsController($scope,$state,$http,$timeout, $stateParams) {

  $scope.typeName = $stateParams.query;

    $http.get('/refusalCheck/', {
      params: {
        type: $stateParams.q
      }
    })
    .success(function(data) {search
        console.log(data);
      if(data.hasOwnProperty('err')){
        $scope.validationErrors = data.err;         
      } else {      
        $scope.count = data.meta.totalCount; 
        $scope.refusals = data.results;

        var refObj = [];
        var refArray = [];
        
        for(var i=0; i<data.analytics.countByReportedMonth.length; i++){
            var d = new Date(data.analytics.countByReportedMonth[i].reportedMonth);
            refObj[0] = Date.UTC(d.getFullYear(),d.getMonth(),d.getDate());
            refObj[1] = data.analytics.countByReportedMonth[i].numberOfRefusals;
            refArray[i] = refObj;
            refObj = [];
            if(i==0)
                $scope.range1 = data.analytics.countByReportedMonth[i].reportedMonth;
            if (i==data.analytics.countByReportedMonth.length-1)
                $scope.range2 = data.analytics.countByReportedMonth[i].reportedMonth;
        }             

        var chart1 = $('#container1').highcharts();
        chart1.series[0].setData(refArray);  

        var datObj = {};
        var datArray = [];

        if(data.analytics.topIndustries.length > 1){
            for(var i=0; i<data.analytics.topIndustries.length; i++){
                datObj.name = data.analytics.topIndustries[i].name;
                datObj.y = data.analytics.topIndustries[i].numberOfRefusals;
                datArray[i] = datObj;
                datObj = {};
            }
        } else if(data.analytics.topManufacturers.length > 1){
            for(var i=0; i<data.analytics.topManufacturers.length; i++){
                datObj.name = data.analytics.topManufacturers[i].name;
                datObj.y = data.analytics.topManufacturers[i].numberOfRefusals;
                datArray[i] = datObj;
                datObj = {};
            }
        } else if (data.analytics.topIndustries.length == 1 && data.analytics.topManufacturers.length == 1){
            if($scope.typeName == data.analytics.topManufacturers[0].name){
                datObj.name = data.analytics.topManufacturers[0].name;
                datObj.y = data.analytics.topManufacturers[0].numberOfRefusals;
                datArray[0] = datObj;
                datObj = {};
            } else{
                datObj.name = data.analytics.topIndustries[0].name;
                datObj.y = data.analytics.topIndustries[0].numberOfRefusals;
                datArray[0] = datObj;
                datObj = {};
            }
        }
        
        var chart2 = $('#container2').highcharts();
        chart2.series[0].setData(datArray);  
       
        var chart3 = $('#container3').highcharts();
        console.log(data.analytics.fdaSampleAnalysisPercentage == null);
        var fdaPercentage = (data.analytics.fdaSampleAnalysisPercentage == null? 0: data.analytics.fdaSampleAnalysisPercentage);
        chart3.series[0].setData([
                    ['Performed',   fdaPercentage],                    
                    ['Not Performed',   (100-fdaPercentage)]                    
        ]);  
      }            
    })
    .error(function(data) {       
        console.log('Error: ' + data);         
    });

    $scope.gridOptions = { data: 'refusals', showGridFooter:true,
       columnDefs: [{ field:"productCode", headerCellClass: 'blue', displayName: "Product"},
                   { field:"country", headerCellClass: 'blue', displayName: "Country"},
                   { field:"refusalDate", headerCellClass: 'blue', displayName: "Refusal Date"}]
    };

    $(function () {
        $('#container1').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: ' '
            },
           
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Refusals'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Refusals',
                data: []
            }]
        });
    });

    $(function () {
    $('#container2').highcharts({
        chart: {
            type: 'column'
        },
        title: {
                text: ' '
            },
        
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Refusals'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Refusals #: <b>{point.y}</b>'
        },
        series: [{
            name: 'Refusals',
            data: [                
            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#000000',
                align: 'right',
                format: '{point.y}', 
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
});    

    $(function () {
    $('#container3').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        exporting: { enabled: false },
        credits: {
            enabled: false
        },
        title: {
            text: '% of FDA Sample Analysis'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name} {point.percentage:.1f}%'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Testing Done',
            data: [
                ['Performed',0],
                ['Not Performed',100]
            ]
        }]
    });
});

    /****************************************************************************************
    ***************Repeating search from home controller*************************************
    ****************************************************************************************/

    $scope.search = function () {
      console.log($scope.queryString) 
      $state.transitionTo('results', {'query':$scope.query,'q':$scope.queryString});          
    };

    $scope.getTypes = function(val) {      
      return $http.get('/refusalCheck/autoComplete', {
        params: {
          type: val
        }
      }).then(function(res){
       
        return res.data.results.map(function(item){          
            return item;
        }); 
      });    
    };   

    $scope.onSelect = function ($item, $model, $label) {                
                $scope.queryString = $item.type+'-'+$item.code;
    };    
}

