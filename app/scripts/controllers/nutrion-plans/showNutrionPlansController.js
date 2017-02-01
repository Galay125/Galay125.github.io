'use strict';


function showNutrionPlansController($scope, $filter, $modal, $http, $window, todayMealByClient, ChecksByMeals, Checks, Daily, DailyByMeals, ChecksByDaily) {
  //editableThemes.bs3.inputClass = 'input-sm';
  //editableThemes.bs3.buttonsClass = 'btn-sm';
  //editableOptions.theme = 'bs3';

  $scope.meals = [];

  var d = new Date();
  $scope.day = d.getDay();
  //console.log(d);
  d = $filter('date')(new Date(),'yyyy-MM-dd');
  $scope.weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  var token = $window.sessionStorage.token;
  var client = $window.sessionStorage.clientId;

  //Daily.delete({'id': "588e8d257e4cbda37d20b527"});
  todayMealByClient.query({'id': client, 'dia' : 0}, function (data) {
    delete data['$promise'];
    delete data['$resolved'];
    $scope.meals = data;

    var i = 0;
    function next(){
      if(i < $scope.meals.length){
        ChecksByMeals.query({'id': $scope.meals[i].id}, function (data) {
          delete data['$promise'];
          delete data['$resolved'];

          var x = 0;
          var j = 0;
          for(x=0; x<data.length; x++){
            for(j=0; j<data[x].checks.length; j++){
              if(data[x].checks[j].updatedAt.indexOf(d) == -1){
                data[x].checks.splice(j, 1);
              }
            }
          }

          $scope.meals[i].ingredients = data;
          $scope.meals[i].checkado = 0;

          i++;
          next();
        });
      }
    }
    next();

  });


  $scope.postCheck = function(ingr, meal){
    var check = new Checks();
    check.client = client;
    check.ingredient = ingr;

    console.log(check);

    var d = new Date();
    d = $filter('date')(new Date(),'yyyy-MM-dd');
    var flag = 0;

    DailyByMeals.query({'id': meal}, function (data) {
      delete data['$promise'];
      delete data['$resolved'];
      var i = 0;
      for(i=0; i<data.length; i++)
        if(data[i].updatedAt.indexOf(d) != -1){
          flag = 1;
          check.dailyCheck = data[i].id;
        }

        if(flag == 1){
          Checks.create(check);
        }
        else{
          var dai = new Daily();
          dai.meal = meal;
          dai.client = client;
          Daily.create(dai, function(response){
            check.dailyCheck = response.id;
            Checks.create(check);
          });
        }
      });

  }

  $scope.delCheck = function(check, daily){
    Checks.destroy({'id': check}, function(){
      ChecksByDaily.query({'id': daily}, function (data) {
        delete data['$promise'];
        delete data['$resolved'];
        if(data.length == 0){
          Daily.destroy({'id': daily});
        }
      });
    });
  }

  $scope.allCheck = function(refeicoes){
    var d = new Date();
    d = $filter('date')(new Date(),'yyyy-MM-dd');
    var flag = 0;
    var i = 0;
    var j = 0;

    for(i = 0; i < refeicoes.ingredients.length; i++){
      flag = 0;
      for(j = 0; j<refeicoes.ingredients[i].checks.length; j++){
        if(refeicoes.ingredients[i].checks[j].updatedAt.indexOf(d) == 0)
          flag = 1;
      }
      if(flag == 0)
        $scope.postCheck(refeicoes.ingredients[i].id, refeicoes.id);
    }
  }

  $scope.openIngrediente = function (size, foo, meal) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        food: function () {
          return  $scope.meals[meal].ingredients[foo];
        }
      }
    });
  }


}

function ModalInstanceCtrl($scope, $modalInstance, food) {
  $scope.ingr = food;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  var prota = 0;
  var hc = 0;
  var fat = 0;


  prota = (4*(food.quantity * food.food.protein)) / 100;
  hc = (4*(food.quantity * food.food.carbohydrate)) / 100;
  fat = (9*(food.quantity * food.food.fat)) / 100;

  $scope.pieDataset = [
  {
    label: 'Proteina (gr)',
    data: prota,
    color: '#00b230'
  },
  {
    label: 'Hidratos de Carbono (gr)',
    data: hc,
    color: '#cec500'
  },
  {
    label: 'Gordura (gr)',
    data: fat,
    color: '#c91313'
  }
  ];

  $scope.pieLoaded = true;

  $scope.pieOptions = {
    series: {
      pie: {
        show: true,
        innerRadius: 0,
        stroke: {
          width: 0
        },
        label: {
          show: true,
        }
      }
    },
    grid:{
      hoverable: true,
      clickable: true
    },
    legend: {
      show: false
    },
  };

}


angular
.module('urbanApp')
.controller('showNutrionPlansController', ['$scope', '$filter', '$modal', '$http', '$window', 'todayMealByClient', 'ChecksByMeals', 'Checks', 'Daily', 'DailyByMeals', 'ChecksByDaily', showNutrionPlansController])
.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'food', ModalInstanceCtrl]);