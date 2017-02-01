'use strict';

function dashboardCtrl($scope, $interval, COLORS) {

  $scope.globalOptions = {

    // String - Scale label font declaration for the scale label
    scaleFontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

    // Number - Scale label font size in pixels
    scaleFontSize: 10,

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 12,

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 13,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: '700',

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 2,

  };

  var visits = [
        [1, 120],
        [2, 115],
        [3, 102],
        [4, 95],
        [5, 97],
        [6, 90],
        [7, 87],
        [8, 85],
        [9, 80],
        [10, 85],
        [11, 80],
        [12, 85]
        ];

  $scope.lineDataset = [{
      data: visits,
      color: COLORS.success
    }];

  $scope.lineOptions = {
    height: 350,
    series: {
      lines: {
        show: true,
        lineWidth: 2,
        fill: true
      },
      shadowSize: 0
    },
    legend: {
      show: true
    },
    grid: {
      color: COLORS.border,
      borderWidth: 0,
      hoverable: true,
    },
    xaxis: {
      min: 1,
      max: 12
    },
    yaxis: {
      min: 30,
      max: 150
    }
  };


  $scope.radarOptions = {
    pointDotRadius: 0,
    pointLabelFontFamily: '"Roboto"',
    pointLabelFontSize: 10
  };

  angular.extend($scope.radarOptions, $scope.globalOptions);

  $scope.radarData = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Partying', 'Running'],
    datasets: [{
        fillColor: 'rgba(201, 199, 197,0.8)',
        strokeColor: 'rgba(201, 199, 197,0.8)',
        pointColor: 'rgba(201, 199, 197,0.8)',
        pointStrokeColor: '#fff',
        data: [65, 59, 90, 81, 56, 55, 40
            ]
                },
      {
        fillColor: 'rgba(219, 135, 78, 0.9)',
        strokeColor: 'rgba(219, 135, 78,0.9)',
        pointColor: 'rgba(219, 135, 78,0.9)',
        pointStrokeColor: '#fff',
        data: [28, 48, 40, 19, 96, 27, 100]
            }]
  };


  $scope.pieDataset = [
    {
      label: 'Hidratos',
      data: 35,
      color: COLORS.danger
        },
    {
      label: 'Proteinas(gr)',
      data: 35,
      color: COLORS.info
        },
    {
      label: 'Gorduras(gr)',
      data: 30,
      color: COLORS.warning
        }
    ];

  $scope.pieOptions = {
    series: {
      pie: {
        show: true,
        innerRadius: 0.5,
        stroke: {
          width: 4
        },
        label: {
          show: true,
        }
      }
    },
    legend: {
      show: true
    },
  };

  $scope.barOptions = {
    scaleShowGridLines: false,
    barShowStroke: false
  };

  angular.extend($scope.barOptions, $scope.globalOptions);

  $scope.barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        fillColor: 'rgba(219, 135, 78, 1)',
        highlightFill: 'rgba(165, 66, 0, 1)',
        data: [$scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary()]
            },
      {
        fillColor: 'rgba(163, 161, 159,0.8)',
        highlightFill: 'rgba(117, 115, 114,1)',
        data: [$scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary(), $scope.getRandomArbitrary()]
            }
        ]
  };

  var seriesData = [[], [], []];
  var random = new Rickshaw.Fixtures.RandomData(150);

  for (var i = 0; i < 150; i++) {
    random.addData(seriesData);
  }


  $scope.options2 = {
    renderer: 'area',
    height: 250,
    padding: {
      top: 2, left: 0, right: 0, bottom: 0
    },
    interpolation: 'cardinal'
  };

  $scope.series = [{
    color: COLORS.primary,
    data: seriesData[0],
    name: 'Upload'
    }, {
    color: COLORS.bodyBg,
    data: seriesData[1],
    name: 'Download'
    }];

  $interval(function () {
    $scope.series = null;
    random.removeData(seriesData);
    random.addData(seriesData);

    $scope.series = [{
      data: seriesData[0],
        }, {
      data: seriesData[1],
        }];
  }, 1000);

  var seriesData2 = [[], [], []];
  var random2 = new Rickshaw.Fixtures.RandomData(100);

  for (var v = 0; v < 100; v++) {
    random2.addData(seriesData2);
  }

  $scope.options5 = {
    renderer: 'area',
    height: 133,
    padding: {
      top: 2, left: 0, right: 0, bottom: 0
    },
    interpolation: 'cardinal',
    stroke: false,
    strokeWidth: 1,
    preserve: true,
  };

  $scope.features5 = {

    hover: {
      xFormatter: function (x) {
        return new Date(x * 1000).toString();
      },
      yFormatter: function (y) {
        return Math.round(y);
      }
    }
  };

  $scope.series5 = [{
    color: COLORS.success,
    name: 'Earnings',
    data: seriesData2[0]
    }];
}

angular
  .module('urbanApp')
  .controller('dashboardCtrl', ['$scope', '$interval', 'COLORS', dashboardCtrl]);
