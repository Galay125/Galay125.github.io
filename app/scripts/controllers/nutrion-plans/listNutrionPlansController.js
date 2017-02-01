'use strict';


function listNutrionPlansController($scope, $filter, $modal, $http, $window, activeNutritionPlanClient, FoodsByNutrition, NutritionDiariesByPlan, editableOptions, editableThemes) {
  //editableThemes.bs3.inputClass = 'input-sm';
  //editableThemes.bs3.buttonsClass = 'btn-sm';
  //editableOptions.theme = 'bs3';

  $scope.plano_nutricao = {
    diaries:[]
  };

  var d = new Date();
  $scope.day = d.getDay();

  $scope.weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  var token = $window.sessionStorage.token;
  var client = $window.sessionStorage.clientId;

  activeNutritionPlanClient.show({'id': client}, function (data) {
    delete data['$promise'];
    delete data['$resolved'];
    $scope.plano_nutricao.infor = data;

    NutritionDiariesByPlan.query({'id': $scope.plano_nutricao.infor["id"]}, function (data) {
      delete data['$promise'];
      delete data['$resolved'];

      var x = 0;
      var a = 0;
      for(x=0; x < data.length; x++){
        for(a=0; a < data[x].days.length; a++){
          $scope.plano_nutricao.diaries[data[x].days[a]] = data[x];
        }
      }

      var i = 0;
      function next(){
        if(i < $scope.plano_nutricao.diaries.length){
          FoodsByNutrition.query({'id': $scope.plano_nutricao.diaries[i]["id"]}, function (data) {
            delete data['$promise'];
            delete data['$resolved'];
            $scope.plano_nutricao.diaries[i].meals = data;
            i++;
            next();
          });
        }
      }
      $scope.diar = $scope.plano_nutricao.diaries[$scope.day];
      next();
    });
  });


  $scope.openDay = function(diaria, ind){
    $scope.diar = diaria;
    $scope.day = ind;
  }



  $scope.openIngrediente = function (size, foo, meal, diar) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        food: function () {
          return  $scope.plano_nutricao.diaries[diar].meals[meal].ingredients[foo];
        }
      }
    });
  }



  $scope.openNutrionPlan = function(id){
    window.location = "/#/nutrion_plans/" + id;
  }

}

function ModalInstanceCtrl($scope, $modalInstance, food) {
  $scope.food = food;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  var prota = 0;
  var hc = 0;
  var fat = 0;

  prota = (4*(food.quantity * food.fd.protein)) / 100;
  hc = (4*(food.quantity * food.fd.carbohydrate)) / 100;
  fat = (9*(food.quantity * food.fd.fat)) / 100;

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
.controller('listNutrionPlansController', ['$scope', '$filter', '$modal', '$http', '$window', 'activeNutritionPlanClient', 'FoodsByNutrition', 'NutritionDiariesByPlan', 'editableOptions', 'editableThemes', listNutrionPlansController])
.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'food', ModalInstanceCtrl]);